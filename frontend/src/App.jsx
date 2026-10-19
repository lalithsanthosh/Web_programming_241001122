import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8000';

// Built-in fallback sample projects (works immediately even before XAMPP/PHP is set up)
const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: 'Recharge & Titanium College Fest',
    category: 'photo',
    description: 'High-energy live stage and crowd photography with dynamic concert lighting at Rajalakshmi Engineering College.',
    image_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-a-dj-playing-music-40898-large.mp4'
  },
  {
    id: 2,
    title: 'Arun Siddharth Workshop BTS',
    category: 'video',
    description: 'Polished behind-the-scenes documentary capturing filmmaking workflows, gear setups, and attendee discussions.',
    image_url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-video-camera-in-his-hand-42007-large.mp4'
  },
  {
    id: 3,
    title: 'A.R. Rahman Live & Celebrity Stage',
    category: 'photo',
    description: 'Close-up concert and VIP artist stage captures, tuned with filmic contrast and warm color tones.',
    image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-dj-mixer-in-a-nightclub-with-colored-lights-40897-large.mp4'
  },
  {
    id: 4,
    title: 'High-Paced Brand Promo Reels',
    category: 'edit',
    description: 'Fast cuts, beat-synchronized speed ramps, sound effects, and vibrant color grading tailored for 9:16 Instagram Reels.',
    image_url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-holding-a-camera-out-of-a-moving-car-window-34484-large.mp4'
  }
];

export default function App() {
  // 1. STATE VARIABLES
  const [projects, setProjects] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null); // For video modal
  const [loading, setLoading] = useState(true);
  const [isBackendOnline, setIsBackendOnline] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Video Editing',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { text: '', isError: false }

  // 2. USEEFFECT: Fetch projects when component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  // 3. FETCH GET: Retrieve projects from PHP MySQL API (with offline sample fallback)
  const fetchProjects = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/get_projects.php`)
      .then((res) => {
        if (!res.ok) throw new Error('Backend not reachable');
        return res.json();
      })
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          setProjects(data.data);
          setIsBackendOnline(true);
        } else {
          throw new Error('No projects found');
        }
      })
      .catch(() => {
        // Fallback to sample data so the page ALWAYS works out of the box
        setProjects(DEFAULT_PROJECTS);
        setIsBackendOnline(false);
      })
      .finally(() => setLoading(false));
  };

  // 4. FETCH POST: Submit contact inquiry to PHP MySQL API
  const handleSubmitContact = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    fetch(`${API_BASE_URL}/submit_contact.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setFeedback({ text: `✓ ${result.message}`, isError: false });
          setFormData({ name: '', email: '', service: 'Video Editing', message: '' });
        } else {
          setFeedback({ text: result.error || 'Submission failed.', isError: true });
        }
      })
      .catch(() => {
        // Demo simulation mode if PHP/MySQL server is not running yet
        setFeedback({
          text: `[Demo Mode] Thank you, ${formData.name}! Your message was simulated successfully. (Start XAMPP MySQL & PHP to save it to your real database).`,
          isError: false
        });
        setFormData({ name: '', email: '', service: 'Video Editing', message: '' });
      })
      .finally(() => setIsSubmitting(false));
  };

  // Filter projects by category
  const displayedProjects = filteredCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === filteredCategory);

  return (
    <div className="portfolio-app">
      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="logo">Lalith<span>.</span></div>
        <div className="nav-links">
          <a href="#work">Projects</a>
          <a href="#about">About</a>
          <a href="#contact" className="nav-btn">Contact</a>
        </div>
      </nav>

      {/* STATUS BADGE */}
      <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.8rem', color: '#9e9ea7' }}>
        {isBackendOnline ? (
          <span style={{ color: '#86efac' }}>● Connected to PHP & MySQL Database</span>
        ) : (
          <span>○ Running in Standalone Demo Mode (Connects to PHP & MySQL once XAMPP is started)</span>
        )}
      </div>

      {/* HERO SECTION */}
      <header className="hero">
        <p className="hero-tag">Video Editor · Photographer · Cinematographer</p>
        <h1 className="hero-title">
          I Shoot. I Edit. <span>I Tell Stories.</span>
        </h1>
        <p className="hero-desc">
          Crafting high-energy college fest aftermovies, cinematic event photography,
          and dynamic social media reels.
        </p>
        <div className="hero-actions">
          <a href="#work" className="btn btn-primary">Explore Work</a>
          <a href="#contact" className="btn btn-outline">Let's Talk</a>
        </div>
      </header>

      {/* STATUS / FEEDBACK BANNER */}
      {feedback && (
        <div className={`alert-banner ${feedback.isError ? 'alert-error' : 'alert-success'}`}>
          <span>{feedback.text}</span>
          <button onClick={() => setFeedback(null)} className="alert-close">×</button>
        </div>
      )}

      {/* PORTFOLIO SECTION */}
      <section id="work" className="section">
        <div className="section-header">
          <h2>Featured Work</h2>
          {/* Category Filter Buttons */}
          <div className="filter-buttons">
            {['all', 'photo', 'video', 'edit'].map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${filteredCategory === cat ? 'active' : ''}`}
                onClick={() => setFilteredCategory(cat)}
              >
                {cat === 'all' ? 'All Work' : cat === 'photo' ? 'Photography' : cat === 'video' ? 'Videography' : 'Reels / Edit'}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        {loading ? (
          <p className="loading-text">Loading projects...</p>
        ) : (
          <div className="projects-grid">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => setSelectedProject(project)}
              >
                <div className="card-image-wrap">
                  <img src={project.image_url} alt={project.title} />
                  <div className="play-badge">▶ Watch</div>
                </div>
                <div className="card-info">
                  <span className="card-category">{project.category.toUpperCase()}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* VIDEO LIGHTBOX MODAL */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>✕</button>
            <video
              src={selectedProject.video_url}
              controls
              autoPlay
              playsInline
              className="modal-video"
            />
            <div className="modal-details">
              <span className="card-category">{selectedProject.category.toUpperCase()}</span>
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* ABOUT ME SECTION */}
      <section id="about" className="section about-section">
        <div className="about-box">
          <h2>About Me</h2>
          <p>
            I am a student at Rajalakshmi Engineering College passionate about visual storytelling.
            From shooting live concerts for A.R. Rahman to crafting 30-second fast-paced edits for social media,
            I balance technical precision with creative flow.
          </p>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section id="contact" className="section contact-section">
        <h2>Start a Project</h2>
        <p className="section-sub">Send a message directly into our MySQL database.</p>

        <form onSubmit={handleSubmitContact} className="contact-form">
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              required
              placeholder="rahul@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Select Service</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            >
              <option value="Event Photography">Event Photography</option>
              <option value="Cinematic Videography">Cinematic Videography</option>
              <option value="Video Editing">Video Editing (Long Form)</option>
              <option value="Creative Reels">Creative Reels (Short Form)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Project Details</label>
            <textarea
              required
              rows="4"
              placeholder="Tell me about your event date, style, or vision..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="btn btn-primary submit-btn">
            {isSubmitting ? 'Saving to Database...' : 'Send Message'}
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Lalith · Built with React & Plain PHP + MySQL</p>
      </footer>
    </div>
  );
}
