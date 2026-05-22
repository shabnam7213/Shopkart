import React, { useState, useEffect } from "react";

function MusicTimer() {
  const getTimeLeft = () => {
    const now = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 5);
    end.setHours(23, 59, 59, 0);
    const diff = Math.max(0, end - now);
    return {
      hours: Math.floor(diff / 3600000),
      days: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };

  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const Block = ({ val, label }) => (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: 52, height: 52, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "#fff", margin: "0 auto 6px", background: "rgba(255,255,255,0.1)" }}>
        {String(val).padStart(2, "0")}
      </div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{label}</div>
    </div>
  );

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Block val={time.hours} label="Hours" />
      <span style={{ fontSize: 20, fontWeight: 800, color: "rgba(255,255,255,0.6)", marginBottom: 18 }}>:</span>
      <Block val={time.days} label="Days" />
      <span style={{ fontSize: 20, fontWeight: 800, color: "rgba(255,255,255,0.6)", marginBottom: 18 }}>:</span>
      <Block val={time.minutes} label="Minutes" />
      <span style={{ fontSize: 20, fontWeight: 800, color: "rgba(255,255,255,0.6)", marginBottom: 18 }}>:</span>
      <Block val={time.seconds} label="Seconds" />
    </div>
  );
}

export default MusicTimer;
