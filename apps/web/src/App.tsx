import './App.css';
import { CandidateSearch } from './features/candidate/components/CandidateSearch';

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>Score Analytics</h1>
          <p>Vietnam High School Graduation Exam 2024</p>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h2>Explore Exam Results</h2>

          <p>
            Check individual scores, explore score
            distributions, and discover the top Group A
            students.
          </p>
        </section>

        <section>
          <h2>Check Your Score</h2>

          <CandidateSearch />
        </section>

        <section>
          <h2>Score Distribution</h2>
        </section>

        <section>
          <h2>Top 10 Group A</h2>
        </section>
      </main>
    </div>
  );
}

export default App;
