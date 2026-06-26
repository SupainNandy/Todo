import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://todo-backend-6dp9.onrender.com/api/user/signin",
        user
      );

      localStorage.setItem("token", response.data.token);

      alert("Login Successful");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // --- CUSTOM INLINE STYLES FOR PREMIUM GLOSSY LOOK ---
  const styles = {
    background: {
      // A rich, deep animated-style gradient background
      background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    },
    glassCard: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)", // For Safari support
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      borderRadius: "24px",
    },
    glassInput: {
      background: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      color: "#ffffff",
      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
    },
    gradientBtn: {
      background: "linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)",
      border: "none",
      color: "white",
      boxShadow: "0 4px 15px rgba(0, 114, 255, 0.4)",
    },
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center py-5"
      style={styles.background}
    >
      <div className="container">
        <div className="row justify-content-center">
          {/* Responsive grid sizing */}
          <div className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">
            
            {/* The Glossy Glassmorphism Card */}
            <div className="card text-white p-2 p-sm-4" style={styles.glassCard}>
              <div className="card-body">
                
                <div className="text-center mb-5">
                  <h2 className="fw-bolder mb-2" style={{ letterSpacing: "1px" }}>
                    Welcome Back
                  </h2>
                  <p className="text-white-50">Sign in to continue your journey</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label text-white-50 fw-semibold small text-uppercase" style={{ letterSpacing: "1px" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg fs-6"
                      placeholder="name@example.com"
                      value={user.email}
                      onChange={handleChange}
                      style={styles.glassInput}
                      required
                    />
                  </div>

                  <div className="mb-5">
                    <label className="form-label text-white-50 fw-semibold small text-uppercase" style={{ letterSpacing: "1px" }}>
                      Password
                    </label>
                    <div className="input-group input-group-lg">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="form-control fs-6 border-end-0"
                        placeholder="Enter password"
                        value={user.password}
                        onChange={handleChange}
                        style={styles.glassInput}
                        required
                      />
                      <button
                        type="button"
                        className="btn px-3 d-flex align-items-center"
                        style={{
                          ...styles.glassInput,
                          borderLeft: "none",
                          color: "#a8b2d1",
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <span className="small fw-medium">
                          {showPassword ? "Hide" : "Show"}
                        </span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-lg w-100 py-3 mb-4 rounded-pill fw-bold text-uppercase"
                    style={styles.gradientBtn}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Authenticating...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <div className="text-center mt-3 pt-3 border-top border-secondary border-opacity-25">
                  <p className="text-white-50 small mb-0">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-info text-decoration-none fw-bold ms-1">
                      Register here
                    </Link>
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;