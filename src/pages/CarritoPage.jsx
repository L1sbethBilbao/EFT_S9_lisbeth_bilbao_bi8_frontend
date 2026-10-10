/* ============================================
   CarritoPage — Ruta "/carrito"
   Reutiliza el mismo componente Cart de la portada,
   ahora a pantalla completa.
   Renderizado condicional: el enlace para seguir
   comprando cambia según si el carrito tiene juegos.
   ============================================ */

import { Link } from 'react-router-dom'
import Cart from '../components/Cart.jsx'

export default function CarritoPage({ carrito, accionesCarrito }) {
  return (
    <main className="container py-4 flex-grow-1">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <Cart items={carrito} {...accionesCarrito} />
          <Link className="btn btn-kivo-outline mt-3" to="/">
            {carrito.length === 0 ? '← Ir al catálogo' : '← Seguir comprando'}
          </Link>
        </div>
      </div>
    </main>
  )
}
