/* ============================================
   Hero — Portada con el carrusel de destacados
   Props:
   - destacados: juegos que aparecen en el carrusel
     (llegan vacíos mientras el catálogo se carga).
   Usa useRef para apuntar al carrusel y useEffect para
   iniciarlo con Bootstrap una vez que React lo dibujó.
   ============================================ */

import { useEffect, useRef } from 'react'
import { Carousel } from 'bootstrap'

const RUTA_BANNER = `${import.meta.env.BASE_URL}img/banner.jpg`

export default function Hero({ destacados }) {
  const refCarrusel = useRef(null)

  // useEffect con [destacados.length]: inicia el carrusel al montar y lo reinicia
  // cuando llegan los juegos destacados del catálogo (avance cada 3 segundos).
  useEffect(() => {
    const elemento = refCarrusel.current
    const carrusel = Carousel.getOrCreateInstance(elemento, {
      interval: 3000,
      ride: 'carousel',
    })
    carrusel.cycle()
    // Cleanup: al desmontar (por ejemplo al ir a Contacto) o antes de reiniciar,
    // se libera el carrusel para no dejar temporizadores activos.
    return () => {
      // Si una imagen está a mitad del cambio, la transición se termina ahora:
      // Bootstrap la completaría después del dispose() y fallaría con "Illegal invocation".
      elemento.querySelector('.carousel-item.active')?.dispatchEvent(new Event('transitionend'))
      // dispose() no detiene el avance automático; pause() sí lo hace.
      carrusel.pause()
      carrusel.dispose()
    }
  }, [destacados.length])

  return (
    <header id="inicio" className="kivo-hero py-4">
      <div className="container">
        <h1 className="h2 mb-2">Kivo</h1>
        <p className="tagline mb-3">El juego encuentra su lugar: títulos nuevos, clásicos y ofertas de la semana.</p>

        <div id="carruselKivo" className="carousel slide" ref={refCarrusel}>
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carruselKivo" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Banner de Kivo"></button>
            {destacados.map((juego, indice) => (
              <button
                key={juego.id}
                type="button"
                data-bs-target="#carruselKivo"
                data-bs-slide-to={indice + 1}
                aria-label={juego.nombre}
              ></button>
            ))}
          </div>

          <div className="carousel-inner rounded">
            <div className="carousel-item active">
              <img src={RUTA_BANNER} className="d-block w-100" alt="Banner de Kivo: el zorro con un control de videojuegos" />
              <div className="carousel-caption caption-banner">
                <p className="mb-0">Kivo: juegos para todas las consolas.</p>
              </div>
            </div>
            {destacados.map((juego) => (
              <div className="carousel-item" key={juego.id}>
                <img src={juego.imagen} className="d-block w-100" alt={`Portada del juego ${juego.nombre}`} />
                <div className="carousel-caption">
                  <p className="mb-0">{juego.nombre}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carruselKivo" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carruselKivo" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </div>
    </header>
  )
}
