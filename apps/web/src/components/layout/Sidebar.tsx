import { NavLink } from "react-router-dom";
import { routes } from "../../routes/routes";

export function Sidebar() {
  return (
    <nav className="flex flex-col gap-2">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={({ isActive }) =>
            `px-4 py-2 rounded transition-colors ${
              isActive ? "bg-slate-700" : "hover:bg-slate-700"
            }`
          }
        >
          {route.label}
        </NavLink>
      ))}
    </nav>
  );
}
