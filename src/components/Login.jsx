import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import supabase from '../supabase';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);
    if (!error) navigate("/dashboard");
    else alert(error.message);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="auth-container">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="card auth-card"
      >
        <motion.div variants={itemVariants} className="has-text-centered mb-4">
          <motion.i 
            className="fas fa-user-circle mb-3"
            style={{ fontSize: '2.5rem', color: '#7B2CBF' }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          ></motion.i>
          <h1 className="title">Iniciar Sesión</h1>
        </motion.div>
        
        <motion.div className="field" variants={itemVariants}>
          <label className="label">Email</label>
          <div className="control has-icons-left">
            <input 
              className="input is-rounded" 
              type="email" 
              placeholder="ejemplo@dominio.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
        </motion.div>

        <motion.div className="field" variants={itemVariants}>
          <label className="label">Contraseña</label>
          <div className="control has-icons-left">
            <input 
              className="input is-rounded" 
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña segura"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
            <button 
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
            </button>
          </div>
        </motion.div>

        <motion.div className="field mt-5" variants={itemVariants}>
          <motion.button 
            className={`button is-primary is-fullwidth is-rounded ${isLoading ? 'is-loading' : ''}`}
            onClick={handleLogin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            <span className="icon">
              <i className="fas fa-sign-in-alt"></i>
            </span>
            <span>Entrar</span>
          </motion.button>
        </motion.div>

        <motion.div 
          className="has-text-centered mt-4"
          variants={itemVariants}
        >
          <Link 
            to="/register" 
            className="has-text-primary has-text-weight-semibold is-size-6"
            style={{ textDecoration: 'none' }}
          >
            ¿No tienes cuenta? <span className="has-text-weight-bold">Regístrate aquí</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}