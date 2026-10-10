/* ============================================
   NoEncontradaPage — Ruta "*" (página 404)
   Se muestra cuando la dirección no coincide
   con ninguna ruta de la tienda.
   ============================================ */

import { Link } from 'react-router-dom'

export default function NoEncontradaPage() {
  return (
    <main className="container py-5 flex-grow-1">
      <section className="content-box p-4 text-center" aria-labelledby="titulo-404">
        <h2 id="titulo-404">Página no encontrada</h2>
        <p>La página que buscas no existe o cambió de dirección.</p>
        <Link className="btn btn-kivo" to="/">
          Volver al catálogo
        </Link>
      </section>
    </main>
  )
}
