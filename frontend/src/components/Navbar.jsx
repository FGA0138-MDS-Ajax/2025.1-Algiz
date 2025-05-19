import { Link } from 'react-router-dom';

function Home() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-2 bg-green-100 shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <Link to='/' className="w-8 h-8">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-8 h-8 object-contain"
          />
        </Link>

        {/* Search bar */}
        <div className="relative ml-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            {/* Search icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-1 w-90 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="Pesquisar"
          />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 text-gray-800">
        <Link to="/" className="hover:text-green-600">Home</Link>
        <Link to="/Empresas" className="hover:text-green-600">Empresas</Link>
        <Link to="/Blog" className="hover:text-green-600">Blog</Link>
        <Link to="/Sobrenos" className="hover:text-green-600">Sobre nós</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-2">
        <Link to = '/Login' className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600">Login</Link>
      </div>
    </nav>
  );
}

export default Home;