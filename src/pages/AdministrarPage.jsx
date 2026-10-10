/* ============================================
   AdministrarPage — Ruta "/administrar"
   Permite agregar videojuegos al catálogo y ver
   la lista actual. Recibe por props los datos y
   las funciones del hook useProductos desde App.
   Renderizado condicional:
   - cargando o error: EstadoCarga.
   - éxito: formulario y lista del catálogo.
   ============================================ */

import EstadoCarga from '../components/EstadoCarga.jsx'
import FormularioJuego from '../components/FormularioJuego.jsx'
import CatalogoAdmin from '../components/CatalogoAdmin.jsx'

export default function AdministrarPage({
  estado,
  error,
  onReintentar,
  productos,
  categorias,
  onAgregarJuego,
  hayCambios,
  onRestaurar,
}) {
  return (
    <main className="container py-4 flex-grow-1">
      {estado === 'exito' ? (
        <div className="row g-4">
          <div className="col-12 col-lg-7">
            <section className="content-box p-3 p-md-4" aria-labelledby="agregar-titulo">
              <h2 id="agregar-titulo">Agregar videojuego</h2>
              <FormularioJuego categorias={categorias} onAgregar={onAgregarJuego} />
            </section>
          </div>

          <div className="col-12 col-lg-5">
            <section className="content-box p-3 p-md-4" aria-labelledby="lista-admin-titulo">
              <h2 id="lista-admin-titulo">Juegos en el catálogo</h2>
              <CatalogoAdmin juegos={productos} hayCambios={hayCambios} onRestaurar={onRestaurar} />
            </section>
          </div>
        </div>
      ) : (
        <section className="content-box p-3 p-md-4" aria-labelledby="admin-titulo">
          <h2 id="admin-titulo">Administrar catálogo</h2>
          <EstadoCarga estado={estado} error={error} onReintentar={onReintentar} />
        </section>
      )}
    </main>
  )
}
