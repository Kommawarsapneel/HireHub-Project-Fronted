import { useState, useEffect } from "react";
import axios from "axios";
import "./JobSeekerDashboard.css";

const baseURL = "https://hirehub-project-1.onrender.com";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("❌ No token found. Please login first.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${baseURL}/jobseeker/my-applications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching applications:", err.response?.data || err.message);
        setError("❌ Failed to load applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="jobseeker-dashboard">
      <h1 className="dashboard-title">📋 My Applications</h1>

      {loading && <p className="loading">⏳ Loading applications...</p>}
      {error && <p className="error">{error}</p>}

      <div className="job-list">
        {applications.length > 0 ? (
          applications.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-header">
                <h2>{job.Job_role}</h2>
                <span className="company">{job.Company_Name}</span>
              </div>
              <p className="job-desc">{job.Job_description}</p>
              <p className="location">📍 {job.Location || "Not specified"}</p>
              <span className="applied-status">✅ Applied</span>
            </div>
          ))
        ) : (
          !loading && <p className="no-jobs">⚠️ You haven’t applied to any jobs yet.</p>
        )}
      </div>
    </div>
  );
}
