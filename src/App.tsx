import { useEffect, useState } from 'react'
import logo from './assets/images/logo.jpg'
import mascots from './assets/images/mascotitas.jpg'
import placeTwo from './assets/images/lugar2.jpg'
import galleryPlayArea from './assets/images/gallery-juegos.jpg'
import galleryMascots from './assets/images/gallery-mascotas.jpg'
import gallerySalon from './assets/images/gallery-estetica.jpg'
import experiencePhoto from './assets/images/experience.jpg'
import BookingCalendar from './components/BookingCalendar'
import './App.css'

const links = [
  ['Nosotros', '#nosotros'], ['Servicios', '#servicios'], ['Citas', '#citas'], ['Galería', '#galeria'],
  ['Preguntas', '#preguntas'], ['Contacto', '#contacto'],
] as const

const social = {
  instagram: 'https://www.instagram.com/pingoclubb?utm_source=qr&xtok=MWw5ZjB1anRjdGxrbg%3D%3D',
  tiktok: 'https://www.tiktok.com/@pingo.club?_r=1&_t=ZS-9BLuYEbRSky',
  facebook: 'https://www.facebook.com/profile.php?id=61591742108784&rdid=zbXXxzUrUITQVolg&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FHV6vpAXQ%2F#',
  phones: ['+524921255814', '+524921811314'],
}

const services = [
  { title: 'Corte infantil', detail: 'Niñas y niños', price: '$110', note: 'Precio de inauguración' },
  { title: 'Primer corte', detail: 'Incluye diploma y mechoncito de cabello', price: '$110', note: 'Un recuerdo de su primer corte' },
  { title: 'Mechitas de colores', detail: 'Dale un toque de color', price: '$40', note: 'Por servicio' },
  { title: 'Corte para hermanos', detail: 'Venir en pareja tiene beneficio', price: '2 por $200', note: 'Para hermanos' },
  { title: 'Peinados de fantasía', detail: 'Atención con cita', price: 'Con cita', note: 'Agenda por WhatsApp' },
  { title: 'Pinta caritas', detail: 'Atención con cita', price: 'Con cita', note: 'Agenda por WhatsApp' },
]

const gallery = [
  { src: gallerySalon, alt: 'Interior de Pingo Club con arcos decorativos y sillas infantiles para corte', label: 'Conoce nuestra estética' },
  { src: galleryPlayArea, alt: 'Área de juegos colorida de Pingo Club', label: 'Un espacio para jugar' },
  { src: galleryMascots, alt: 'Ilustraciones de Pingo Club en una pared celeste', label: 'El mundo Pingo' },
  { src: placeTwo, alt: 'Interior de Pingo Club mostrado en el apartado Paciencia, color y cariño', label: 'Un espacio amable para cada visita' },
]

const questions = [
  { q: '¿Qué servicios ofrecen?', a: 'Tenemos cortes infantiles, primer corte con diploma y mechoncito, mechitas de colores, precio especial para hermanos, peinados de fantasía y pinta caritas.' },
  { q: '¿Necesito agendar una cita?', a: 'Puedes venir con o sin cita, como prefiera tu familia. Los peinados de fantasía y la pinta caritas se atienden solo con cita.' },
  { q: '¿Cómo llego a Pingo Club?', a: 'Estamos en Calle Nieves y 2 de Mayo, Colonia Camilo Torres, detrás del Tec de Mty, en Guadalupe, Zacatecas.' },
  { q: '¿Cuál es el horario?', a: 'De lunes a viernes, de 1:00 p. m. a 7:00 p. m.; sábados y domingos, de 10:00 a. m. a 5:00 p. m.' },
  { q: '¿Cuánto cuesta el corte?', a: 'Por inauguración, el corte infantil cuesta $110. El primer corte también cuesta $110 e incluye un diploma y un mechoncito de cabello. Las mechitas de colores cuestan $40 y hay precio para hermanos: 2 por $200.' },
]

const whatsappHref = (phone: string) => `https://wa.me/${phone.replaceAll('+', '')}`

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
        <a className="nav-cta" href={whatsappHref(social.phones[0])} target="_blank" rel="noreferrer" onClick={closeMenu}>Escríbenos <Arrow /></a>
      </nav>
    </header>

    <main id="contenido">
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> ESTÉTICA INFANTIL · GUADALUPE, ZAC.</div>
          <h1>Pequeños cortes,<br /><span>grandes sonrisas.</span></h1>
          <p>Un espacio pensado para que cada visita se sienta como una aventura. Diversión en cada corte.</p>
          <div className="hero-actions"><a className="button button-orange" href={whatsappHref(social.phones[0])} target="_blank" rel="noreferrer">Escríbenos por WhatsApp <Arrow /></a><a className="text-link" href="#citas">Agenda una cita <span aria-hidden="true">↓</span></a></div>
          <div className="hero-note"><span className="note-star">✳</span><span>Un lugar amable para<br />peques y familias</span></div>
        </div>
        <div className="hero-art">
          <div className="hero-photo-wrap"><img src={gallerySalon} alt="Interior de Pingo Club con sillas infantiles para corte" fetchPriority="high" /><span className="photo-tag"><span>✳</span> Diversión en cada corte</span></div>
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
        <div className="section-heading"><h2>Un mundo de<br /><span>posibilidades.</span></h2><p>Un corte divertido para cada peque, desde su primera visita hasta un peinado de fantasía. ¡Será un gusto recibir a tu familia!</p></div>
        <div className="services-grid">{services.map((service, index) => <article className="service-card" key={service.title}><div className="service-number">{String(index + 1).padStart(2, '0')}</div><div className="service-copy"><span className="service-label">{service.note}</span><h3>{service.title}</h3><p>{service.detail}</p></div><div className="service-price">{service.price}</div></article>)}</div>
        <div className="service-foot"><span>PEINADOS DE FANTASÍA Y PINTA CARITAS · SOLO CON CITA</span><span>— PINGO CLUB</span></div>
      </section>

      <BookingCalendar />

      <section className="experience" id="experiencia"><div className="experience-image"><img src={experiencePhoto} alt="Espejo decorado con ilustraciones coloridas en Pingo Club" loading="lazy" /><span className="image-index">GPE · ZACATECAS</span></div><div className="experience-copy"><div className="section-kicker">03 / A SU RITMO</div><h2>Paciencia,<br />color y <span>cariño.</span></h2><p>Sabemos que cada peque vive su visita a su manera. En Pingo Club, la idea es hacer del cuidado del cabello un momento más amable, cercano y lleno de buena energía.</p><div className="experience-sign">Con cariño, <b>Pingo Club</b> <span>✳</span></div></div></section>

      <section className="gallery-section section-pad" id="galeria"><div className="section-kicker">04 / UN VISTAZO A PINGO</div><div className="gallery-heading"><h2>Color por<br /><span>todos lados.</span></h2><p>Asómate al mundo Pingo.<br />Toca una imagen para verla mejor.</p></div><div className="gallery-grid">{gallery.map((item, index) => <button type="button" className={`gallery-item gallery-item-${index + 1}`} key={item.src} onClick={() => setActiveImage(index)} aria-label={`Ampliar imagen: ${item.label}`}><img src={item.src} alt={item.alt} loading="lazy" /><span className="gallery-caption">{item.label}<span>↗</span></span></button>)}</div></section>

      <section className="faq section-pad" id="preguntas"><div className="faq-intro"><div className="section-kicker">05 / PREGUNTAS FRECUENTES</div><h2>¿Tienes<br />curiosidad?</h2><p>Te ayudamos a encontrar la información que necesitas.</p><a className="under-link" href={whatsappHref(social.phones[0])} target="_blank" rel="noreferrer">Pregúntanos por WhatsApp <Arrow /></a></div><div className="faq-list">{questions.map((item, index) => <article className={openQuestion === index ? 'faq-item expanded' : 'faq-item'} key={item.q}><h3><button type="button" aria-expanded={openQuestion === index} onClick={() => setOpenQuestion(openQuestion === index ? null : index)}><span>{item.q}</span><span className="faq-plus" aria-hidden="true">{openQuestion === index ? '−' : '+'}</span></button></h3>{openQuestion === index && <p>{item.a}</p>}</article>)}</div></section>

      <section className="contact section-pad" id="contacto"><div className="contact-top"><div><div className="section-kicker">06 / NOS ENCANTARÍA CONOCERTE</div><h2>La próxima<br />sonrisa puede<br /><span>ser la tuya.</span></h2><p className="contact-hours">Lun–vie · 1:00 p. m.–7:00 p. m.<br />Sáb–dom · 10:00 a. m.–5:00 p. m.</p></div><a className="contact-button" href={whatsappHref(social.phones[0])} target="_blank" rel="noreferrer"><span>Escríbenos<br />por WhatsApp</span><Arrow /></a></div><div className="contact-details"><div className="address-block"><span className="detail-label">ENCUÉNTRANOS</span><p>Calle Nieves y 2 de Mayo<br />Col. Camilo Torres, detrás del Tec de Mty<br />Guadalupe, Zacatecas, México</p><a href="https://www.google.com/maps/search/?api=1&query=Calle+Nieves+y+2+de+Mayo%2C+Colonia+Camilo+Torres%2C+Guadalupe%2C+Zacatecas%2C+Mexico" target="_blank" rel="noreferrer">Abrir en Google Maps <Arrow /></a><p className="phone-line">Teléfono y WhatsApp:<br />{social.phones.map((phone) => <a href={`tel:${phone}`} key={phone}>{phone.replace('+52', '+52 ')}</a>)}</p><div className="whatsapp-numbers">{social.phones.map((phone) => <a href={whatsappHref(phone)} target="_blank" rel="noreferrer" key={phone}>WhatsApp {phone.replace('+52', '+52 ')}</a>)}</div></div><div className="social-block"><span className="detail-label">SIGUE EL MUNDO PINGO</span><a href={social.instagram} target="_blank" rel="noreferrer">Instagram <Arrow /></a><a href={social.tiktok} target="_blank" rel="noreferrer">TikTok <Arrow /></a><a href={social.facebook} target="_blank" rel="noreferrer">Facebook <Arrow /></a></div></div></section>
    </main>

    <footer className="site-footer"><a href="#inicio" className="footer-brand"><img src={logo} alt="Pingo Club" /></a><span className="footer-tagline">Estética infantil.<br />Diversión en cada corte. <b>✳</b></span><nav aria-label="Navegación del pie de página">{links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav><span className="copyright">© {new Date().getFullYear()} Pingo Club · Guadalupe, Zacatecas</span></footer>

    {activeImage !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galería de Pingo Club" onClick={() => setActiveImage(null)}><button type="button" className="lightbox-close" aria-label="Cerrar galería" onClick={() => setActiveImage(null)}>×</button><button type="button" className="lightbox-nav lightbox-prev" aria-label="Imagen anterior" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage + gallery.length - 1) % gallery.length) }}>‹</button><figure onClick={(event) => event.stopPropagation()}><img src={gallery[activeImage].src} alt={gallery[activeImage].alt} /><figcaption>{gallery[activeImage].label} <span>{String(activeImage + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span></figcaption></figure><button type="button" className="lightbox-nav lightbox-next" aria-label="Imagen siguiente" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage + 1) % gallery.length) }}>›</button></div>}
  </>
}

export default App
