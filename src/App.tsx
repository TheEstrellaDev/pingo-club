import { useEffect, useState } from 'react'
import logo from './assets/images/logo.jpg'
import mascots from './assets/images/mascotitas.jpg'
import place from './assets/images/lugar.jpg'
import placeTwo from './assets/images/lugar2.jpg'
import info from './assets/images/info.jpg'
import infoTwo from './assets/images/info2.jpg'
import './App.css'

const links = [
  ['Nosotros', '#nosotros'], ['Servicios', '#servicios'], ['Galería', '#galeria'],
  ['Preguntas', '#preguntas'], ['Contacto', '#contacto'],
] as const

const social = {
  instagram: 'https://www.instagram.com/pingoclubb?utm_source=qr&xtok=MWw5ZjB1anRjdGxrbg%3D%3D',
  tiktok: 'https://www.tiktok.com/@pingo.club?_r=1&_t=ZS-9BLuYEbRSky',
  facebook: 'https://www.facebook.com/profile.php?id=61591742108784&rdid=zbXXxzUrUITQVolg&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FHV6vpAXQ%2F#',
  phone: '+524921255814',
}

const gallery = [
  { src: place, alt: 'Espacio de Pingo Club', label: 'Un espacio para disfrutar' },
  { src: placeTwo, alt: 'Detalles del establecimiento Pingo Club', label: 'Conoce nuestro espacio' },
  { src: mascots, alt: 'Mascotas originales de Pingo Club', label: 'El mundo Pingo' },
  { src: info, alt: 'Información visual de Pingo Club', label: 'Diversión en cada corte' },
  { src: infoTwo, alt: 'Material informativo de Pingo Club', label: 'Un lugar especial' },
]

const questions = [
  { q: '¿Qué servicios ofrecen?', a: 'Estamos preparando esta información para publicarla con detalle. Escríbenos por WhatsApp y con gusto te orientamos.' },
  { q: '¿Necesito agendar una cita?', a: 'La forma de atención y las citas están pendientes de confirmación. Consulta directamente con Pingo Club por WhatsApp.' },
  { q: '¿Cómo llego a Pingo Club?', a: 'Estamos en Calle Nieves y 2 de Mayo, Colonia Camilo Torres, detrás del Tec de Mty, en Guadalupe, Zacatecas.' },
  { q: '¿Dónde puedo consultar horarios y precios?', a: 'Los horarios y precios aún no están publicados. Contáctanos por nuestras redes para recibir información actualizada.' },
]

function Arrow() { return <span aria-hidden="true">↗</span> }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const [openQuestion, setOpenQuestion] = useState<number | null>(0)

  useEffect(() => {
    if (activeImage === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImage(null)
      if (event.key === 'ArrowRight') setActiveImage((current) => current === null ? null : (current + 1) % gallery.length)
      if (event.key === 'ArrowLeft') setActiveImage((current) => current === null ? null : (current + gallery.length - 1) % gallery.length)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.classList.add('modal-open')
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.classList.remove('modal-open') }
  }, [activeImage])

  const closeMenu = () => setMenuOpen(false)

  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="site-header">
      <a href="#inicio" className="brand" aria-label="Pingo Club, inicio"><img src={logo} alt="Pingo Club" /></a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="menu-icon" aria-hidden="true">{menuOpen ? '×' : '☰'}</span><span className="sr-only">{menuOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
      </button>
      <nav id="main-nav" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navegación principal">
        {links.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
        <a className="nav-cta" href={`https://wa.me/${social.phone.slice(1)}`} target="_blank" rel="noreferrer" onClick={closeMenu}>Escríbenos <Arrow /></a>
      </nav>
    </header>

    <main id="contenido">
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> ESTÉTICA INFANTIL · GUADALUPE, ZAC.</div>
          <h1>Pequeños cortes,<br /><span>grandes sonrisas.</span></h1>
          <p>Un espacio pensado para que cada visita se sienta como una aventura. Diversión en cada corte.</p>
          <div className="hero-actions"><a className="button button-orange" href={`https://wa.me/${social.phone.slice(1)}`} target="_blank" rel="noreferrer">Escríbenos por WhatsApp <Arrow /></a><a className="text-link" href="#nosotros">Conoce Pingo Club <span aria-hidden="true">↓</span></a></div>
          <div className="hero-note"><span className="note-star">✳</span><span>Un lugar amable para<br />peques y familias</span></div>
        </div>
        <div className="hero-art">
          <div className="hero-photo-wrap"><img src={place} alt="Interior de Pingo Club" fetchPriority="high" /><span className="photo-tag"><span>✳</span> Diversión en cada corte</span></div>
          <div className="hero-sticker">¡Hola,<br /><b>familia!</b></div>
          <div className="hero-spark spark-one">✦</div><div className="hero-spark spark-two">✳</div>
        </div>
        <div className="hero-bottom"><span>DESLIZA PARA DESCUBRIR</span><span className="hero-line" /><span>01 — 05</span></div>
      </section>

      <section className="intro section-pad" id="nosotros">
        <div className="section-kicker">01 / BIENVENIDOS A PINGO</div>
        <div className="intro-grid"><h2>Un corte puede<br />ser <span>una aventura.</span></h2><div className="intro-text"><p>En Pingo Club creemos que ir a la estética puede ser una experiencia alegre y tranquila para los más pequeños. Creamos un espacio con color, imaginación y un trato amable para que cada visita se sienta especial.</p><a className="under-link" href="#experiencia">Así se vive Pingo <span>↓</span></a></div></div>
        <div className="mascot-strip"><img src={mascots} alt="Ilustraciones de las mascotas originales de Pingo Club" loading="lazy" /><span className="mascot-caption">UN TOQUE DE MAGIA<br />EN CADA VISITA <b>✳</b></span></div>
      </section>

      <section className="services section-pad" id="servicios">
        <div className="section-kicker">02 / LO QUE HACEMOS</div>
        <div className="section-heading"><h2>Un mundo de<br /><span>posibilidades.</span></h2><p>Queremos contarte todo sobre nuestros servicios. Estamos afinando los detalles para compartir información precisa muy pronto.</p></div>
        <div className="service-card"><div className="service-number">01</div><div className="service-copy"><span className="service-label">INFORMACIÓN EN PREPARACIÓN</span><h3>Servicios Pingo Club</h3><p>Consulta por mensaje qué opciones están disponibles para tu peque. Actualizaremos esta sección con el catálogo confirmado.</p></div><a href={`https://wa.me/${social.phone.slice(1)}`} target="_blank" rel="noreferrer" className="round-arrow" aria-label="Consultar servicios por WhatsApp"><Arrow /></a></div>
        <div className="service-foot"><span>DETALLES CONFIRMADOS, PRÓXIMAMENTE</span><span>— PINGO CLUB</span></div>
      </section>

      <section className="experience" id="experiencia"><div className="experience-image"><img src={placeTwo} alt="Un vistazo al espacio de Pingo Club" loading="lazy" /><span className="image-index">GDL · ZACATECAS</span></div><div className="experience-copy"><div className="section-kicker">03 / A SU RITMO</div><h2>Paciencia,<br />color y <span>cariño.</span></h2><p>Sabemos que cada peque vive su visita a su manera. En Pingo Club, la idea es hacer del cuidado del cabello un momento más amable, cercano y lleno de buena energía.</p><div className="experience-sign">Con cariño, <b>Pingo Club</b> <span>✳</span></div></div></section>

      <section className="gallery-section section-pad" id="galeria"><div className="section-kicker">04 / UN VISTAZO A PINGO</div><div className="gallery-heading"><h2>Color por<br /><span>todos lados.</span></h2><p>Asómate al mundo Pingo.<br />Toca una imagen para verla mejor.</p></div><div className="gallery-grid">{gallery.map((item, index) => <button type="button" className={`gallery-item gallery-item-${index + 1}`} key={item.src} onClick={() => setActiveImage(index)} aria-label={`Ampliar imagen: ${item.label}`}><img src={item.src} alt={item.alt} loading="lazy" /><span className="gallery-caption">{item.label}<span>↗</span></span></button>)}</div></section>

      <section className="faq section-pad" id="preguntas"><div className="faq-intro"><div className="section-kicker">05 / PREGUNTAS FRECUENTES</div><h2>¿Tienes<br />curiosidad?</h2><p>Te ayudamos a encontrar la información que necesitas.</p><a className="under-link" href={`https://wa.me/${social.phone.slice(1)}`} target="_blank" rel="noreferrer">Pregúntanos por WhatsApp <Arrow /></a></div><div className="faq-list">{questions.map((item, index) => <article className={openQuestion === index ? 'faq-item expanded' : 'faq-item'} key={item.q}><h3><button type="button" aria-expanded={openQuestion === index} onClick={() => setOpenQuestion(openQuestion === index ? null : index)}><span>{item.q}</span><span className="faq-plus" aria-hidden="true">{openQuestion === index ? '−' : '+'}</span></button></h3>{openQuestion === index && <p>{item.a}</p>}</article>)}</div></section>

      <section className="contact section-pad" id="contacto"><div className="contact-top"><div><div className="section-kicker">06 / NOS ENCANTARÍA CONOCERTE</div><h2>La próxima<br />sonrisa puede<br /><span>ser la tuya.</span></h2></div><a className="contact-button" href={`https://wa.me/${social.phone.slice(1)}`} target="_blank" rel="noreferrer"><span>Escríbenos<br />por WhatsApp</span><Arrow /></a></div><div className="contact-details"><div className="address-block"><span className="detail-label">ENCUÉNTRANOS</span><p>Calle Nieves y 2 de Mayo<br />Col. Camilo Torres, detrás del Tec de Mty<br />Guadalupe, Zacatecas, México</p><a href="https://www.google.com/maps/search/?api=1&query=Calle+Nieves+y+2+de+Mayo%2C+Colonia+Camilo+Torres%2C+Guadalupe%2C+Zacatecas%2C+Mexico" target="_blank" rel="noreferrer">Abrir en Google Maps <Arrow /></a><p className="phone-line"><a href={`tel:${social.phone}`}>Llamar: +52 492 125 5814</a></p></div><div className="social-block"><span className="detail-label">SIGUE EL MUNDO PINGO</span><a href={social.instagram} target="_blank" rel="noreferrer">Instagram <Arrow /></a><a href={social.tiktok} target="_blank" rel="noreferrer">TikTok <Arrow /></a><a href={social.facebook} target="_blank" rel="noreferrer">Facebook <Arrow /></a></div></div></section>
    </main>

    <footer className="site-footer"><a href="#inicio" className="footer-brand"><img src={logo} alt="Pingo Club" /></a><span className="footer-tagline">Estética infantil.<br />Diversión en cada corte. <b>✳</b></span><nav aria-label="Navegación del pie de página">{links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav><span className="copyright">© {new Date().getFullYear()} Pingo Club · Guadalupe, Zacatecas</span></footer>

    {activeImage !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galería de Pingo Club" onClick={() => setActiveImage(null)}><button type="button" className="lightbox-close" aria-label="Cerrar galería" onClick={() => setActiveImage(null)}>×</button><button type="button" className="lightbox-nav lightbox-prev" aria-label="Imagen anterior" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage + gallery.length - 1) % gallery.length) }}>‹</button><figure onClick={(event) => event.stopPropagation()}><img src={gallery[activeImage].src} alt={gallery[activeImage].alt} /><figcaption>{gallery[activeImage].label} <span>{String(activeImage + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span></figcaption></figure><button type="button" className="lightbox-nav lightbox-next" aria-label="Imagen siguiente" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage + 1) % gallery.length) }}>›</button></div>}
  </>
}

export default App
