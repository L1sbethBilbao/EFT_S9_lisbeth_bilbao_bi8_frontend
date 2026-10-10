/* ============================================
   InicioPage — Ruta "/" (portada + catálogo + carrito)
   Recibe por props el catálogo cargado, los filtros
   y las funciones del carrito desde App.
   Renderizado condicional del catálogo:
   - cargando o error: EstadoCarga.
   - éxito: buscador y grilla de juegos.
   ============================================ */

import Hero from '../components/Hero.jsx'
import SearchBar from '../components/SearchBar.jsx'
import ProductList from '../components/ProductList.jsx'
import EstadoCarga from '../components/EstadoCarga.jsx'
import Cart from '../components/Cart.jsx'

// Cantidad de juegos que aparecen en el carrusel de la portada.
const CANTIDAD_DESTACADOS = 3

export default function InicioPage({
  estado,
  error,
  onReintentar,
  productos,
  productosFiltrados,
  categorias,
  busqueda,
  onCambiarBusqueda,
  categoria,
  onCambiarCategoria,
  onLimpiar,
  carrito,
  onAgregar,
  accionesCarrito,
}) {
  return (
    <>
      <Hero destacados={productos.slice(0, CANTIDAD_DESTACADOS)} />

      <main className="container py-4 flex-grow-1">
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <section id="catalogo" className="content-box p-3 p-md-4" aria-labelledby="catalogo-titulo">
              <h2 id="catalogo-titulo">Catálogo de juegos</h2>

              {estado === 'exito' ? (
                <>
                  <SearchBar
                    busqueda={busqueda}
                    onCambiarBusqueda={onCambiarBusqueda}
                    categoria={categoria}
                    onCambiarCategoria={onCambiarCategoria}
                    categorias={categorias}
                    onLimpiar={onLimpiar}
                  />
                  <ProductList
                    juegos={productosFiltrados}
                    total={productos.length}
                    carrito={carrito}
                    onAgregar={onAgregar}
                  />
                </>
              ) : (
                <EstadoCarga estado={estado} error={error} onReintentar={onReintentar} />
              )}
            </section>
          </div>

          <aside className="col-12 col-lg-4" aria-label="Carrito de compras">
            <Cart items={carrito} {...accionesCarrito} />
          </aside>
        </div>
      </main>
    </>
  )
}
