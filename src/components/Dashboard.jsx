// src/components/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faDesktop, faArrowRight, faRocket, faAtom, faBrain, faLaptopCode, faRobot } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import supabase from "../supabase";

const Dashboard = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showDesktopPrompt, setShowDesktopPrompt] = useState(false);
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Verificar sesión y tiempo de expiración
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }

      // Verificar tiempo de expiración (2 horas)
      const expirationTime = new Date(session.expires_at * 1000);
      const now = new Date();
      if (now >= expirationTime) {
        await supabase.auth.signOut();
        navigate("/login");
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 5 * 60 * 1000); // Verificar cada 5 minutos
    return () => clearInterval(interval);
  }, [navigate]);

  // Verificar tamaño de pantalla
  useEffect(() => {
    const checkScreenWidth = () => {
      setShowDesktopPrompt(window.innerWidth < 768);
    };
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  // Manejar movimiento del mouse
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 50;
    const y = (e.clientY - rect.top - rect.height / 2) / 50;
    setMousePosition({ x, y });
  };

  // Configuración del slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <FontAwesomeIcon icon={faArrowRight} />,
    prevArrow: <FontAwesomeIcon icon={faArrowRight} rotation={180} />,
  };

  if (showDesktopPrompt) {
    return (
      <div className="hero is-fullheight has-text-centered">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hero-body"
        >
          <div className="container">
            <FontAwesomeIcon icon={faDesktop} size="4x" className="has-text-primary mb-4" />
            <h1 className="title has-text-white">¡Hola!</h1>
            <p className="subtitle has-text-light">Para una mejor experiencia, te recomendamos usar un dispositivo con pantalla grande.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navbar Fijo */}
      <nav className="navbar is-fixed-top has-background-black" style={{ 
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        minHeight: "3.5rem",
        height: "3.5rem",
        padding: "0"
      }}>
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item has-text-primary is-size-4 has-text-weight-bold">
              YouLearn
            </a>
            <button 
              className={`navbar-burger ${mobileMenu ? 'is-active' : ''} has-text-white`}
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <FontAwesomeIcon icon={mobileMenu ? faTimes : faBars} size="lg" />
            </button>
          </div>
          
          <div className={`navbar-menu ${mobileMenu ? 'is-active' : ''}`}>
            <div className="navbar-end">
              {['Cursos', 'Perfil', 'Soporte'].map((item) => (
                <motion.a
                  key={item}
                  className="navbar-item has-text-white is-size-6 has-text-weight-semibold"
                  initial={{ background: "transparent" }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 10
                    }
                  }}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    height: "3.5rem",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <motion.div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      backgroundColor: "#7c4dff",
                    }}
                    initial={{ x: "-50%", scale: 0 }}
                    whileHover={{
                      scale: [0, 1, 1],
                      width: "100%",
                      left: 0,
                      x: 0,
                      borderRadius: ["50%", "4px", "0px"],
                      transition: {
                        duration: 0.3
                      }
                    }}
                  />
                  {item}
                </motion.a>
              ))}
              <motion.button 
                className="button is-primary is-rounded ml-4"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(124, 77, 255, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "linear-gradient(45deg, #7c4dff, #448aff)",
                  border: "none",
                  height: "2.5rem"
                }}
              >
                Cerrar Sesión
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero con Slider */}
      <section className="hero is-medium" style={{ marginTop: "3.5rem" }}>
        <Slider {...settings}>
          {[
            {
              icon: faAtom,
              title: "Computación Cuántica",
              highlight: "Futuro",
              description: "Descubre cómo la computación cuántica está revolucionando el procesamiento de datos y transformando industrias enteras con su increíble poder de cálculo",
              gradient: ["#00d1b2", "#3273dc"]
            },
            {
              icon: faBrain,
              title: "Inteligencia Artificial",
              highlight: "IA",
              description: "Explora cómo la IA está transformando nuestro día a día, desde asistentes virtuales hasta sistemas de recomendación personalizados",
              gradient: ["#ff3860", "#7957d5"]
            },
            {
              icon: faLaptopCode,
              title: "Microsoft Certified Professional",
              highlight: "MCP",
              description: "Prepárate para las certificaciones MCP y destaca en el mundo laboral con credenciales reconocidas globalmente",
              gradient: ["#3273dc", "#23d160"]
            },
            {
              icon: faRobot,
              title: "Machine Learning",
              highlight: "ML",
              description: "Aprende sobre algoritmos que permiten a las máquinas aprender de datos y tomar decisiones inteligentes",
              gradient: ["#ffdd57", "#ff3860"]
            }
          ].map((slide, index) => (
            <div key={index}>
              <div 
                className="hero-body" 
                style={{
                  backgroundImage: `url(/assets/slides/slide${index + 1}.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "500px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="overlay" style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(0,0,0,0.6)",
                  zIndex: 1
                }} />
                <div className="container" style={{ zIndex: 2 }}>
                  <motion.h1 
                    className="title has-text-white is-1 mb-4"
                    style={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "3.5rem",
                      maxWidth: "600px"
                    }}
                  >
                    Descubre el{" "}
                    <span style={{ 
                      background: `linear-gradient(45deg, ${slide.gradient[0]}, ${slide.gradient[1]})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      padding: "0 0.5rem"
                    }}>
                      {slide.highlight}
                    </span>
                    <br />
                    {slide.title}
                  </motion.h1>
                  <motion.p 
                    className="subtitle has-text-light is-size-4 mt-4"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      maxWidth: "600px",
                      lineHeight: "1.6"
                    }}
                  >
                    {slide.description}
                  </motion.p>
                  <motion.button 
                    className="button is-primary is-rounded mt-5 is-medium"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 0 20px ${slide.gradient[0]}80`
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: `linear-gradient(45deg, ${slide.gradient[0]}, ${slide.gradient[1]})`,
                      border: "none",
                      padding: "1.5rem 2rem"
                    }}
                  >
                    <span>Explorar {slide.title}</span>
                    <motion.span
                      className="icon ml-2"
                      animate={{ 
                        rotate: [0, 45, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <FontAwesomeIcon icon={slide.icon} />
                    </motion.span>
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Sección de mensaje con imagen interactiva */}
      <section className="section" style={{ padding: "4rem 1.5rem" }}>
        <div className="container">
          <motion.div
            className="box"
            style={{
              background: "rgba(124, 77, 255, 0.05)",
              border: "2px solid #7c4dff",
              borderRadius: "1rem",
              padding: "2.5rem",
              position: "relative",
              overflow: "hidden"
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="columns is-vcentered">
              <div className="column is-7">
                <motion.h2
                  className="title has-text-white mb-4"
                  style={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "2.5rem",
                    background: "linear-gradient(45deg, #7c4dff, #448aff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Explora el Futuro de la Tecnología
                </motion.h2>
                <motion.p
                  className="subtitle has-text-light is-size-5"
                  style={{ 
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: "1.8"
                  }}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Sumérgete en el fascinante mundo de las tecnologías emergentes. 
                  Desde la computación cuántica hasta la inteligencia artificial, 
                  descubre los conceptos fundamentales que están transformando 
                  nuestra realidad y prepárate para ser parte de la revolución tecnológica.
                </motion.p>
              </div>
              <div className="column is-5">
                <motion.div
                  style={{
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    perspective: "1000px"
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
                >
                  <motion.img
                    src="/assets/3d/forma-3d.png"
                    style={{
                      width: "80%",
                      height: "80%",
                      objectFit: "contain",
                      filter: "drop-shadow(0 0 20px rgba(124, 77, 255, 0.3))"
                    }}
                    animate={{
                      rotateX: -mousePosition.y * 5,
                      rotateY: mousePosition.x * 5,
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      rotateX: { duration: 0.5, ease: "easeOut" },
                      rotateY: { duration: 0.5, ease: "easeOut" },
                      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                </motion.div>
              </div>
            </div>
            
            {/* Partículas de fondo */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  background: "#7c4dff",
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  filter: "blur(1px)"
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sección de Cursos Destacados */}
      <section className="section has-background-grey-darker">
        <div className="container">
          <h2 className="title has-text-white has-text-centered mb-6">Cursos Destacados</h2>
          <div className="columns is-multiline is-variable is-4">
            {[1, 2, 3].map((course) => (
              <div key={course} className="column is-one-third-desktop is-half-tablet">
                <motion.div 
                  className="card has-background-dark has-text-white"
                  whileHover={{ scale: 1.03, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
                >
                  <div className="card-image">
                    <figure className="image is-16by9">
                      <img src={`/courses/course${course}.jpg`} alt="Course" />
                    </figure>
                  </div>
                  <div className="card-content">
                    <h3 className="title is-5 has-text-white">Curso {course}</h3>
                    <p className="subtitle is-6 has-text-light">Descripción breve del curso</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Dashboard;