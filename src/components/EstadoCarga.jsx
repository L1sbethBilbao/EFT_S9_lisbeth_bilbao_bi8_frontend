/* ============================================
   EstadoCarga — Aviso mientras llega el catálogo
   Props:
   - estado: 'cargando' | 'error'.
   - error: texto del error.
   - onReintentar: vuelve a pedir los datos.
   Renderizado condicional: muestra un spinner
   mientras se carga o una alerta con el botón
   Reintentar si la carga falló.
   ============================================ */

export default function EstadoCarga({ estado, error, onReintentar }) {
  if (estado === 'cargando') {
    return (
      <div className="aviso-dinamico aviso-carga d-flex align-items-center gap-2" role="status" aria-live="polite">
        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
        Cargando catálogo de juegos...
      </div>
    )
  }

  return (
    <div className="aviso-dinamico aviso-error" role="alert">
      <p className="mb-2">No se pudo cargar el catálogo. {error}</p>
      <button type="button" className="btn btn-kivo btn-sm" onClick={onReintentar}>
        Reintentar
      </button>
    </div>
  )
}
