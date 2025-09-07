// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Login.css";
// import JobSeekerDashboard from "../Dashboard/JobSeekerDashboard/JobSeekerDashboard";
// const baseURL = "https://hirehub-project-1.onrender.com";

// export default function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "JobSeeker", // default role
//   });

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       // ✅ send role along with email + password
//       const res = await axios.post(`${baseURL}/auth/login`, formData, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (res.status === 200) {
//         // Save token + role in localStorage
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("role", formData.role);

//         setMessage("✅ Login successful! Redirecting...");

//         // Redirect based on role
//         setTimeout(() => {
//           if (formData.role === "Recruiter") {
//             navigate("/recruiter-dashboard");
//           } else {
//             navigate("/JobSeekerDashboard");
//           }
//         }, 1000);
//       }
//     } catch (error) {
//       console.error("Login Error:", error.response?.data || error);
//       setMessage(error.response?.data?.message || "❌ Login failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container" style={{ width: "500px" }}>
//       <h2>Login to HireHub</h2>

//       {message && <p className="login-message">{message}</p>}

//       <form onSubmit={handleSubmit} className="login-form">
//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />

//         <select name="role" value={formData.role} onChange={handleChange}>
//           <option value="JobSeeker">Job Seeker</option>
//           <option value="Recruiter">Recruiter</option>
//         </select>

//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const baseURL = "https://hirehub-project-1.onrender.com";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "JobSeeker", // default role
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // ✅ send role along with email + password
      const res = await axios.post(`${baseURL}/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });

    if (res.status === 200 && res.data.accessToken) {
  const token = res.data.accessToken;

  localStorage.setItem("token", token);
  localStorage.setItem("role", formData.role);

  console.log("✅ Token saved:", token);

  setMessage("✅ Login successful! Redirecting...");
  setTimeout(() => {
    if (formData.role === "Recruiter") {
      navigate("/RecruiterDashboard");
    } else {
      navigate("/JobSeekerDashboard");
    }
  }, 1000);
} else {
  console.log("Login response:", res.data); // debug
  setMessage("❌ No token returned from server.");
}


    } catch (error) {
      console.error("Login Error:", error.response?.data || error);
      setMessage(error.response?.data?.message || "❌ Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ width: "500px" }}>
      <h2>Login to HireHub</h2>

      {message && <p className="login-message">{message}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="JobSeeker">Job Seeker</option>
          <option value="Recruiter">Recruiter</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
