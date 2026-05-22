import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    bg: "#000",
    tag: "iPhone 14 Series",
    title: "Up to 10%\noff Voucher",
    cta: "Shop Now",
    ctaPath: "/category/Electronics",
    image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=500&h=400&fit=crop",
    textColor: "#fff",
  },
  {
    bg: "linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)",
    tag: "PlayStation 5",
    title: "Level Up\nYour Gaming",
    cta: "Explore Now",
    ctaPath: "/category/Electronics",
    image: "https://images.unsplash.com/photo-1607853202273-232359ecbde9?w=500&h=400&fit=crop",
    textColor: "#fff",
  },
  {
    bg: "linear-gradient(135deg,#2d1b69 0%,#11998e 100%)",
    tag: "Women's Collections",
    title: "Featured Styles\nGive You a Vibe",
    cta: "Shop Now",
    ctaPath: "/category/Woman's Fashion",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&h=400&fit=crop",
    textColor: "#fff",
  },
  {
    bg: "#111",
    tag: "Speakers",
    title: "Enhance Your\nMusic Experience",
    cta: "Shop Now",
    ctaPath: "/category/Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=400&fit=crop",
    textColor: "#fff",
  },
  {
    bg: "linear-gradient(135deg,#f7971e 0%,#ffd200 100%)",
    tag: "Big Billion Days",
    title: "Biggest Sale\nIs Now LIVE",
    cta: "View All Deals",
    ctaPath: "/shop",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=400&fit=crop",
    textColor: "#212121",
  },
];

function Banner() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % SLIDES.length), []);
  const prev = () => setCurrent((p) => (p + SLIDES.length - 1) % SLIDES.length);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 20px" }}>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 8,
          minHeight: 340,
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* Slides */}
        {SLIDES.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              background: s.bg,
              opacity: i === current ? 1 : 0,
              transition: "opacity 0.7s ease",
              zIndex: i === current ? 1 : 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "40px 48px 40px 56px",
              color: s.textColor,
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background:
                      s.textColor === "#fff" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.4)",
                  }}
                />
                <span style={{ fontSize: 14, opacity: 0.85 }}>{s.tag}</span>
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  lineHeight: 1.2,
                  marginBottom: 20,
                  whiteSpace: "pre-line",
                }}
              >
                {s.title}
              </div>
              <Link
                to={s.ctaPath}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: s.textColor,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  borderBottom: `1px solid ${s.textColor}`,
                  paddingBottom: 2,
                }}
              >
                {s.cta} <span>→</span>
              </Link>
            </div>
            <div
              style={{
                width: 320,
                height: 260,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={s.image}
                alt={s.tag}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
                  transition: "transform 0.5s ease",
                  transform: i === current ? "scale(1)" : "scale(0.95)",
                }}
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          </div>
        ))}

        {/* Prev Arrow */}
        <button
          onClick={prev}
          style={{
            position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.2)", border: "none", width: 36, height: 36,
            borderRadius: "50%", color: "#fff", fontSize: 20, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(4px)", zIndex: 10, transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.4)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
        >
          ‹
        </button>

        {/* Next Arrow */}
        <button
          onClick={next}
          style={{
            position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.2)", border: "none", width: 36, height: 36,
            borderRadius: "50%", color: "#fff", fontSize: 20, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(4px)", zIndex: 10, transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.4)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
        >
          ›
        </button>

        {/* Dots */}
        <div
          style={{
            position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: 6, zIndex: 10,
          }}
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 20 : 8, height: 8, borderRadius: 4,
                border: "none", background: i === current ? "#db3022" : "rgba(255,255,255,0.5)",
                cursor: "pointer", transition: "all 0.3s", padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner;