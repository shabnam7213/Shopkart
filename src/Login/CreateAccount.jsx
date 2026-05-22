import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUser } from "../Slice/ProductSlice";
import { toast } from "react-toastify";

function CreateAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  if (user) { navigate("/"); return null; }

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      dispatch(setUser({ email: form.email, name: form.name }));
      toast.success(`Welcome, ${form.name}! Account created 🎉`);
      navigate("/");
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: "flex", gap: 0, borderRadius: 10, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ flex: 1, background: "linear-gradient(135deg,#212121 0%,#db3022 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 48 }} className="hidden-mobile">
          <div style={{ textAlign: "center", color: "#fff" }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>✨</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Join Exclusive</h2>
            <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.7 }}>Create an account and get<br />10% off your first order!</p>
          </div>
        </div>

        <div style={{ flex: 1, background: "#fff", padding: "48px 40px" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Create an account</h2>
          <p style={{ fontSize: 14, color: "#878787", marginBottom: 32 }}>Enter your details below</p>

          <form onSubmit={handleSubmit}>
            {[["name", "Name", "text", "Enter your name"], ["email", "Email", "email", "Enter your email"], ["password", "Password", showPass ? "text" : "password", "Create a password"]].map(([key, label, type, ph]) => (
              <div key={key} style={{ marginBottom: 20 }}>
                <div style={{ position: "relative" }}>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => { setForm({ ...form, [key]: e.target.value }); if (errors[key]) setErrors({ ...errors, [key]: "" }); }}
                    placeholder={ph}
                    style={{ width: "100%", padding: "12px 0", border: "none", borderBottom: `2px solid ${errors[key] ? "#db3022" : "#e0e0e0"}`, fontSize: 14, fontFamily: "Poppins", outline: "none", background: "transparent" }}
                    onFocus={(e) => (e.target.style.borderBottomColor = "#212121")}
                    onBlur={(e) => (e.target.style.borderBottomColor = errors[key] ? "#db3022" : "#e0e0e0")}
                  />
                  {key === "password" && (
                    <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#878787" }}>
                      {showPass ? "🙈" : "👁"}
                    </button>
                  )}
                </div>
                {errors[key] && <div style={{ color: "#db3022", fontSize: 12, marginTop: 4 }}>{errors[key]}</div>}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", background: loading ? "#ccc" : "#db3022", color: "#fff", border: "none", padding: 14, borderRadius: 4, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "Poppins", marginTop: 8 }}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "#878787" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#212121", fontWeight: 600, textDecoration: "underline" }}>Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
