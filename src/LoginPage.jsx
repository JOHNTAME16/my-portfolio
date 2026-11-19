import { useEffect, useRef, useState } from 'react'
import './LoginPage.css'

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 6.5h17v11h-17z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 14v3" />
    </svg>
  )
}

function App() {
  const [panelOpen, setPanelOpen] = useState(true)
  const [mode, setMode] = useState('login')
  const [rememberMe, setRememberMe] = useState(true)
  const [message, setMessage] = useState('')
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!panelOpen) return undefined

    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setPanelOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled])',
      )
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [panelOpen])

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    if (mode === 'register' && formData.get('password') !== formData.get('confirmPassword')) {
      setMessage('Passwords do not match.')
      return
    }

    setMessage(
      mode === 'register'
        ? 'Registration is a visual demo and is not connected to an account yet.'
        : 'Sign-in is a visual demo and is not connected to an account yet.',
    )
  }

  const switchMode = (nextMode) => {
    setMessage('')
    setMode(nextMode)
    closeButtonRef.current?.focus()
  }

  return (
    <main className="login-page" id="home">
      <header className="site-header">
        <a className="site-logo" href="/" aria-label="Yohannes home">
          <span className="site-logo-mark" aria-hidden="true">Y</span>
          <span>Yohannes</span>
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <button
            type="button"
            className="header-login"
            onClick={() => setPanelOpen(true)}
          >
            Login
          </button>
        </nav>
      </header>

      <section className="login-stage" aria-label="Sign in">
        {panelOpen ? (
          <div className="panel-backdrop" onClick={() => setPanelOpen(false)}>
            <section
              className="login-card"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="login-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="close-button"
                aria-label="Close login form"
                onClick={() => setPanelOpen(false)}
                ref={closeButtonRef}
              >
                ×
              </button>

              <h1 id="login-title">{mode === 'login' ? 'Login' : 'Create account'}</h1>

              <form className="auth-form" onSubmit={handleSubmit}>
                {mode === 'register' && (
                  <div className="field-row">
                    <label className="visually-hidden" htmlFor="register-name">Name</label>
                    <input
                      id="register-name"
                      name="name"
                      type="text"
                      placeholder="Name"
                      autoComplete="name"
                      required
                    />
                  </div>
                )}

                <div className="field-row">
                  <label className="visually-hidden" htmlFor={`${mode}-email`}>Email</label>
                  <input
                    id={`${mode}-email`}
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    required
                  />
                  <MailIcon />
                </div>

                <div className="field-row">
                  <label className="visually-hidden" htmlFor={`${mode}-password`}>Password</label>
                  <input
                    id={`${mode}-password`}
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                    minLength={mode === 'register' ? 8 : undefined}
                    required
                  />
                  <LockIcon />
                </div>

                {mode === 'register' ? (
                  <div className="field-row">
                    <label className="visually-hidden" htmlFor="confirm-password">
                      Confirm password
                    </label>
                    <input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                    <LockIcon />
                  </div>
                ) : (
                  <div className="form-options">
                    <label className="remember-option">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(event) => setRememberMe(event.target.checked)}
                      />
                      <span>Remember me</span>
                    </label>
                  </div>
                )}

                <button className="submit-button" type="submit">
                  {mode === 'login' ? 'Login' : 'Register'}
                </button>
                {message && <p className="form-message" role="status">{message}</p>}

                <p className="switch-mode">
                  {mode === 'login' ? (
                    <>
                      Don’t have an account?{' '}
                      <button type="button" className="text-button" onClick={() => switchMode('register')}>
                        Register
                      </button>
                    </>
                  ) : (
                    <>
                      Already registered?{' '}
                      <button type="button" className="text-button" onClick={() => switchMode('login')}>
                        Login
                      </button>
                    </>
                  )}
                </p>
              </form>
              <a className="back-home-link" href="/">Back to homepage</a>
            </section>
          </div>
        ) : (
          <button type="button" className="reopen-button" onClick={() => setPanelOpen(true)}>
            Open login
          </button>
        )}
      </section>
    </main>
  )
}

export default App
