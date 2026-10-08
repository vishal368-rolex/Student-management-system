import { useEffect, useState } from "react";
import "./App.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">🎓</div>
      <div>
        <h1>Student Management System</h1>
        <p>Student Practice Dashboard</p>
      </div>
    </header>
  );
}

function StudentProfile({
  name,
  department,
  year,
  practiceCount
}) {
  useEffect(() => {
    const previousTitle = document.title;

    document.title = `Practice Sessions: ${practiceCount}`;

    return () => {
      document.title = previousTitle;
    };
  }, [practiceCount]);

  const getStatus = () => {
    if (practiceCount === 0) return "Ready to Start";
    if (practiceCount < 3) return "Getting Started";
    if (practiceCount < 5) return "Consistent Learner";
    return "Practice Champion";
  };

  const getMessage = () => {
    if (practiceCount === 0) {
      return "Start your first practice session!";
    }

    if (practiceCount < 3) {
      return "Great start! Keep practising.";
    }

    if (practiceCount < 5) {
      return "Excellent consistency! Keep going.";
    }

    return "🏆 Amazing! You are a Practice Champion!";
  };

  const progress = Math.min(practiceCount * 20, 100);

  return (
    <section className="profile-card">

      <div className="profile-top">
        <div className="avatar">A</div>

        <div>
          <h2>{name}</h2>
          <span className="active-status">
            ● Profile Active
          </span>
        </div>
      </div>

      <div className="student-info">

        <div className="info-box">
          <span className="label">DEPARTMENT</span>
          <strong>{department}</strong>
        </div>

        <div className="info-box">
          <span className="label">YEAR</span>
          <strong>{year}</strong>
        </div>

      </div>

      <div className="practice-section">

        <div className="practice-header">
          <div>
            <span className="label">PRACTICE PROGRESS</span>
            <h3>{practiceCount} Sessions</h3>
          </div>

          <div className="session-number">
            {practiceCount}
          </div>
        </div>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="progress-text">
          <span>{progress}% completed</span>
          <span>Goal: 5 sessions</span>
        </div>

      </div>

      <div className="achievement">
        <div className="achievement-icon">🏆</div>

        <div>
          <strong>{getStatus()}</strong>
          <p>{getMessage()}</p>
        </div>
      </div>

    </section>
  );
}

function Footer() {
  return (
    <footer>
      <p>© 2026 Student Management System</p>
      <span>Built with React • Learning by Practice</span>
    </footer>
  );
}

function App() {

  const student = {
    name: "Anu",
    department: "CSE",
    year: "3rd Year"
  };

  const [practiceCount, setPracticeCount] = useState(0);
  const [showProfile, setShowProfile] = useState(true);

  const completePractice = () => {
    setPracticeCount((count) => count + 1);
  };

  const resetPractice = () => {
    setPracticeCount(0);
  };

  const toggleProfile = () => {
    setShowProfile((visible) => !visible);
  };

  return (
    <div className="app">

      <Header />

      <main>

        <div className="welcome">
          <span>WELCOME BACK 👋</span>
          <h2>Track Your Learning Journey</h2>
          <p>
            Complete practice sessions and build your skills
            consistently.
          </p>
        </div>

        {showProfile && (
          <StudentProfile
            name={student.name}
            department={student.department}
            year={student.year}
            practiceCount={practiceCount}
          />
        )}

        <div className="controls">

          <button
            className="complete-btn"
            onClick={completePractice}
          >
            ✓ Complete Practice
          </button>

          <button
            className="reset-btn"
            onClick={resetPractice}
          >
            ↻ Reset
          </button>

          <button
            className="toggle-btn"
            onClick={toggleProfile}
          >
            {showProfile
              ? "👁 Hide Profile"
              : "👁 Show Profile"}
          </button>

        </div>

        <div className="concept-card">

          <div>
            <span className="concept-icon">⚛️</span>
          </div>

          <div>
            <strong>React Concepts Demonstrated</strong>

            <p>
              Components • JSX • Props • State • useState •
              useEffect • Mounting • Updating • Unmounting
            </p>
          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default App;