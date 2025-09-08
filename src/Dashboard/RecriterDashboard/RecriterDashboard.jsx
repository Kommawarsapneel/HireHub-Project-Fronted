
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import "./RecruiterDashboard.css";

const baseURL = "https://hirehub-project-1.onrender.com";

export default function RecruiterDashboard() {
  const [formData, setFormData] = useState({
    Company_Name: "",
    Job_role: "",
    Job_description: "",
    Location: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // ✅ navigation hook

  // ✅ Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    alert("✅ Your account is logged out");
    navigate("/"); // redirect to homepage
  };

  // ✅ Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Post a new job
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${baseURL}/recruiter/create`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 201) {
        setMessage("✅ Job posted successfully!");
        setFormData({
          Company_Name: "",
          Job_role: "",
          Job_description: "",
          Location: "",
        });

        // Refresh applications after posting job
        fetchApplications();
      }
    } catch (error) {
      console.error("Error posting job:", error.response?.data || error);
      setMessage(error.response?.data?.message || "❌ Failed to post job.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch applications for recruiter’s jobs
 const fetchApplications = async () => {
  try {
    const res = await axios.get(`${baseURL}/recruiter/my-jobs/applications`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("🔎 Applications API response:", res.data);

    setApplications(res.data || []);
  } catch (error) {
    if (error.response?.status === 404) {
      console.warn("No jobs or applications yet:", error.response.data?.message);
      setApplications([]);
    } else {
      console.error("❌ Error fetching applications:", error.response?.data || error);
      setApplications([]);
    }
  }
};


  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="recruiter-dashboard">
      {/* 🔘 Logout Button */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">📢 Recruiter Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {/* ✅ Post Job Section */}
      <div className="post-job-section">
        <h2>Post a New Job</h2>
        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit} className="job-form">
          <input
            type="text"
            name="Company_Name"
            placeholder="Company Name"
            value={formData.Company_Name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="Job_role"
            placeholder="Job Role"
            value={formData.Job_role}
            onChange={handleChange}
            required
          />
          <textarea
            name="Job_description"
            placeholder="Job Description"
            value={formData.Job_description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="Location"
            placeholder="Location"
            value={formData.Location}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>

      {/* ✅ Applications Section */}
      <div className="applications-section">
        <h2>📄 Applications for My Jobs</h2>

        {applications.length > 0 ? (
          applications.map((app) => (
            <div key={app._id} className="application-card">
              <h3>
                {app.jobId?.Job_role} @ {app.jobId?.Company_Name}
              </h3>
              <p>
                <strong>Applicant:</strong> {app.userId?.name} (
                {app.userId?.email})
              </p>
              <p>
                <strong>Skills:</strong> {app.userId?.skills || "Not specified"}
              </p>
              <p>
                <strong>Resume:</strong>{" "}
                {app.resumeUrl ? (
                  <a href={app.resumeUrl} target="_blank" rel="noreferrer">
                    View Resume
                  </a>
                ) : (
                  "No resume uploaded"
                )}
              </p>
            </div>
          ))
        ) : (
          <p>No applications yet.</p>
        )}
      </div>
    </div>
  );
}
