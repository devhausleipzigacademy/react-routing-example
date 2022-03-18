import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";

const CustomLink = ({ to, children }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link className={`${match ? "underline" : "text-slate-400"}`} to={to}>
      {children}
    </Link>
  );
};

export default CustomLink;
