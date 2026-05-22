import React from "react";
function OverText({ children, style = {} }) {
  return <div style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", ...style }}>{children}</div>;
}
export default OverText;
