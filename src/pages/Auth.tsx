import React, { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Lock, ArrowRight, Github } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        const res = await api.auth.login(formData.email, formData.password);
        if (res.success) {
          login(res.token, res.user);
          navigate('/');
        } else {
          setError(res.message || 'Login failed');
        }
      } else {
        const res = await api.auth.signup(formData.name, formData.email, formData.password);
        if (res.success) {
          // Typically auto-login after signup or prompt to login
          setIsLogin(true);
          setError('Signup successful! Please login.');
        } else {
          setError(res.message || 'Signup failed');
        }
      }
    } catch (err: any) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-black min-h-screen flex items-center justify-center pt-20 px-4 py-20 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-zinc-900 border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light tracking-tighter mb-2">
            {isLogin ? 'WELCOME ' : 'JOIN '}
            <span className="font-bold underline decoration-orange-500 underline-offset-8 decoration-2">BACK</span>
          </h1>
          <p className="text-white/40 text-xs tracking-widest uppercase mt-6">{isLogin ? 'Login to manage your orders' : 'Create an account to start shopping'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-2"
              >
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type="text"
                    placeholder="FULL NAME"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-full py-4 pl-12 pr-6 text-xs font-bold tracking-widest uppercase focus:border-orange-500 outline-none transition-all placeholder:text-white/10"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-full py-4 pl-12 pr-6 text-xs font-bold tracking-widest uppercase focus:border-orange-500 outline-none transition-all placeholder:text-white/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                type="password"
                placeholder="PASSWORD"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-full py-4 pl-12 pr-6 text-xs font-bold tracking-widest uppercase focus:border-orange-500 outline-none transition-all placeholder:text-white/10"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-[10px] uppercase tracking-widest font-bold text-center animate-bounce">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-3 hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50 transform active:scale-95"
          >
            <span>{isLoading ? 'PROCESSING...' : isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}</span>
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-white/5 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 h-[1px] bg-white/5"></div>
            <span className="text-[10px] text-white/20 uppercase tracking-[0.3em]">OR CONTINUE WITH</span>
            <div className="flex-1 h-[1px] bg-white/5"></div>
          </div>

          <button className="w-full border border-white/10 py-3 rounded-full flex items-center justify-center space-x-3 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
            <Github size={18} />
            <span>Github</span>
          </button>

          <p className="text-center text-[10px] text-white/30 tracking-widest uppercase">
            {isLogin ? "DON'T HAVE AN ACCOUNT?" : "ALREADY HAVE AN ACCOUNT?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-500 font-bold hover:underline underline-offset-4"
            >
              {isLogin ? 'SIGN UP' : 'LOGIN'}
            </button>
          </p>
        </div>
      </motion.div>
    </main>
  );
};

export default Auth;
