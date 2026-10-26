
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./App.css";

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

// Reusable API request function
async function request(path, options = {}) {
  const endpoint = `${API_URL}${path}`;

  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(
        `Expected JSON from backend. Response: ${text.slice(0, 150)}`
      );
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Request failed (${response.status})`
      );
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Cannot connect to the backend. Check the API URL and make sure the backend is running."
      );
    }

    throw error;
  }
}

// Header
function Header() {
  return (
    <header className="header">
      <Link className="brand" to="/">
        <span className="brand-icon">✦</span>
        Intern<span>Connect</span>
      </Link>

      <nav>
        <Link to="/">Explore Internships</Link>
        <a href="/#how-it-works">How it works</a>
      </nav>

      <Link className="header-button" to="/">
        Find your role <span>↗</span>
      </Link>
    </header>
  );
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <Link className="brand" to="/">
        <span className="brand-icon">✦</span>
        Intern<span>Connect</span>
      </Link>
      <p>Take the first step toward your future.</p>
      <small>
        Student Internship Portal · Built with React and Node.js
      </small>
    </footer>
  );
}

// Internship listing
function InternshipList({ internships, loading, error, retry }) {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">
            <span className="live-dot" />
            YOUR CAREER STARTS HERE
          </span>

          <h1>
            Find work that
            <br />
            <span>moves you forward.</span>
          </h1>

          <p>
            Discover meaningful internships, learn from real teams,
            and turn what you know into what you can do.
          </p>

          <a href="#internships" className="primary-button">
            Explore opportunities <span>↓</span>
          </a>

          <div className="hero-note">
            <span>✓</span> Opportunities for curious minds
          </div>
        </div>

        <div className="hero-art" aria-label="Career growth illustration">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />

          <div className="art-card art-card-top">
            <span className="art-icon">↗</span>
            <div>
              <strong>New beginnings</strong>
              <small>Your next chapter</small>
            </div>
          </div>

          <div className="art-center">
            <div className="art-sun">✦</div>
            <div className="art-steps">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <strong>GROW</strong>
            <small>one step at a time</small>
          </div>

          <div className="art-card art-card-bottom">
            <span className="art-check">✓</span>
            <div>
              <strong>Potential unlocked</strong>
              <small>Start with an internship</small>
            </div>
          </div>

          <span className="spark spark-one">✳</span>
          <span className="spark spark-two">✦</span>
        </div>
      </section>

      <section className="stats">
        <div>
          <strong>01</strong>
          <span>Discover opportunities</span>
        </div>
        <div>
          <strong>02</strong>
          <span>Learn about the role</span>
        </div>
        <div>
          <strong>03</strong>
          <span>Submit your application</span>
        </div>
      </section>

      <main id="internships" className="main-content">
        <div className="section-heading">
          <div>
            <span className="section-kicker">
              CURATED FOR STUDENTS
            </span>
            <h2>
              Explore internships<span>.</span>
            </h2>
            <p>
              Find a role that matches your interests and ambitions.
            </p>
          </div>

          <span className="count-badge">
            {internships.length} opportunities
          </span>
        </div>

        {loading && (
          <p className="notice">Loading internships…</p>
        )}

        {error && (
          <div className="error-box" role="alert">
            <p>{error}</p>
            <button
              className="secondary-button"
              onClick={retry}
              type="button"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && internships.length === 0 && (
          <p className="notice">
            No internships are available right now.
          </p>
        )}

        {!loading && !error && internships.length > 0 && (
          <div className="internship-grid">
            {internships.map((internship) => (
              <article
                className="internship-card"
                key={internship.id}
              >
                <div className="card-topline">
                  <div className="company-avatar">
                    {internship.company?.charAt(0) || "I"}
                  </div>

                  <span className="open-badge">
                    <span /> Open
                  </span>
                </div>

                <p className="company-name">
                  {internship.company}
                </p>

                <h3>{internship.title}</h3>

                <p className="card-description">
                  {internship.description}
                </p>

                <div className="card-meta">
                  <span>⌖ {internship.location}</span>
                  <span>◷ {internship.duration}</span>
                </div>

                <div className="card-bottom">
                  <div>
                    <small>Monthly stipend</small>
                    <strong>{internship.stipend}</strong>
                  </div>

                  <Link
                    className="card-link"
                    to={`/internships/${internship.id}`}
                    state={{ internship }}
                  >
                    View details <span>↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <section id="how-it-works" className="how-section">
        <span className="section-kicker">YOUR NEXT STEP</span>
        <h2>Three steps. A world of possibilities.</h2>

        <div className="how-grid">
          <article>
            <span>01</span>
            <h3>Find your fit</h3>
            <p>
              Explore roles that match your skills and interests.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Know the role</h3>
            <p>
              Review responsibilities, location, and stipend.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Apply with confidence</h3>
            <p>
              Complete your details and submit your application.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

// Home page: fetch internships from Express API
function HomePage() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadInternships() {
    setLoading(true);
    setError("");

    try {
      const data = await request("/api/internships");

      if (!Array.isArray(data)) {
        throw new Error(
          "The internship API did not return a JSON array."
        );
      }

      setInternships(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInternships();
  }, []);

  return (
    <InternshipList
      internships={internships}
      loading={loading}
      error={error}
      retry={loadInternships}
    />
  );
}

// Internship details page
function InternshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    request(`/api/internships/${encodeURIComponent(id)}`)
      .then((data) => {
        if (active) setInternship(data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="page-message">
        Loading internship details…
      </main>
    );
  }

  if (error || !internship) {
    return (
      <main className="page-message">
        <h2>Internship not found</h2>
        <p>{error || "This opportunity is unavailable."}</p>
        <Link className="primary-button" to="/">
          Back to internships
        </Link>
      </main>
    );
  }

  return (
    <main className="details-layout">
      <button
        className="back-link"
        onClick={() => navigate("/")}
        type="button"
      >
        ← All internships
      </button>

      <section className="details-card">
        <div className="company-avatar large-avatar">
          {internship.company?.charAt(0) || "I"}
        </div>

        <span className="section-kicker">
          INTERNSHIP OVERVIEW
        </span>

        <h1>{internship.title}</h1>
        <p className="details-company">{internship.company}</p>
        <p className="details-description">
          {internship.description}
        </p>

        <div className="details-facts">
          <div>
            <small>Location</small>
            <strong>{internship.location}</strong>
          </div>
          <div>
            <small>Duration</small>
            <strong>{internship.duration}</strong>
          </div>
          <div>
            <small>Monthly stipend</small>
            <strong>{internship.stipend}</strong>
          </div>
        </div>

        <h3>What you'll gain</h3>

        <ul className="skills-list">
          {(
            internship.skills || [
              "Practical experience",
              "Mentorship",
              "Teamwork",
            ]
          ).map((skill) => (
            <li key={skill}>✓ {skill}</li>
          ))}
        </ul>

        <button
          className="primary-button full-button"
          onClick={() =>
            navigate(`/apply/${internship.id}`, {
              state: { internship },
            })
          }
          type="button"
        >
          Apply for this internship <span>↗</span>
        </button>
      </section>
    </main>
  );
}

// Application form
function ApplicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [internship, setInternship] = useState(null);
  const [loadingInternship, setLoadingInternship] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    rollNumber: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    let active = true;

    request(`/api/internships/${encodeURIComponent(id)}`)
      .then((data) => {
        if (active) setInternship(data);
      })
      .catch((err) => {
        if (active) setMessage(err.message);
      })
      .finally(() => {
        if (active) setLoadingInternship(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  function validate() {
    const next = {};

    if (form.name.trim().length < 2) {
      next.name = "Enter your full name (at least 2 characters).";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      next.email = "Enter a valid email address.";
    }

    if (!/^[a-zA-Z0-9/-]{3,30}$/.test(form.rollNumber.trim())) {
      next.rollNumber =
        "Use 3–30 letters, numbers, hyphens, or slashes.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setMessage("");
  }

  async function submitApplication(event) {
    event.preventDefault();
    setMessage("");
    setSuccess(false);

    if (!validate()) return;

    if (!internship) {
      setMessage("Please select a valid internship before applying.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await request("/api/applications", {
        method: "POST",
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          rollNumber: form.rollNumber.trim(),
          internshipId: String(internship.id),
        }),
      });

      setSuccess(true);
      setMessage(
        result.message || "Application submitted successfully!"
      );

      setForm({
        name: "",
        email: "",
        rollNumber: "",
      });

      setErrors({});
    } catch (err) {
      setSuccess(false);
      setMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingInternship) {
    return (
      <main className="page-message">
        Loading application form…
      </main>
    );
  }

  if (!internship) {
    return (
      <main className="page-message">
        <h2>Unable to load internship</h2>
        <p>{message}</p>
        <Link to="/" className="primary-button">
          Back to internships
        </Link>
      </main>
    );
  }

  return (
    <main className="apply-layout">
      <button
        className="back-link"
        onClick={() =>
          navigate(`/internships/${internship.id}`)
        }
        type="button"
      >
        ← Back to internship
      </button>

      <section className="apply-card">
        <div className="section-kicker">YOUR NEXT CHAPTER</div>
        <h1>
          Make it happen<span>.</span>
        </h1>

        <p className="apply-intro">
          Complete the form below to apply for this opportunity.
        </p>

        <div className="selected-internship">
          <div className="company-avatar">
            {internship.company?.charAt(0) || "I"}
          </div>

          <div>
            <small>Applying for</small>
            <strong>{internship.title}</strong>
            <span>{internship.company}</span>
          </div>

          <span className="open-badge">
            <span /> Selected
          </span>
        </div>

        <form onSubmit={submitApplication} noValidate>
          <label htmlFor="name">
            Full name <span>*</span>
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={updateField}
            placeholder="Enter your full name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && (
            <small className="field-error">{errors.name}</small>
          )}

          <label htmlFor="email">
            Email address <span>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder="you@example.com"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <small className="field-error">{errors.email}</small>
          )}

          <label htmlFor="rollNumber">
            Student roll number <span>*</span>
          </label>
          <input
            id="rollNumber"
            name="rollNumber"
            value={form.rollNumber}
            onChange={updateField}
            placeholder="e.g. 24BCS316"
            autoComplete="off"
            required
            aria-invalid={Boolean(errors.rollNumber)}
          />
          {errors.rollNumber && (
            <small className="field-error">
              {errors.rollNumber}
            </small>
          )}

          <div className="form-note">
            Your application will be stored in the portal database.
          </div>

          {message && (
            <div
              className={success ? "success-box" : "error-box"}
              role="status"
              aria-live="polite"
            >
              {message}
            </div>
          )}

          <button
            className="primary-button full-button"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Submitting application…"
              : "Submit application"}
            {!submitting && <span>↗</span>}
          </button>

          {success && (
            <button
              className="secondary-button full-button"
              type="button"
              onClick={() => navigate("/")}
            >
              Explore more internships
            </button>
          )}
        </form>
      </section>
    </main>
  );
}

// Unknown route
function NotFound() {
  return (
    <main className="page-message">
      <h1>404 — Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="primary-button">
        Return home
      </Link>
    </main>
  );
}

// Application routes
function AppShell() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/internships/:id"
          element={<InternshipDetails />}
        />
        <Route path="/apply/:id" element={<ApplicationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
