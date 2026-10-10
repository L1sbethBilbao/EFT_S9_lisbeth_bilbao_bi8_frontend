/* ============================================
   useProductos — Hook personalizado (Semana 8)
   Carga el catálogo desde una fuente externa:
   el archivo public/data/productos.json, pedido
   con fetch como si fuera la API de un backend.
   Devuelve:
   - productos y categorias: datos ya cargados (useState).
   - estado: 'cargando' | 'exito' | 'error'.
   - error: texto del error, si lo hubo.
   - reintentar: vuelve a pedir los datos.
   ============================================ */

import { useEffect, useState } from 'react'

const URL_CATALOGO = `${import.meta.env.BASE_URL}data/productos.json`

// Espera para simular la demora de un servidor real y que se vea el estado "cargando".
const DEMORA_SIMULADA_MS = 800

/** Arma la ruta completa de una imagen de public/img con la base del sitio. */
const conRutaBase = (producto) => ({
  ...producto,
  imagen: `${import.meta.env.BASE_URL}${producto.imagen}`,
})

/**
 * Espera unos milisegundos. Si la señal se aborta antes,
 * cancela el temporizador y rechaza con AbortError (igual que fetch).
 */
function esperar(ms, senal) {
  return new Promise((resolver, rechazar) => {
    const temporizador = setTimeout(resolver, ms)
    senal.addEventListener('abort', () => {
      clearTimeout(temporizador)
      rechazar(new DOMException('Carga cancelada', 'AbortError'))
    })
  })
}

export default function useProductos() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [estado, setEstado] = useState('cargando')
  const [error, setError] = useState('')
  // Cada vez que cambia "intento" se vuelve a ejecutar el efecto (botón Reintentar).
  const [intento, setIntento] = useState(0)

  // useEffect: se ejecuta al montar el componente y cuando cambia "intento".
  // Nunca en cada render, porque tiene arreglo de dependencias.
  useEffect(() => {
    console.log(`[useProductos] Efecto: cargando catálogo (intento ${intento})`)
    const controller = new AbortController()

    async function cargarCatalogo() {
      try {
        // Simula la demora del servidor; también se cancela en el cleanup.
        await esperar(DEMORA_SIMULADA_MS, controller.signal)

        const respuesta = await fetch(URL_CATALOGO, { signal: controller.signal })
        if (!respuesta.ok) {
          throw new Error(`El servidor respondió con el código ${respuesta.status}.`)
        }
        const datos = await respuesta.json()

        setProductos(datos.productos.map(conRutaBase))
        setCategorias(datos.categorias)
        setEstado('exito')
        console.log(`[useProductos] OK: ${datos.productos.length} juegos cargados`)
      } catch (errorCarga) {
        // Si la carga se canceló en el cleanup, no se actualiza el estado.
        if (errorCarga.name === 'AbortError') {
          console.log('[useProductos] Carga cancelada: el componente se desmontó o se reintentó')
          return
        }
        // fetch lanza TypeError cuando no hay conexión o la petición fue bloqueada.
        const sinConexion = errorCarga instanceof TypeError
        setError(sinConexion ? 'Revisa tu conexión a internet e inténtalo de nuevo.' : errorCarga.message)
        setEstado('error')
      }
    }

    cargarCatalogo()

    // Cleanup: React lo ejecuta al desmontar el componente o antes de repetir el efecto.
    // Cancela la espera y el fetch para no actualizar un componente que ya no existe.
    return () => {
      controller.abort()
      console.log('[useProductos] Cleanup: AbortController.abort()')
    }
  }, [intento])

  /** Vuelve a pedir el catálogo después de un error. */
  const reintentar = () => {
    setEstado('cargando')
    setError('')
    setIntento((prev) => prev + 1)
  }

  return { productos, categorias, estado, error, reintentar }
}
