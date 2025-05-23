import { Link } from 'react-router-dom';

function Home() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-2 bg-green-100 shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <Link to='/' className="w-8 h-8 text-green-600">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm4.86,14.25c-2.65,3.52-9.89,3.23-9.89,3.23s-.74-7.24,3.41-9.89c2.65-1.68,6.47-.45,8.15,2.2S19.51,12.57,16.86,14.25Z" />
          </svg>
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
        <Link to="/Sobrenos" className="hover:text-green-600">Sobre nos</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-2">
        <Link to = '/' className="flex items-center text-gray-800 hover:text-green-600">
          Logout
          {/* Arrow right icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}

export default Home;