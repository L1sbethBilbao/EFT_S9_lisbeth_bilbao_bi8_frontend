/* ============================================
   Kivo — Componente principal App (Semana 8)
   Aquí vive el estado compartido de la tienda (useState):
   el carrito, el texto de búsqueda y la categoría.
   El catálogo llega desde useProductos (useEffect + fetch).
   App define las rutas con React Router y pasa los datos
   y las funciones a cada página por props.
   ============================================ */

import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import useProductos from './hooks/useProductos.js'
import { contarProductos } from './utils/carrito.js'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import InicioPage from './pages/InicioPage.jsx'
import CarritoPage from './pages/CarritoPage.jsx'
import ContactoPage from './pages/ContactoPage.jsx'
import NoEncontradaPage from './pages/NoEncontradaPage.jsx'

// Clave propia de la semana 8: el sitio de la semana 7 vive en el mismo dominio
// (l1sbethbilbao.github.io) y no deben compartir el carrito guardado.
const CLAVE_CARRITO = 'kivoCarritoS8'

/**
 * Lee el carrito guardado en localStorage al abrir la página.
 * Si no hay datos o están dañados, parte con el carrito vacío.
 */
function leerCarritoGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO))
    return Array.isArray(guardado) ? guardado : []
  } catch {
    return []
  }
}

export default function App() {
  // Catálogo cargado desde public/data/productos.json (ver hooks/useProductos.js).
  const { productos, categorias, estado, error, reintentar } = useProductos()

  // Estado del carrito: cada ítem es { ...juego, cantidad }.
  // Se pasa una función a useState (lazy initialization) para leer localStorage solo una vez.
  const [carrito, setCarrito] = useState(leerCarritoGuardado)
  // Estado de los filtros del catálogo.
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')

  const { pathname } = useLocation()

  // useEffect con [carrito]: cada vez que cambia el carrito se guarda en localStorage.
  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito))
  }, [carrito])

  // useEffect con [pathname]: al cambiar de página se vuelve al inicio de la pantalla.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  /**
   * Agrega un juego al carrito.
   * Si ya estaba, suma una unidad; si no, lo agrega con cantidad 1.
   * Se usa el estado anterior (prev) y se crean copias nuevas (estado inmutable).
   */
  const agregarAlCarrito = (juego) => {
    setCarrito((prev) => {
      const existe = prev.some((item) => item.id === juego.id)
      if (existe) {
        return prev.map((item) =>
          item.id === juego.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        )
      }
      return [...prev, { ...juego, cantidad: 1 }]
    })
  }

  /**
   * Resta una unidad de un juego.
   * Si queda en 0, el juego sale del carrito.
   */
  const disminuirCantidad = (id) => {
    setCarrito((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
        .filter((item) => item.cantidad > 0),
    )
  }

  /** Elimina un juego completo del carrito, sin importar su cantidad. */
  const quitarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id))
  }

  /** Deja el carrito vacío. */
  const vaciarCarrito = () => {
    setCarrito([])
  }

  /** Limpia la búsqueda y la categoría para volver a ver todo el catálogo. */
  const limpiarFiltros = () => {
    setBusqueda('')
    setCategoria('')
  }

  // Juegos que se muestran: se filtran por categoría y por texto
  // (nombre, categoría o descripción) sin modificar el arreglo original.
  const texto = busqueda.trim().toLowerCase()
  const productosFiltrados = productos.filter((juego) => {
    const coincideCategoria = !categoria || juego.categoria === categoria
    const contenido = `${juego.nombre} ${juego.categoriaNombre} ${juego.descripcion}`.toLowerCase()
    const coincideTexto = !texto || contenido.includes(texto)
    return coincideCategoria && coincideTexto
  })

  // Funciones del carrito agrupadas para no repetir las mismas props en cada página.
  const accionesCarrito = {
    onAumentar: agregarAlCarrito,
    onDisminuir: disminuirCantidad,
    onQuitar: quitarDelCarrito,
    onVaciar: vaciarCarrito,
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        cantidad={contarProductos(carrito)}
        categorias={categorias}
        categoriaActiva={categoria}
        onElegirCategoria={setCategoria}
      />

      <Routes>
        <Route
          path="/"
          element={
            <InicioPage
              estado={estado}
              error={error}
              onReintentar={reintentar}
              productos={productos}
              productosFiltrados={productosFiltrados}
              categorias={categorias}
              busqueda={busqueda}
              onCambiarBusqueda={setBusqueda}
              categoria={categoria}
              onCambiarCategoria={setCategoria}
              onLimpiar={limpiarFiltros}
              carrito={carrito}
              onAgregar={agregarAlCarrito}
              accionesCarrito={accionesCarrito}
            />
          }
        />
        <Route path="/carrito" element={<CarritoPage carrito={carrito} accionesCarrito={accionesCarrito} />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="*" element={<NoEncontradaPage />} />
      </Routes>

      <Footer />
    </div>
  )
}
