import React from "react";
function Container({ children, style = {} }) {
  return <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", ...style }}>{children}</div>;
}
export default Container;
