import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmpassword: "",
    },

    validationSchema: Yup.object({
      fname: Yup.string()
        .min(2, "Too short")
        .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
        .required("First name is required"),

      lname: Yup.string()
        .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
        .required("Last name is required"),

      email: Yup.string()
        .email("Enter valid email")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
          "Must include upper, lower, number, special char"
        )
        .required("Password is required"),

      confirmpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      setApiError("");

      try {
        const user = {
          email: values.email,
          username: `${values.fname} ${values.lname}`,
          password: values.password,
        };

        await axios.post("https://todo-backend-6dp9.onrender.com/api/user/signup", user);
        navigate("/login");
      } catch (err) {
        setApiError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  // --- CUSTOM INLINE STYLES FOR PREMIUM GLOSSY LOOK ---
  const styles = {
    background: {
      background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    },
    glassCard: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
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
    errorText: {
      color: "#ff6b6b", // A brighter red so it's readable on the dark background
      fontSize: "0.85rem",
      marginTop: "4px",
      display: "block",
    },
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center py-5"
      style={styles.background}
    >
      <div className="container">
        <div className="row justify-content-center">
          {/* Slightly wider column than Login to comfortably fit the 2-column name inputs */}
          <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            
            <div className="card text-white p-2 p-sm-4" style={styles.glassCard}>
              <div className="card-body">
                
                <div className="text-center mb-4">
                  <h2 className="fw-bolder mb-2" style={{ letterSpacing: "1px" }}>
                    Create Account
                  </h2>
                  <p className="text-white-50">Join us to start your journey</p>
                </div>

                {apiError && (
                  <div className="alert bg-danger bg-opacity-75 text-white border-0 py-2 mb-4">
                    {apiError}
                  </div>
                )}

                <form onSubmit={formik.handleSubmit}>
                  
                  {/* Name Row */}
                  <div className="row mb-3">
                    <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                      <label className="form-label text-white-50 fw-semibold small text-uppercase">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="fname"
                        placeholder="John"
                        className="form-control form-control-lg fs-6"
                        style={styles.glassInput}
                        {...formik.getFieldProps("fname")}
                      />
                      {formik.touched.fname && formik.errors.fname && (
                        <small style={styles.errorText}>{formik.errors.fname}</small>
                      )}
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="form-label text-white-50 fw-semibold small text-uppercase">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lname"
                        placeholder="Doe"
                        className="form-control form-control-lg fs-6"
                        style={styles.glassInput}
                        {...formik.getFieldProps("lname")}
                      />
                      {formik.touched.lname && formik.errors.lname && (
                        <small style={styles.errorText}>{formik.errors.lname}</small>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label text-white-50 fw-semibold small text-uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      className="form-control form-control-lg fs-6"
                      style={styles.glassInput}
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <small style={styles.errorText}>{formik.errors.email}</small>
                    )}
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label text-white-50 fw-semibold small text-uppercase">
                      Password
                    </label>
                    <div className="input-group input-group-lg">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create a strong password"
                        className="form-control fs-6 border-end-0"
                        style={styles.glassInput}
                        {...formik.getFieldProps("password")}
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
                    {formik.touched.password && formik.errors.password && (
                      <small style={styles.errorText}>{formik.errors.password}</small>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label className="form-label text-white-50 fw-semibold small text-uppercase">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmpassword"
                      placeholder="Repeat your password"
                      className="form-control form-control-lg fs-6"
                      style={styles.glassInput}
                      {...formik.getFieldProps("confirmpassword")}
                    />
                    {formik.touched.confirmpassword && formik.errors.confirmpassword && (
                      <small style={styles.errorText}>{formik.errors.confirmpassword}</small>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-lg w-100 py-3 mb-3 rounded-pill fw-bold text-uppercase"
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
                        Creating Account...
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>
                </form>

                {/* Footer */}
                <div className="text-center mt-3 pt-3 border-top border-secondary border-opacity-25">
                  <p className="text-white-50 small mb-0">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-info text-decoration-none fw-bold ms-1"
                    >
                      Login here
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

export default SignUp;