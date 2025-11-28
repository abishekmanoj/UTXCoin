import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LEFT — Logo */}
        <Link to="/" className="text-3xl font-bold text-blue-400">
          UTXCoin
        </Link>

        {/* RIGHT — Menu */}
        <div className="flex gap-6">
          <NavLink 
            to="/" 
            className={({ isActive }) =>
              `hover:text-blue-400 ${isActive ? "text-blue-400 font-semibold" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink 
            to="/blocks" 
            className={({ isActive }) =>
              `hover:text-blue-400 ${isActive ? "text-blue-400 font-semibold" : ""}`
            }
          >
            Blockchain
          </NavLink>

          <NavLink 
            to="/pool" 
            className={({ isActive }) =>
              `hover:text-blue-400 ${isActive ? "text-blue-400 font-semibold" : ""}`
            }
          >
            Pool
          </NavLink>

          <NavLink 
            to="/wallet" 
            className={({ isActive }) =>
              `hover:text-blue-400 ${isActive ? "text-blue-400 font-semibold" : ""}`
            }
          >
            Wallet
          </NavLink>

        </div>
      </div>
    </nav>
  );
}
