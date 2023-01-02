import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const ActiveLink = ({ children, to, ...props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  const style = {
    textDecoration: "none",
    paddingBottom: "6px",
    color: match ? "#ff9900" : "White",
    borderBottom: match && "3px solid #ff9900",
    fontWeight: match && 900,
  };

  return (
    <div>
      <Link style={style} to={to} {...props}>
        {children}
      </Link>
    </div>
  );
};

export default ActiveLink;
