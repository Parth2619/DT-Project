import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogoIcon } from '../constants';

// Social Icons
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.75 8.36,4.73 12.19,4.73C15.63,4.73 17.5,6.75 17.5,6.75L19.5,4.75C19.5,4.75 16.56,2 12.19,2C6.42,2 2.03,6.8 2.03,12C2.03,17.2 6.42,22 12.19,22C17.96,22 21.54,18.5 21.54,12.81C21.54,11.9 21.45,11.5 21.35,11.1Z" />
  </svg>
);
const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.83,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
  </svg>
);
const FacebookIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="currentColor" d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V9H17V12H14V22H10V12H7V9H10V6A4,4 0 0,1 14,2H17Z" />
    </svg>
);

// Eye Icons
const EyeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const EyeSlashIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" />
  </svg>
);


const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  useEffect(() => {
    if (email || password) {
      validate();
    }
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) {
      return;
    }
    setIsSubmitting(true);
    
    // Demo users for presentation
    const demoUsers = [
      { email: 'user1@demo.com', password: 'demo123', role: 'user', name: 'Alice Johnson' },
      { email: 'user2@demo.com', password: 'demo123', role: 'user', name: 'Bob Smith' }
    ];
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    const foundUser = demoUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      login({ email: foundUser.email, role: foundUser.role, name: foundUser.name });
      navigate('/');
    } else {
      setServerError('Invalid email or password. Try: user1@demo.com or user2@demo.com (password: demo123)');
    }
    
    setIsSubmitting(false);
  };
  
  const isValid = Object.keys(errors).length === 0 && email && password;

  return (
    <div className="w-full max-w-md mx-auto transition-all duration-500 hover:scale-[1.02]">
      <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--input-border)] rounded-3xl shadow-2xl p-8 sm:p-10">
        <div className="flex items-center justify-center gap-3 mb-8">
            <LogoIcon className="text-white h-8 w-8" />
            <span className="text-2xl font-bold text-white tracking-tight">
                L&F Portal
            </span>
        </div>

        {serverError && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 text-sm rounded-lg p-3 mb-4 text-center">
            {serverError}
          </div>
        )}

        {/* Demo Users Info Box */}
        <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 mb-6">
          <h3 className="text-blue-300 font-semibold mb-2 text-sm">🎭 Demo Accounts</h3>
          <div className="space-y-2 text-xs text-blue-200">
            <div>
              <p className="font-medium">User 1 (Alice):</p>
              <p className="text-blue-300">📧 user1@demo.com</p>
              <p className="text-blue-300">🔑 demo123</p>
            </div>
            <div>
              <p className="font-medium">User 2 (Bob):</p>
              <p className="text-blue-300">📧 user2@demo.com</p>
              <p className="text-blue-300">🔑 demo123</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              placeholder="you@example.com"
              className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--input-border-focus)] transition-shadow duration-300 shadow-sm"
              required
            />
            {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Password</label>
            <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                  placeholder="••••••••"
                  className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--input-border-focus)] transition-shadow duration-300 shadow-sm pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
            </div>
            {errors.password && <p id="password-error" className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Forgot password?</a>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl border-b-4 border-indigo-700 hover:bg-primary-hover active:border-b-2 active:translate-y-0.5 disabled:bg-gray-500 disabled:border-gray-600 disabled:cursor-not-allowed transition-all duration-150 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-primary"
            >
              {isSubmitting ? 'Signing In...' : 'Sign in'}
            </button>
          </div>
        </form>
        
        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-[var(--input-border)]" />
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-neutral-800 text-gray-400">or continue with</span>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button className="flex items-center justify-center p-3 bg-[var(--btn-social-bg)] border border-[var(--btn-social-border)] rounded-xl hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-white" aria-label="Sign in with Google">
            <GoogleIcon />
          </button>
          <button className="flex items-center justify-center p-3 bg-[var(--btn-social-bg)] border border-[var(--btn-social-border)] rounded-xl hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-white" aria-label="Sign in with Github">
            <GithubIcon />
          </button>
          <button className="flex items-center justify-center p-3 bg-[var(--btn-social-bg)] border border-[var(--btn-social-border)] rounded-xl hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-white" aria-label="Sign in with Facebook">
            <FacebookIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
