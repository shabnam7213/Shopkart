import React from "react";

function Button({ children, variant = "primary", onClick, style = {}, type = "button" }) {
  const styles = {
    primary: { background: "#db3022", color: "#fff", border: "none" },
    secondary: { background: "transparent", color: "#212121", border: "1px solid #212121" },
    outline: { background: "transparent", color: "#db3022", border: "1px solid #db3022" },
    blue: { background: "#2874f0", color: "#fff", border: "none" },
    orange: { background: "#ff6900", color: "#fff", border: "none" },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className="btn-ripple"
      style={{
        padding: "12px 40px",
        borderRadius: 4,
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "Poppins",
        transition: "all 0.2s",
        ...(styles[variant] || styles.primary),
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {children}
    </button>
  );
}

export default Button;
