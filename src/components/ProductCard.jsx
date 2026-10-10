/* ============================================
   ProductCard — Tarjeta reutilizable de un juego
   Props:
   - juego: { nombre, precio, precioOferta, descripcion, imagen, categoriaNombre }.
   - cantidadEnCarrito: unidades de este juego ya agregadas.
   - onAgregar: función que recibe el juego y lo suma al carrito.
   - vista: 'cuadricula' | 'lista', cambia la disposición de la tarjeta.
   Se escribe una sola vez y se repite por cada juego del catálogo.
   ============================================ */

import { formatearPrecio, calcularDescuento } from '../utils/formato.js'

export default function ProductCard({ juego, cantidadEnCarrito, onAgregar, vista = 'cuadricula' }) {
  const { nombre, precio, precioOferta, descripcion, imagen, categoriaNombre } = juego
  const descuento = calcularDescuento(precio, precioOferta)
  const enCarrito = cantidadEnCarrito > 0
  const esLista = vista === 'lista'

  return (
    <article className={`card h-100 kivo-card ${esLista ? 'flex-md-row tarjeta-lista' : ''}`}>
      <div className="position-relative">
        <img className="card-img-top" src={imagen} alt={`Portada del juego ${nombre}`} />
        {/* Renderizado condicional: la insignia solo aparece si hay descuento */}
        {descuento > 0 && (
          <span className="badge insignia-descuento position-absolute top-0 end-0 m-2">-{descuento}%</span>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <p className="categoria-producto mb-1">{categoriaNombre}</p>
        <h3 className="card-title h5">{nombre}</h3>
        <p className="card-text flex-grow-1">{descripcion}</p>

        <div className="d-flex align-items-baseline gap-2 mb-2">
          {descuento > 0 && (
            <span className="precio-normal" aria-label={`Precio normal ${formatearPrecio(precio)}`}>
              {formatearPrecio(precio)}
            </span>
          )}
          <span className="precio-producto fs-5" aria-label={`Precio oferta ${formatearPrecio(precioOferta)}`}>
            {formatearPrecio(precioOferta)}
          </span>
        </div>

        {/* onClick: envía este juego a la función agregarAlCarrito de App.
            Renderizado condicional: si ya está en el carrito, el botón cambia
            de texto y de estilo ("Agregar al carrito" -> "En el carrito"). */}
        <button
          type="button"
          className={`btn ${enCarrito ? 'btn-en-carrito' : 'btn-kivo'}`}
          onClick={() => onAgregar(juego)}
          aria-label={enCarrito ? `${nombre} está en el carrito, agregar otra unidad` : `Agregar ${nombre} al carrito`}
        >
          {enCarrito ? `✔ En el carrito (${cantidadEnCarrito}) · Agregar otra` : 'Agregar al carrito'}
        </button>
      </div>
    </article>
  )
}
