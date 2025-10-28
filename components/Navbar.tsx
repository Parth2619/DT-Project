import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogoIcon, LogoutIcon, SunIcon, MoonIcon, MenuIcon, XIcon } from '../constants';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        isActive
          ? 'text-white shadow-[0_0_10px_white]'
          : 'text-gray-300 hover:text-white'
      }`
    }
  >
    {children}
  </NavLink>
);

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header className="sticky top-0 z-50 p-4">
      <div className="max-w-5xl mx-auto">
        <nav className="flex items-center justify-between bg-black/30 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-lg">
          {/* Left side: Logo and Name */}
          <Link to="/" className="flex items-center gap-3">
            <LogoIcon className="text-white h-6 w-6" />
            <span className="text-lg font-semibold text-white tracking-tight">
              L&F Portal
            </span>
          </Link>
          
          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            {/* FIX: Added children to NavItem components to resolve missing property error. */}
            <NavItem to="/lost-and-found">Lost & Found</NavItem>
            <NavItem to="/notes">Share Notes</NavItem>
          </div>
          
          {/* Right side: Actions */}
          <div className="flex items-center gap-2 md:gap-4">
             <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
              >
                {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
              </button>
            {isAuthenticated && user ? (
              <div className="relative group hidden md:block">
                <button className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:shadow-glow-white">
                    <span className="font-semibold text-sm">{user.email}</span>
                </button>
                <div className="absolute top-full right-0 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                    <div className="w-48 bg-[#101018]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg p-2">
                        <div className="p-2">
                            <p className="font-bold text-white truncate">{user.email}</p>
                            <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                        </div>
                        <div className="border-t border-white/10 my-1"></div>
                        <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 text-left px-2 py-1.5 text-sm text-red-400 hover:bg-white/10 rounded"
                        >
                            <LogoutIcon className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
              </div>
            ) : (
              <Link to="/signin" className="hidden md:block bg-white/10 text-white px-4 py-2 text-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:shadow-glow-white">
                Sign In
              </Link>
            )}
            <div className="md:hidden">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10">
                    {isMobileMenuOpen ? <XIcon className="w-6 h-6"/> : <MenuIcon className="w-6 h-6"/>}
                </button>
            </div>
          </div>
        </nav>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div className="md:hidden mt-2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center">
                 <div className="flex flex-col items-center gap-4">
                    {/* FIX: Added children to NavItem components to resolve missing property error. */}
                    <NavItem to="/lost-and-found">Lost & Found</NavItem>
                    <NavItem to="/notes">Share Notes</NavItem>
                    <div className="border-t border-white/10 w-full my-2"></div>
                     {isAuthenticated ? (
                         <button onClick={handleLogout} className="text-red-400 font-semibold w-full py-2">Logout</button>
                     ) : (
                         <Link to="/signin" className="bg-white/10 text-white px-4 py-2 rounded-full w-full">Sign In</Link>
                     )}
                </div>
            </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;