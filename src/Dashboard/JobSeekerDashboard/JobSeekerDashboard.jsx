











// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./JobSeekerDashboard.css";

// const baseURL = "https://hirehub-project-1.onrender.com";

// export default function JobSeekerDashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [filters, setFilters] = useState({ role: "", company: "", location: "" });
//   const [appliedJobs, setAppliedJobs] = useState([]); // ✅ Track applied jobs

//   useEffect(() => {
//     const fetchJobs = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setError("❌ No token found. Please login first.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get(`${baseURL}/jobseeker/jobs`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setJobs(res.data);
//         setFilteredJobs(res.data);
//       } catch (err) {
//         console.error("Error fetching jobs:", err.response?.data || err.message);
//         setError("❌ Failed to load jobs. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // 🔍 Filter + Search handler
//   useEffect(() => {
//     let result = jobs;

//     if (search) {
//       result = result.filter((job) =>
//         job.Job_role.toLowerCase().includes(search.toLowerCase()) ||
//         job.Company_Name.toLowerCase().includes(search.toLowerCase()) ||
//         job.Location?.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (filters.role) {
//       result = result.filter((job) =>
//         job.Job_role.toLowerCase().includes(filters.role.toLowerCase())
//       );
//     }

//     if (filters.company) {
//       result = result.filter((job) =>
//         job.Company_Name.toLowerCase().includes(filters.company.toLowerCase())
//       );
//     }

//     if (filters.location) {
//       result = result.filter((job) =>
//         job.Location?.toLowerCase().includes(filters.location.toLowerCase())
//       );
//     }

//     setFilteredJobs(result);
//   }, [search, filters, jobs]);

//   // ✅ Apply to Job function
//   const handleApply = async (jobId, jobRole) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("❌ Please login first to apply.");
//       return;
//     }

//     try {
//       await axios.post(
//         `${baseURL}/jobseeker/jobs/${jobId}/apply`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert(`✅ Successfully applied to ${jobRole}`);
//       setAppliedJobs((prev) => [...prev, jobId]); // ✅ Mark job as applied
//     } catch (err) {
//       console.error("Error applying for job:", err.response?.data || err.message);
//       alert("❌ Failed to apply. Please try again.");
//     }
//   };

//   return (
//     <div className="jobseeker-dashboard">
//       <h1 className="dashboard-title">🚀 Available Jobs</h1>

//       {/* 🔍 Search & Filters */}
//       <div className="filters">
//         <input
//           type="text"
//           placeholder="🔍 Search jobs, companies, or locations..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <input
//           type="text"
//           placeholder="Filter by Role"
//           value={filters.role}
//           onChange={(e) => setFilters({ ...filters, role: e.target.value })}
//         />

//         <input
//           type="text"
//           placeholder="Filter by Company"
//           value={filters.company}
//           onChange={(e) => setFilters({ ...filters, company: e.target.value })}
//         />

//         <input
//           type="text"
//           placeholder="Filter by Location"
//           value={filters.location}
//           onChange={(e) => setFilters({ ...filters, location: e.target.value })}
//         />
//       </div>

//       {loading && <p className="loading">⏳ Loading jobs...</p>}
//       {error && <p className="error">{error}</p>}

//       <div className="job-list">
//         {filteredJobs.length > 0 ? (
//           filteredJobs.map((job) => (
//             <div key={job._id} className="job-card">
//               <div className="job-header">
//                 <h2>{job.Job_role}</h2>
//                 <span className="company">{job.Company_Name}</span>
//               </div>
//               <p className="job-desc">{job.Job_description}</p>
//               <p className="location">📍 {job.Location || "Not specified"}</p>

//               {/* ✅ Disable button if already applied */}
//               <button
//                 className="apply-btn"
//                 onClick={() => handleApply(job._id, job.Job_role)}
//                 disabled={appliedJobs.includes(job._id)}
//               >
//                 {appliedJobs.includes(job._id) ? "✅ Applied" : "Apply Now"}
//               </button>
//             </div>
//           ))
//         ) : (
//           !loading && <p className="no-jobs">⚠️ No jobs match your filters.</p>
//         )}
//       </div>
//     </div>
//   );
// }
// ---------------------------------------------------------------------------------------------
// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./JobSeekerDashboard.css";

// const baseURL = "https://hirehub-project-1.onrender.com";

// export default function JobSeekerDashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [appliedJobs, setAppliedJobs] = useState([]); // ✅ Track applied jobs locally
//   const [myApplications, setMyApplications] = useState([]); // ✅ Store applications from API
//   const [showApplications, setShowApplications] = useState(false); // ✅ Toggle view
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [filters, setFilters] = useState({ role: "", company: "", location: "" });

//   useEffect(() => {
//     const fetchJobs = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setError("❌ No token found. Please login first.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get(`${baseURL}/jobseeker/jobs`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setJobs(res.data);
//         setFilteredJobs(res.data);
//       } catch (err) {
//         console.error("Error fetching jobs:", err.response?.data || err.message);
//         setError("❌ Failed to load jobs. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // 🔍 Filter + Search handler
//   useEffect(() => {
//     let result = jobs;

//     if (search) {
//       result = result.filter((job) =>
//         job.Job_role.toLowerCase().includes(search.toLowerCase()) ||
//         job.Company_Name.toLowerCase().includes(search.toLowerCase()) ||
//         job.Location?.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (filters.role) {
//       result = result.filter((job) =>
//         job.Job_role.toLowerCase().includes(filters.role.toLowerCase())
//       );
//     }

//     if (filters.company) {
//       result = result.filter((job) =>
//         job.Company_Name.toLowerCase().includes(filters.company.toLowerCase())
//       );
//     }

//     if (filters.location) {
//       result = result.filter((job) =>
//         job.Location?.toLowerCase().includes(filters.location.toLowerCase())
//       );
//     }

//     setFilteredJobs(result);
//   }, [search, filters, jobs]);

//   // ✅ Apply to Job function
//   const handleApply = async (jobId, jobRole) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("❌ Please login first to apply.");
//       return;
//     }

//     try {
//       await axios.post(
//         `${baseURL}/jobseeker/jobs/${jobId}/apply`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert(`✅ Successfully applied to ${jobRole}`);
//       setAppliedJobs((prev) => [...prev, jobId]); // ✅ Mark job as applied
//     } catch (err) {
//       console.error("Error applying for job:", err.response?.data || err.message);
//       alert("❌ Failed to apply. Please try again.");
//     }
//   };

//   // ✅ Fetch My Applications
//   const fetchMyApplications = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("❌ Please login first.");
//       return;
//     }

//     try {
//       const res = await axios.get(`${baseURL}/jobseeker/my-applications`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMyApplications(res.data);
//       setShowApplications(true); // ✅ Switch view
//     } catch (err) {
//       console.error("Error fetching applications:", err.response?.data || err.message);
//       alert("❌ Failed to load applications.");
//     }
//   };

//   return (
//     <div className="jobseeker-dashboard">
//       <h1 className="dashboard-title">
//         {showApplications ? "📋 My Applications" : "🚀 Available Jobs"}
//       </h1>

//       {/* 🔘 Button to toggle applications */}
//       <button className="my-applications-btn" onClick={fetchMyApplications}>
//         📋 My Applications
//       </button>
//       <button className="my-applications-btn" onClick={() => setShowApplications(false)}>
//         🔙 Back to Jobs
//       </button>

//       {loading && <p className="loading">⏳ Loading...</p>}
//       {error && <p className="error">{error}</p>}

//       <div className="job-list">
//         {/* ✅ Show My Applications */}
//         {showApplications ? (
//           myApplications.length > 0 ? (
//             myApplications.map((job) => (
//               <div key={job._id} className="job-card">
//                 <div className="job-header">
//                   <h2>{job.Job_role}</h2>
//                   <span className="company">{job.Company_Name}</span>
//                 </div>
//                 <p className="job-desc">{job.Job_description}</p>
//                 <p className="location">📍 {job.Location || "Not specified"}</p>
//                 <span className="applied-status">✅ Applied</span>
//               </div>
//             ))
//           ) : (
//             <p className="no-jobs">⚠️ You haven’t applied to any jobs yet.</p>
//           )
//         ) : (
//           /* ✅ Show Available Jobs */
//           filteredJobs.length > 0 ? (
//             filteredJobs.map((job) => (
//               <div key={job._id} className="job-card">
//                 <div className="job-header">
//                   <h2>{job.Job_role}</h2>
//                   <span className="company">{job.Company_Name}</span>
//                 </div>
//                 <p className="job-desc">{job.Job_description}</p>
//                 <p className="location">📍 {job.Location || "Not specified"}</p>

//                 {/* ✅ Disable button if already applied */}
//                 <button
//                   className="apply-btn"
//                   onClick={() => handleApply(job._id, job.Job_role)}
//                   disabled={appliedJobs.includes(job._id)}
//                 >
//                   {appliedJobs.includes(job._id) ? "✅ Applied" : "Apply Now"}
//                 </button>
//               </div>
//             ))
//           ) : (
//             !loading && <p className="no-jobs">⚠️ No jobs match your filters.</p>
//           )
//         )}
//       </div>
//     </div>
//   );
// }






import { useState, useEffect } from "react";
import axios from "axios";
import "./JobSeekerDashboard.css";

const baseURL = "https://hirehub-project-1.onrender.com";

export default function JobSeekerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]); 
  const [myApplications, setMyApplications] = useState([]); 
  const [activeTab, setActiveTab] = useState("jobs"); // ✅ "jobs" | "applications"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ role: "", company: "", location: "" });

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("❌ No token found. Please login first.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${baseURL}/jobseeker/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
        setFilteredJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err.response?.data || err.message);
        setError("❌ Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
// ✅ Fetch already applied jobs on component mount
useEffect(() => {
  const fetchAppliedJobs = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(`${baseURL}/jobseeker/my-applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // store jobIds of applied jobs
      const appliedJobIds = res.data.map((app) => app.jobId._id);
      setAppliedJobs(appliedJobIds);
    } catch (err) {
      console.error("Error fetching applied jobs:", err.response?.data || err.message);
    }
  };

  fetchAppliedJobs();
}, []);

  // 🔍 Filter + Search handler
  useEffect(() => {
    let result = jobs;

    if (search) {
      result = result.filter((job) =>
        job.Job_role.toLowerCase().includes(search.toLowerCase()) ||
        job.Company_Name.toLowerCase().includes(search.toLowerCase()) ||
        job.Location?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters.role) {
      result = result.filter((job) =>
        job.Job_role.toLowerCase().includes(filters.role.toLowerCase())
      );
    }

    if (filters.company) {
      result = result.filter((job) =>
        job.Company_Name.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    if (filters.location) {
      result = result.filter((job) =>
        job.Location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredJobs(result);
  }, [search, filters, jobs]);

  // ✅ Apply to Job
  const handleApply = async (jobId, jobRole) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ Please login first to apply.");
      return;
    }

    try {
      await axios.post(
        `${baseURL}/jobseeker/jobs/${jobId}/apply`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`✅ Successfully applied to ${jobRole}`);
      setAppliedJobs((prev) => [...prev, jobId]);
    } catch (err) {
      console.error("Error applying for job:", err.response?.data || err.message);
      alert("❌ Failed to apply. Please try again.");
    }
  };

  // ✅ Fetch My Applications
  const fetchMyApplications = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ Please login first.");
      return;
    }

    try {
      const res = await axios.get(`${baseURL}/jobseeker/my-applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err.response?.data || err.message);
      alert("❌ Failed to load applications.");
    }
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "applications") {
      fetchMyApplications();
    }
  };

  return (
    <div className="jobseeker-dashboard">
      <h1 className="dashboard-title">💼 Job Seeker Dashboard</h1>

      {/* 🔘 Tabs */}
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "jobs" ? "active" : ""}`}
          onClick={() => handleTabChange("jobs")}
        >
          🚀 Available Jobs
        </button>
        <button
          className={`tab-btn ${activeTab === "applications" ? "active" : ""}`}
          onClick={() => handleTabChange("applications")}
        >
          📋 My Applications
        </button>
      </div>

      {loading && <p className="loading">⏳ Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="job-list">
        {activeTab === "applications" ? (
          myApplications.length > 0 ? (
            myApplications.map((app) => (
              <div key={app._id} className="job-card">
                <div className="job-header">
                  <h2>{app.jobId?.Job_role}</h2>
                  <span className="company">{app.jobId?.Company_Name}</span>
                </div>
                <p className="job-desc">{app.jobId?.Job_description}</p>
                <p className="location">📍 {app.jobId?.Location || "Not specified"}</p>
                <p className="applied-date">
                  🗓 Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                </p>
                <span className="applied-status">✅ Applied</span>
              </div>
            ))
          ) : (
            <p className="no-jobs">⚠️ You haven’t applied to any jobs yet.</p>
          )
        ) : (
          filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job._id} className="job-card">
                <div className="job-header">
                  <h2>{job.Job_role}</h2>
                  <span className="company">{job.Company_Name}</span>
                </div>
                <p className="job-desc">{job.Job_description}</p>
                <p className="location">📍 {job.Location || "Not specified"}</p>

               <button
  className="apply-btn"
  onClick={() => handleApply(job._id, job.Job_role)}
  disabled={appliedJobs.includes(job._id)}
>
  {appliedJobs.includes(job._id) ? "✅ Applied" : "Apply Now"}
</button>

              </div>
            ))
          ) : (
            !loading && <p className="no-jobs">⚠️ No jobs match your filters.</p>
          )
        )}
      </div>
    </div>
  );
}

