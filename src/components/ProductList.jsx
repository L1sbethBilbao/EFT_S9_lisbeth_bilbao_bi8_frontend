/* ============================================
   ProductList — Grilla de juegos del catálogo
   Props:
   - juegos: juegos ya filtrados por App.
   - total: cantidad total de juegos del catálogo.
   - carrito: se usa para saber cuántas unidades ya tiene cada juego.
   - onAgregar: función de App que agrega un juego al carrito.
   Estado propio (useState):
   - vista: 'cuadricula' | 'lista'. El botón cambia de texto
     y alterna la forma de mostrar el catálogo.
   Recorre los juegos con .map() y crea una ProductCard por cada uno.
   ============================================ */

import { useState } from 'react'
import ProductCard from './ProductCard.jsx'

/** Devuelve cuántas unidades de un juego hay en el carrito (0 si no está). */
function unidadesEnCarrito(carrito, id) {
  const item = carrito.find((producto) => producto.id === id)
  return item ? item.cantidad : 0
}

export default function ProductList({ juegos, total, carrito, onAgregar }) {
  const [vista, setVista] = useState('cuadricula')
  const esLista = vista === 'lista'

  /** onClick: alterna entre cuadrícula y lista usando el estado anterior. */
  const alternarVista = () => {
    setVista((prev) => (prev === 'cuadricula' ? 'lista' : 'cuadricula'))
  }

  // Renderizado condicional: si el filtro no encuentra nada, se muestra un aviso
  // en lugar de una grilla vacía.
  if (juegos.length === 0) {
    return (
      <p className="aviso-dinamico aviso-error mb-0" role="status">
        No hay juegos para esa búsqueda o categoría. Prueba con otro nombre o usa &quot;Limpiar filtros&quot;.
      </p>
    )
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <p className="mb-0" role="status">
          {juegos.length === total
            ? `Mostrando los ${total} juegos del catálogo.`
            : `Mostrando ${juegos.length} de ${total} juegos.`}
        </p>
        {/* Elemento interactivo: el texto del botón depende del estado "vista" */}
        <button type="button" className="btn btn-kivo-outline btn-sm" onClick={alternarVista} aria-pressed={esLista}>
          {esLista ? '▦ Ver como cuadrícula' : '☰ Ver como lista'}
        </button>
      </div>

      {/* Renderizado condicional de estilos: una columna (lista) o varias (cuadrícula) */}
      <div className={`row g-3 ${esLista ? 'row-cols-1' : 'row-cols-1 row-cols-md-2 row-cols-xl-3'}`}>
        {juegos.map((juego) => (
          <div className="col" key={juego.id}>
            <ProductCard
              juego={juego}
              cantidadEnCarrito={unidadesEnCarrito(carrito, juego.id)}
              onAgregar={onAgregar}
              vista={vista}
            />
          </div>
        ))}
      </div>
    </>
  )
}
