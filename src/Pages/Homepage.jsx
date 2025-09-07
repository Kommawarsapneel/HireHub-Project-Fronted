import "./Homepage.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-text">
          <h1 className="hero-title">Welcome to <span>HireHub 🚀</span></h1>
          <p className="hero-subtitle">
            Connecting <strong>talent</strong> with <strong>opportunity</strong>.  
            Whether you are a <span className="highlight">job seeker</span> or a  
            <span className="highlight"> recruiter</span>, HireHub helps you find the right match.
          </p>

          <div className="hero-buttons">
            <a href="/signup" className="btn primary">Join Now</a>
            <a href="/login" className="btn secondary">Login In</a>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80"
            alt="HireHub banner"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="section-title">Why Choose HireHub?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=200&q=80" alt="Jobs" />
            <h3>Discover Opportunities</h3>
            <p>Browse thousands of job postings from top companies worldwide.</p>
          </div>
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=200&q=80" alt="Recruiter" />
            <h3>Hire Smarter</h3>
            <p>Recruiters can post jobs, track applicants, and find the best fit with ease.</p>
          </div>
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=200&q=80" alt="Career Growth" />
            <h3>Grow Professionally</h3>
            <p>Stay updated with the latest job trends and take the next step in your career.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

