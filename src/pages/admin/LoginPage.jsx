import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all credentials.");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back, Shop Owner!");
      navigate('/admin/dashboard');
    } catch (error) {
      console.error("Auth login failure:", error);
      toast.error(error.message || "Failed to authenticate. Please verify email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-body select-none">
      
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-gold-pale shadow-hover">
        
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full border border-gold bg-gold-pale text-gold font-bold flex items-center justify-center text-xl mb-4">
            SL
          </div>
          <h2 className="text-3xl font-display font-bold text-brown-deep tracking-wide">
            Sri Sai Lakshmi
          </h2>
          <span className="text-[10px] font-bold text-gold uppercase tracking-[0.25em] block mt-1">
            Owner Dashboard Control
          </span>
          <p className="mt-4 text-xs text-brown-light leading-relaxed">
            Please log in with your administrative credentials to manage store contents, products, and incoming inquiries.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 text-sm">
          
          <div className="rounded-md space-y-4">
            
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email-address" className="font-semibold text-brown-deep flex items-center gap-1.5">
                <Mail size={16} className="text-brown-light" />
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@srisailakshmi.com"
                className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/30 text-brown-deep placeholder-brown-light/40 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5 relative">
              <label htmlFor="password" className="font-semibold text-brown-deep flex items-center gap-1.5">
                <Lock size={16} className="text-brown-light" />
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-10 py-2.5 rounded-md border border-brown-light/20 bg-cream/30 text-brown-deep placeholder-brown-light/40 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-brown-light hover:text-gold"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

          </div>

          {/* Submit Action */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent font-body font-bold uppercase tracking-wider text-xs rounded-md text-brown-deep bg-gold hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-all duration-300 shadow-md disabled:bg-brown-light/40 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : 'Login to Dashboard'}
            </button>
          </div>

        </form>

        <div className="text-center pt-2">
          <p className="text-[10px] text-brown-light italic">
            Mock Mode Active: Login with email <strong className="text-gold">admin@srisailakshmi.com</strong> and password <strong className="text-gold">admin123</strong> to test the console.
          </p>
        </div>

      </div>

    </div>
  );
};
export default LoginPage;
