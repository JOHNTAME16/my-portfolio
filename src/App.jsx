import { useEffect, useState } from 'react'
import LoginPage from './LoginPage.jsx'
import './App.css'

const projects = [
  {
    number: '01',
    title: 'Pulse',
    category: 'Full Stack Web App',
    description: 'A focused fitness companion that turns daily movement into meaningful progress.',
    details: 'Built with React, Node.js, and PostgreSQL. Features user authentication, step tracking, and RESTful APIs.',
    accent: 'violet',
  },
  {
    number: '02',
    title: 'Monument',
    category: 'Web Platform & CMS',
    description: 'A digital identity and content platform for an architecture studio.',
    details: 'A full-stack platform with project filtering, image management, and a responsive interface.',
    accent: 'green',
  },
  {
    number: '03',
    title: 'Frame',
    category: 'Full Stack Development',
    description: 'An editorial platform for discovering independent films and their creators.',
    details: 'A React and Express experience with searchable films and community reviews.',
    accent: 'orange',
  },
  {
    number: '04',
    title: 'JOHN',
    category: 'GitHub Repository',
    description: 'My public GitHub repository.',
    details: 'Open my public repository on GitHub.',
    accent: 'github',
    repositoryUrl: 'https://github.com/JOHNTAME16/JOHN',
  },
]

const skills = [
  'React & Next.js',
  'JavaScript / TypeScript',
  'Node.js & Express',
  'PostgreSQL & MongoDB',
  'REST APIs',
  'Responsive Web',
]

function Arrow({ diagonal = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {diagonal ? (
        <path d="M5 19 19 5M9 5h10v10" />
      ) : (
        <path d="M5 12h14m-6-6 6 6-6 6" />
      )}
    </svg>
  )
}

function ContactSection() {
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      setStatus({
        type: 'error',
        message: 'The contact form is not configured yet. Please email me directly.',
      })
      return
    }

    setIsSending(true)
    setStatus({ type: 'sending', message: 'Sending your message…' })

    const payload = Object.fromEntries(new FormData(form).entries())
    payload.access_key = accessKey
    payload.subject = 'New project inquiry from Yohannes portfolio'
    payload.from_name = 'Yohannes Portfolio'

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const result = await response.json()

      if (!response.ok || result.success !== true) {
        setStatus({
          type: 'error',
          message: result.message || 'Unable to send your message. Please try again.',
        })
        return
      }

      form.reset()
      setStatus({
        type: 'success',
        message: 'Message sent successfully. I’ll get back to you soon.',
      })
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setStatus({
        type: 'error',
        message: 'Unable to send your message. Check your connection and try again.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className="home-contact" id="contact">
      <div className="home-contact-grid">
        <div className="home-contact-copy">
          <p className="home-contact-eyebrow">Get in touch</p>
          <h2>Let’s work together</h2>
          <p>
            Have a project in mind or want to discuss a collaboration? Send me a
            message and I’ll get back to you soon.
          </p>
          <div className="home-contact-info">
            <p>Based in Ethiopia</p>
            <a href="mailto:yohanestame9@gmail.com">yohanestame9@gmail.com</a>
          </div>
        </div>

        <form
          className="home-contact-form"
          onSubmit={handleSubmit}
          onChange={() => {
            if (status?.type !== 'sending') setStatus(null)
          }}
        >
          <div className="home-contact-fields">
            <div className="home-contact-field">
              <label htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                required
              />
            </div>
            <div className="home-contact-field">
              <label htmlFor="contact-info">Email or phone</label>
              <input
                id="contact-info"
                name="contact_info"
                type="text"
                autoComplete="on"
                placeholder="you@example.com or +251..."
                required
              />
            </div>
          </div>

          <div className="home-contact-field">
            <label htmlFor="contact-project-type">Project type</label>
            <select id="contact-project-type" name="project_type" defaultValue="Full-Stack Web App">
              <option value="Full-Stack Web App">Full-Stack Web Application</option>
              <option value="E-Commerce Store">E-Commerce / Online Store</option>
              <option value="Event Management System">Event &amp; Sales System</option>
              <option value="Other">Other / Consultation</option>
            </select>
          </div>

          <div className="home-contact-field">
            <label htmlFor="contact-message">Project details</label>
            <textarea
              id="contact-message"
              name="message"
              rows="5"
              placeholder="Tell me about your project, timeline, and goals..."
              required
            />
          </div>

          <button className="home-contact-submit" type="submit" disabled={isSending}>
            {isSending ? 'Sending…' : 'Send message'}
          </button>

          {status && (
            <p className={`home-contact-status ${status.type}`} role="status" aria-live="polite">
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

function PortfolioHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [portraitAvailable, setPortraitAvailable] = useState(true)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setSelectedProject(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <main className="site-home" id="top">
      <a className="skip-link" href="#work">Skip to selected work</a>
      <nav className="home-nav" aria-label="Main navigation">
        <a className="home-brand" href="#top" aria-label="Yohannes home">
          <span className="home-brand-mark">Y</span>
          <span>Yohannes</span>
        </a>

        <button
          className="home-menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="home-nav-links"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <div id="home-nav-links" className={`home-nav-links ${menuOpen ? 'is-open' : ''}`}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a className="home-login-link" href="/login">Login</a>
        </div>
      </nav>

      <section className="home-hero">
        <div className="home-hero-grid">
          <div className="home-hero-copy">
            <span className="home-availability">
              <span />
              Available for select projects
            </span>
            <h1>
              Hi, I’m Yohannes.
              <br />
              <span>Full Stack Web Developer</span>
            </h1>
            <p>
              I build scalable, modern web applications from database architecture
              to user interface.
            </p>
            <div className="home-hero-actions">
              <a className="home-primary-action" href="#contact">Let’s talk</a>
              <a className="home-secondary-action" href="#work">Selected work</a>
            </div>
          </div>
          <div className="home-portrait-wrap">
            {portraitAvailable ? (
              <img
                className="home-portrait"
                src="/yohanes-cutout.png"
                alt="Yohannes, Full Stack Web Developer"
                onError={() => setPortraitAvailable(false)}
              />
            ) : (
              <div className="home-portrait home-portrait-fallback" aria-label="Yohannes portrait placeholder">
                <span>Y</span>
                <small>Add your photo as public/yohanes.jpg</small>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="home-work" id="work">
        <div className="home-section-heading">
          <p>Selected work</p>
          <span>2023—2026</span>
        </div>
        <div className="home-project-grid">
          {projects.map((project) => (
            <article className="home-project" key={project.title}>
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className={`home-project-image ${project.accent}`}
                aria-label={`View ${project.title} details`}
              >
                <div className="home-project-art">
                  {project.accent === 'violet' && (
                    <>
                      <div className="home-phone home-phone-back" />
                      <div className="home-phone home-phone-front">
                        <span>TODAY</span>
                        <strong>8,420</strong>
                        <small>steps</small>
                        <div />
                      </div>
                    </>
                  )}
                  {project.accent === 'green' && (
                    <>
                      <div className="home-monument-block block-one" />
                      <div className="home-monument-block block-two" />
                      <div className="home-monument-block block-three" />
                      <span className="home-monogram">M</span>
                    </>
                  )}
                  {project.accent === 'orange' && (
                    <>
                      <div className="home-film-frame frame-one" />
                      <div className="home-film-frame frame-two" />
                      <div className="home-film-copy">
                        <span>Independent Cinema</span>
                        <strong>Frame</strong>
                      </div>
                    </>
                  )}
                  {project.accent === 'github' && (
                    <div className="home-repo-art">
                      <span>GitHub repository</span>
                      <strong>JOHN</strong>
                      <small>Public repository</small>
                    </div>
                  )}
                </div>
                <span className="home-project-arrow"><Arrow diagonal /></span>
              </button>
              <div className="home-project-meta">
                <div>
                  <span>{project.number}</span>
                  <h2>{project.title}</h2>
                </div>
                <p>{project.category}</p>
              </div>
              <p className="home-project-description">{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-about" id="about">
        <div className="home-section-heading"><p>About</p></div>
        <div className="home-about-grid">
          <h2>Frontend precision,<br />backend power.</h2>
          <div className="home-about-copy">
            <p>
              I’m a full-stack web developer focused on building fast, reliable,
              user-friendly applications—from clear interfaces to secure APIs and databases.
            </p>
            <div className="home-skills">
              {skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>
        </div>
      </section>

      <ContactSection />

      <footer className="home-footer">
        <div className="home-footer-bottom">
          <span>© 2026 Yohannes. All rights reserved.</span>
          <span>Based in Ethiopia</span>
          <a href="mailto:yohanestame9@gmail.com">yohanestame9@gmail.com</a>
          <a href="https://github.com/JOHNTAME16/JOHN" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="#top">Back to top <Arrow /></a>
        </div>
      </footer>

      {selectedProject && (
        <div className="home-dialog-backdrop" onClick={() => setSelectedProject(null)}>
          <section
            className="home-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="home-dialog-heading">
              <span>{selectedProject.number} / {selectedProject.category}</span>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
              >
                ×
              </button>
            </div>
            <h2 id="home-dialog-title">{selectedProject.title}</h2>
            <p>{selectedProject.details}</p>
            {selectedProject.repositoryUrl && (
              <a
                className="home-dialog-link"
                href={selectedProject.repositoryUrl}
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub <Arrow diagonal />
              </a>
            )}
          </section>
        </div>
      )}
    </main>
  )
}

function App() {
  const isLoginPage = window.location.pathname.replace(/\/+$/, '') === '/login'

  useEffect(() => {
    document.title = isLoginPage ? 'Login — Yohannes' : 'Yohannes — Full Stack Web Developer'
  }, [isLoginPage])

  return isLoginPage ? <LoginPage /> : <PortfolioHome />
}

export default App
