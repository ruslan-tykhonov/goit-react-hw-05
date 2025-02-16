import clsx from "clsx";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const activeClass = ({ isActive }) => {
  return clsx(css.headerLink, isActive && css.headerLinkActive);
};

export default function Navigation() {
  return (
    <div>
      <nav>
        <NavLink to="/" className={activeClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={activeClass}>
          Movies
        </NavLink>
      </nav>
    </div>
  );
}
