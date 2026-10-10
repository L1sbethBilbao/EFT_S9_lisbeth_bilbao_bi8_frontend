/* ============================================
   Footer — Pie de página de Kivo
   Componente sin props ni estado: muestra los
   datos de contacto y un botón para subir.
   ============================================ */

/** Sube al inicio de la página (no usa enlaces # para no cambiar la ruta). */
const volverArriba = () => window.scrollTo({ top: 0, behavior: 'smooth' })

export default function Footer() {
  return (
    <footer className="site-footer mt-auto py-3">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 text-center text-md-start">
        <p className="mb-0">Kivo — Av. Gamer 123, Santiago, Chile</p>
        <p className="mb-0">Teléfono: +56 9 1234 5678</p>
        <p className="mb-0">
          Redes:{' '}
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          {' — '}
          <a href="mailto:hola@kivo.cl">hola@kivo.cl</a>
        </p>
        <button type="button" className="btn btn-link p-0 enlace-footer" onClick={volverArriba}>
          Volver arriba
        </button>
      </div>
    </footer>
  )
}
