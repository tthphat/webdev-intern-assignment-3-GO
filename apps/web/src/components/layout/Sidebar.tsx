import { NavLink } from "react-router-dom";
import { routes } from "../../routes/routes";

export function Sidebar() {
  return (
    <nav className="flex flex-col gap-1">
      <h2 className="text-xl font-bold mb-6 px-4 text-white tracking-wide">
        Score Analytics
      </h2>
      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={({ isActive }) =>
            `px-4 py-2.5 rounded transition-all text-sm font-medium ${
              isActive
                ? "bg-blue-800 text-yellow-400 border-l-4 border-yellow-400 rounded-l-none"
                : "text-blue-100 hover:bg-blue-900 hover:text-white"
            }`
          }
        >
          {route.label}
        </NavLink>
      ))}
    </nav>
  );
}
