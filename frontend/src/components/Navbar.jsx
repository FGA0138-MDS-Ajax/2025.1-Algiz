import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-2 bg-gradient-to-b from-[#7ffa88] to-white shadow-md">
      {/* Left: Logo */}
      <div className="flex items-center space-x-4 w-[400px]">
        <NavLink 
          to='/' 
          className={({ isActive }) => 
            isActive 
              ? "text-green-800 font-bold" 
              : "hover:text-green-600 hover:scale-105 transition-transform"
          }
        >
          {({ isActive }) => (
            <img 
              src={isActive ? "/logo-3.png" : "/logo.png"} 
              alt="Logo" 
              className="w-8 h-8 object-contain" 
            />
          )}
        </NavLink>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-[28rem]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-1 w-full rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="Pesquisar"
          />
        </div>
      </div>

      {/* Right: Nav Items */}
      <div className="flex flex-wrap items-center gap-7 text-gray-800 w-[400px] justify-end">
        <NavLink 
          to="/" 
          className={({isActive}) => 
            isActive ? "text-green-800 font-bold" : "hover:text-green-600 hover:scale-105 transition-transform"
          }
        >
          Home
        </NavLink>
        <NavLink 
          to="/Empresas" 
          className={({isActive}) => 
            isActive ? "text-green-800 font-bold" : "hover:text-green-600 hover:scale-105 transition-transform"
          }
        >
          Empresas
        </NavLink>
        <NavLink 
          to="/Blog" 
          className={({isActive}) => 
            isActive ? "text-green-800 font-bold" : "hover:text-green-600 hover:scale-105 transition-transform"
          }
        >
          Blog
        </NavLink>
        <NavLink 
          to="/Sobrenos" 
          className={({isActive}) => 
            isActive ? "text-green-800 font-bold" : "hover:text-green-600 hover:scale-105 transition-transform"
          }
        >
          Sobre nós
        </NavLink>
        <NavLink 
          to="/Login" 
          className="px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-800"
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
}

export default Home;