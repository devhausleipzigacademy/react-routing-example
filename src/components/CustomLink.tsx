import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";

const CustomLink = ({ to, children }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link className={`${match ? "underline" : ""}`} to={to}>
      {children}
    </Link>
  );
};

export default CustomLink;
