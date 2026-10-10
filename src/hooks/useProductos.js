/* ============================================
   useProductos — Hook personalizado (EFT Semana 9)
   Carga el catálogo desde una fuente externa:
   el archivo public/data/productos.json, pedido
   con fetch como si fuera la API de un backend.
   Al leerlo con respuesta.json() cada juego queda como
   un objeto de JavaScript:
   { id, nombre, categoria, categoriaNombre, precio,
     precioOferta, descripcion, imagen }.
   Además permite agregar y eliminar videojuegos:
   los cambios se guardan en el estado (useState) y en
   localStorage, así no se pierden al recargar.
   Devuelve:
   - productos y categorias: datos ya cargados.
   - estado: 'cargando' | 'exito' | 'error'.
   - error: texto del error, si lo hubo.
   - reintentar: vuelve a pedir los datos.
   - agregarJuego, eliminarJuego y restaurarCatalogo.
   - hayCambios: true si el catálogo difiere del original.
   ============================================ */

import { useEffect, useState } from 'react'

const URL_CATALOGO = `${import.meta.env.BASE_URL}data/productos.json`

// Espera para simular la demora de un servidor real y que se vea el estado "cargando".
const DEMORA_SIMULADA_MS = 800

// Clave de localStorage donde se guardan los juegos agregados y los eliminados.
const CLAVE_CAMBIOS = 'kivoCatalogoEFT'

// Sin cambios: el catálogo es igual al de productos.json.
const SIN_CAMBIOS = { agregados: [], eliminados: [] }

/** true si la imagen es una URL completa (http, https o data) y no una ruta de public/img. */
const esRutaExterna = (ruta) => /^(https?:|data:)/.test(ruta)

/** Arma la ruta completa de una imagen de public/img con la base del sitio. */
const conRutaBase = (producto) => ({
  ...producto,
  imagen: esRutaExterna(producto.imagen) ? producto.imagen : `${import.meta.env.BASE_URL}${producto.imagen}`,
})

/**
 * Lee los cambios del catálogo guardados en localStorage.
 * Si no hay datos o están dañados, parte sin cambios.
 */
function leerCambiosGuardados() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_CAMBIOS))
    const esValido = Array.isArray(guardado?.agregados) && Array.isArray(guardado?.eliminados)
    return esValido ? guardado : SIN_CAMBIOS
  } catch {
    return SIN_CAMBIOS
  }
}

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
  // Juegos tal como vienen en productos.json (no se modifican).
  const [catalogoOriginal, setCatalogoOriginal] = useState([])
  const [categorias, setCategorias] = useState([])
  const [estado, setEstado] = useState('cargando')
  const [error, setError] = useState('')
  // Cada vez que cambia "intento" se vuelve a ejecutar el efecto (botón Reintentar).
  const [intento, setIntento] = useState(0)
  // Cambios hechos por el usuario: juegos agregados e ids de juegos eliminados.
  // Se pasa una función a useState (lazy initialization) para leer localStorage solo una vez.
  const [cambios, setCambios] = useState(leerCambiosGuardados)

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

        setCatalogoOriginal(datos.productos)
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

  // useEffect con [cambios]: cada vez que se agrega o elimina un juego se guarda en localStorage.
  useEffect(() => {
    localStorage.setItem(CLAVE_CAMBIOS, JSON.stringify(cambios))
  }, [cambios])

  // Catálogo que ve el usuario: los originales que no se eliminaron + los agregados.
  // Se calcula en cada render a partir del estado, sin guardar una copia aparte.
  const productos = estado === 'exito'
    ? catalogoOriginal
      .filter((juego) => !cambios.eliminados.includes(juego.id))
      .concat(cambios.agregados)
      .map(conRutaBase)
    : []

  const hayCambios = cambios.agregados.length > 0 || cambios.eliminados.length > 0

  /** Vuelve a pedir el catálogo después de un error. */
  const reintentar = () => {
    setEstado('cargando')
    setError('')
    setIntento((prev) => prev + 1)
  }

  /**
   * Agrega un videojuego nuevo al catálogo.
   * Recibe { nombre, categoria, precio, precioOferta, descripcion, imagen }
   * y le asigna un id que no se repite y el nombre de su categoría.
   * Se usa el estado anterior (prev) y se crean copias nuevas (estado inmutable).
   */
  const agregarJuego = (juego) => {
    setCambios((prev) => {
      const ids = [...catalogoOriginal, ...prev.agregados].map((item) => item.id)
      const categoriaJuego = categorias.find((cat) => cat.id === juego.categoria)
      const nuevo = {
        ...juego,
        id: Math.max(0, ...ids) + 1,
        precio: Number(juego.precio),
        precioOferta: Number(juego.precioOferta),
        categoriaNombre: categoriaJuego ? categoriaJuego.nombre : juego.categoria,
      }
      return { ...prev, agregados: [...prev.agregados, nuevo] }
    })
    console.log(`[useProductos] Juego agregado: ${juego.nombre}`)
  }

  /**
   * Elimina un videojuego del catálogo.
   * Si era un juego agregado, se quita de la lista de agregados;
   * si venía de productos.json, su id se anota como eliminado.
   */
  const eliminarJuego = (id) => {
    setCambios((prev) => {
      const eraAgregado = prev.agregados.some((item) => item.id === id)
      if (eraAgregado) {
        return { ...prev, agregados: prev.agregados.filter((item) => item.id !== id) }
      }
      if (prev.eliminados.includes(id)) return prev
      return { ...prev, eliminados: [...prev.eliminados, id] }
    })
    console.log(`[useProductos] Juego eliminado: id ${id}`)
  }

  /**
   * Borra los cambios y vuelve al catálogo original de productos.json.
   * Devuelve los ids de los juegos agregados que dejan de existir,
   * para que App también los quite del carrito.
   */
  const restaurarCatalogo = () => {
    const idsAgregados = cambios.agregados.map((juego) => juego.id)
    setCambios(SIN_CAMBIOS)
    return idsAgregados
  }

  return {
    productos,
    categorias,
    estado,
    error,
    reintentar,
    agregarJuego,
    eliminarJuego,
    restaurarCatalogo,
    hayCambios,
  }
}
