/* ============================================
   Navbar — Barra de navegación de Kivo
   Props:
   - cantidad: total de unidades en el carrito (contador).
   - categorias: lista { id, nombre } para el menú.
   - categoriaActiva: id de la categoría elegida ('' = todas).
   - onElegirCategoria: función de App que cambia la categoría.
   Usa NavLink de React Router: cambia de página sin recargar
   y marca con la clase "active" la ruta en la que estás.
   ============================================ */

import { Link, NavLink, useNavigate } from 'react-router-dom'

const RUTA_LOGO = `${import.meta.env.BASE_URL}img/logo.png`

/** Clases del enlace según si su ruta es la actual (renderizado condicional de estilos). */
const claseEnlace = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`

export default function Navbar({ cantidad, categorias, categoriaActiva, onElegirCategoria }) {
  const navegar = useNavigate()

  /** onClick de una categoría: filtra el catálogo y lleva a la portada. */
  const elegirCategoria = (id) => {
    onElegirCategoria(id)
    navegar('/')
  }

  const textoProductos = cantidad === 1 ? 'producto' : 'productos'

  return (
    <nav className="navbar navbar-expand-lg navbar-dark kivo-navbar sticky-top" aria-label="Navegación principal">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img
            className="kivo-logo"
            src={RUTA_LOGO}
            alt="Logo de Kivo: un zorro con audífonos y un control de videojuegos"
            width="48"
            height="48"
          />
          <span>Kivo</span>
        </Link>

        {/* Contador siempre visible, también en celular con el menú cerrado */}
        <NavLink className="btn btn-kivo btn-sm ms-auto me-2 d-lg-none" to="/carrito" aria-label={`Carrito: ${cantidad} ${textoProductos}`}>
          🛒 {cantidad}
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir o cerrar el menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            <li className="nav-item">
              <NavLink className={claseEnlace} to="/" end>Catálogo</NavLink>
            </li>
            <li className="nav-item dropdown">
              {/* Botón (no enlace #) para no cambiar la ruta del HashRouter */}
              <button
                className="nav-link dropdown-toggle btn btn-link"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categorías
              </button>
              <ul className="dropdown-menu">
                {/* Mientras el catálogo carga no hay categorías: se muestra un aviso */}
                {categorias.length === 0 && (
                  <li><span className="dropdown-item-text small">Cargando categorías...</span></li>
                )}
                {categorias.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      className={`dropdown-item ${categoriaActiva === cat.id ? 'active' : ''}`}
                      onClick={() => elegirCategoria(cat.id)}
                    >
                      {cat.nombre}
                    </button>
                  </li>
                ))}
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button
                    type="button"
                    className={`dropdown-item ${categoriaActiva === '' ? 'active' : ''}`}
                    onClick={() => elegirCategoria('')}
                  >
                    Todas
                  </button>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className={claseEnlace} to="/contacto">Contacto</NavLink>
            </li>
            <li className="nav-item d-none d-lg-block">
              {/* Renderizado condicional: singular o plural según la cantidad */}
              <NavLink className="btn btn-kivo btn-sm ms-lg-2" to="/carrito" aria-live="polite">
                🛒 Carrito: <strong>{cantidad}</strong> {textoProductos}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
