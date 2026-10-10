/* ============================================
   CatalogoAdmin — Lista de juegos en Administrar
   Props:
   - juegos: catálogo actual (originales + agregados).
   - hayCambios: true si el catálogo difiere del original.
   - onRestaurar: vuelve al catálogo de productos.json.
   - onEliminar: función que recibe el id del juego a eliminar.
   Muestra cada juego con su miniatura, categoría, precio
   y un botón Eliminar que pide confirmación.
   ============================================ */

import { formatearPrecio } from '../utils/formato.js'

// Imagen que se muestra si la del juego no carga.
const IMAGEN_POR_DEFECTO = `${import.meta.env.BASE_URL}img/logo.png`

export default function CatalogoAdmin({ juegos, hayCambios, onRestaurar, onEliminar }) {
  const textoJuegos = juegos.length === 1 ? 'juego' : 'juegos'

  /** onClick de Eliminar: pide confirmación y envía el id a la función de App. */
  const confirmarEliminar = (juego) => {
    if (window.confirm(`¿Eliminar "${juego.nombre}" del catálogo? También se quitará del carrito.`)) {
      onEliminar(juego.id)
    }
  }

  /** Pide confirmación antes de borrar los cambios del catálogo. */
  const confirmarRestaurar = () => {
    if (window.confirm('¿Volver al catálogo original? Se perderán los juegos agregados y eliminados.')) {
      onRestaurar()
    }
  }

  return (
    <>
      <p className="mb-3">
        Hay <strong>{juegos.length}</strong> {textoJuegos} en el catálogo.
      </p>

      {/* Renderizado condicional: mensaje si se eliminaron todos los juegos */}
      {juegos.length === 0 ? (
        <p className="aviso-dinamico aviso-carga">El catálogo está vacío. Agrega un juego con el formulario.</p>
      ) : (
        <ul className="list-group lista-admin mb-3">
          {juegos.map((juego) => (
            <li key={juego.id} className="list-group-item d-flex align-items-center gap-3">
              <img
                className="miniatura-admin rounded"
                src={juego.imagen}
                alt={`Portada del juego ${juego.nombre}`}
                onError={(evento) => { evento.currentTarget.src = IMAGEN_POR_DEFECTO }}
              />
              <div className="flex-grow-1">
                <p className="fw-bold mb-0 nombre-admin">{juego.nombre}</p>
                <p className="small mb-0">{juego.categoriaNombre} · {formatearPrecio(juego.precioOferta)}</p>
              </div>
              <button
                type="button"
                className="btn btn-quitar btn-sm"
                onClick={() => confirmarEliminar(juego)}
                aria-label={`Eliminar ${juego.nombre} del catálogo`}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Renderizado condicional: el botón solo aparece si el catálogo cambió */}
      {hayCambios && (
        <button type="button" className="btn btn-kivo-outline btn-sm" onClick={confirmarRestaurar}>
          Restaurar catálogo original
        </button>
      )}
    </>
  )
}
