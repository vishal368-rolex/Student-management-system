import "./App.css";

function Header() {
  return (
    <header>
      <h1>Student Management System</h1>
    </header>
  );
}

function StudentProfile({ name, department, year }) {
  return (
    <div className="student-profile">
      <h3>Student Profile</h3>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Year:</strong> {year}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <p>© 2026 Student Management System</p>
    </footer>
  );
}

function App() {
  const student1 = {
    name: "Anu",
    department: "CSE",
    year: "3rd Year"
  };

  const student2 = {
    name: "Bala",
    department: "Computer Science",
    year: "3rd Year"
  };

  return (
    <div className="app">
      <Header />

      <main>
        <h2>Student 1</h2>

        <StudentProfile
          name={student1.name}
          department={student1.department}
          year={student1.year}
        />

        <h2>Student 2</h2>

        <StudentProfile
          name={student2.name}
          department={student2.department}
          year={student2.year}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;