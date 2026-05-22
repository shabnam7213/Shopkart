import React, { useState, useEffect } from "react";

function Timer({ targetHours = 23 }) {
  const getTimeLeft = () => {
    const now = new Date();
    const end = new Date();
    end.setHours(targetHours, 59, 59, 0);
    if (end <= now) end.setDate(end.getDate() + 1);
    const diff = Math.max(0, end - now);
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
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
      <div style={{ background: "#212121", color: "#fff", width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, margin: "0 auto 4px" }}>
        {String(val).padStart(2, "0")}
      </div>
      <div style={{ fontSize: 11, color: "#878787", fontWeight: 600 }}>{label}</div>
    </div>
  );

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Block val={time.days} label="Days" />
      <span style={{ fontSize: 22, fontWeight: 800, color: "#db3022", marginBottom: 14 }}>:</span>
      <Block val={time.hours} label="Hours" />
      <span style={{ fontSize: 22, fontWeight: 800, color: "#db3022", marginBottom: 14 }}>:</span>
      <Block val={time.minutes} label="Minutes" />
      <span style={{ fontSize: 22, fontWeight: 800, color: "#db3022", marginBottom: 14 }}>:</span>
      <Block val={time.seconds} label="Seconds" />
    </div>
  );
}

export default Timer;
