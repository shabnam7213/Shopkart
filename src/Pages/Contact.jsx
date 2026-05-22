import React, { useState } from "react";
import { toast } from "react-toastify";
import BreadCrumb from "../Component/BreadCrumb";
import AllSectionHeadding from "../Component/AllSectionHeadding";

const FAQS = [
  { q: "How do I track my order?", a: "Go to My Account → Orders section after logging in. You'll see real-time status updates for every order." },
  { q: "What is the return policy?", a: "We offer a 10-day easy return policy. Initiate a return from the My Orders section within 10 days of delivery." },
  { q: "How do I apply a coupon?", a: "In the Cart page, find the 'Enter Coupon Code' field. Type your code and click Apply. Try SAVE20 or FIRST for discounts!" },
  { q: "Is Cash on Delivery available?", a: "Yes! COD is available for most pin codes across India. Select it during checkout under Payment Method." },
  { q: "How long does delivery take?", a: "Standard delivery: 3–7 business days. Express delivery (1–2 days) is available for select pin codes at extra cost." },
  { q: "Can I change or cancel my order?", a: "Orders can be cancelled within 1 hour of placement. For changes, contact our support team as soon as possible." },
];

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [openFaq, setOpenFaq] = useState(null);
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSending(true);
    setTimeout(() => {
      toast.success(`Message sent! We'll reply to ${form.email} within 24 hours. 📧`);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setSending(false);
    }, 1000);
  };

  return (
    <div>
      <BreadCrumb />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 40px" }}>
        {/* Hero banner */}
        <div style={{ background: "linear-gradient(135deg,#212121 0%,#db3022 100%)", borderRadius: 10, padding: "40px 40px", color: "#fff", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🎧 Customer Support</h1>
            <p style={{ fontSize: 14, opacity: 0.85 }}>We're here to help you 24/7. Reach out anytime!</p>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[["📞", "1800-XXX-XXXX", "Toll Free"], ["📧", "support@exclusive.in", "Email Us"], ["🕐", "Mon–Sat 9AM–6PM", "Working Hours"]].map(([icon, val, label]) => (
              <div key={label} style={{ textAlign: "center", background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "12px 18px", backdropFilter: "blur(4px)" }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{val}</div>
                <div style={{ fontSize: 11, opacity: 0.7 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Contact Form */}
          <div style={{ background: "#fff", borderRadius: 8, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <AllSectionHeadding tag="Get In Touch" title="Send Us a Message" />
            <form onSubmit={handleSubmit}>
              {[
                ["name", "Your Name *", "text", "Enter your full name"],
                ["email", "Email Address *", "email", "Enter your email"],
                ["phone", "Phone Number", "tel", "Enter your phone number"],
                ["subject", "Subject", "text", "What is this about?"],
              ].map(([key, label, type, ph]) => (
                <div key={key} style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 5, color: "#555" }}>{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => { setForm({ ...form, [key]: e.target.value }); if (errors[key]) setErrors({ ...errors, [key]: "" }); }}
                    placeholder={ph}
                    style={{ width: "100%", padding: "10px 14px", border: `1px solid ${errors[key] ? "#db3022" : "#e0e0e0"}`, borderRadius: 4, fontSize: 13, fontFamily: "Poppins", outline: "none", transition: "border 0.2s" }}
                    onFocus={(e) => (e.target.style.borderColor = "#212121")}
                    onBlur={(e) => (e.target.style.borderColor = errors[key] ? "#db3022" : "#e0e0e0")}
                  />
                  {errors[key] && <div style={{ color: "#db3022", fontSize: 12, marginTop: 3 }}>{errors[key]}</div>}
                </div>
              ))}

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 5, color: "#555" }}>Message *</label>
                <textarea
                  value={form.message}
                  onChange={(e) => { setForm({ ...form, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: "" }); }}
                  placeholder="Describe your issue or question in detail..."
                  rows={5}
                  style={{ width: "100%", padding: "10px 14px", border: `1px solid ${errors.message ? "#db3022" : "#e0e0e0"}`, borderRadius: 4, fontSize: 13, fontFamily: "Poppins", outline: "none", resize: "vertical", transition: "border 0.2s" }}
                  onFocus={(e) => (e.target.style.borderColor = "#212121")}
                  onBlur={(e) => (e.target.style.borderColor = errors.message ? "#db3022" : "#e0e0e0")}
                />
                {errors.message && <div style={{ color: "#db3022", fontSize: 12, marginTop: 3 }}>{errors.message}</div>}
              </div>

              <button
                type="submit"
                disabled={sending}
                style={{ background: sending ? "#ccc" : "#db3022", color: "#fff", border: "none", padding: "13px 32px", borderRadius: 4, fontSize: 14, fontWeight: 700, cursor: sending ? "not-allowed" : "pointer", fontFamily: "Poppins", transition: "all 0.2s" }}
                onMouseEnter={(e) => { if (!sending) e.currentTarget.style.background = "#b71c1c"; }}
                onMouseLeave={(e) => { if (!sending) e.currentTarget.style.background = "#db3022"; }}
              >
                {sending ? "Sending..." : "📤 Send Message"}
              </button>
            </form>
          </div>

          {/* FAQ */}
          <div style={{ background: "#fff", borderRadius: 8, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <AllSectionHeadding tag="FAQ" title="Frequently Asked Questions" />
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{ border: "1px solid #f0f0f0", borderRadius: 8, marginBottom: 10, overflow: "hidden", transition: "all 0.2s" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", padding: "14px 16px", background: openFaq === i ? "#fff5f5" : "#fff", border: "none", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Poppins", fontWeight: 600, fontSize: 14, color: openFaq === i ? "#db3022" : "#212121", transition: "all 0.2s" }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: 18, transform: openFaq === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s", color: "#db3022", flexShrink: 0, marginLeft: 8 }}>▼</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 16px 16px", fontSize: 13, color: "#878787", lineHeight: 1.7, borderTop: "1px solid #f5f5f5", paddingTop: 12 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}

            {/* Quick contact info */}
            <div style={{ marginTop: 20, background: "#f8f8f8", borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📍 Find Us</div>
              <div style={{ fontSize: 13, color: "#878787", lineHeight: 2 }}>
                <div>📧 support@exclusive.in</div>
                <div>📞 1800-XXX-XXXX (Toll Free)</div>
                <div>🕐 Monday – Saturday: 9 AM – 6 PM</div>
                <div>📍 Mumbai, Maharashtra, India</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
