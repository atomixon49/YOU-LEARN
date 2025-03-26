import { motion, useSpring, useTransform } from 'framer-motion';
import React from 'react';

export function Model3D({ mousePosition }) {
  // Crear springs para un movimiento más suave
  const springConfig = { damping: 25, stiffness: 100 };
  const xSpring = useSpring(0, springConfig);
  const ySpring = useSpring(0, springConfig);

  // Transformar la posición del mouse a un rango más pequeño para el movimiento
  const x = useTransform(mousePosition.x, [-1, 1], [-20, 20]);
  const y = useTransform(mousePosition.y, [-1, 1], [-20, 20]);

  // Actualizar los springs cuando cambia la posición del mouse
  React.useEffect(() => {
    x.onChange(latest => xSpring.set(latest));
    y.onChange(latest => ySpring.set(latest));
  }, [x, y, xSpring, ySpring]);

  return (
    <motion.div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <motion.img
        src="/assets/3d/forma-3d.png"
        style={{
          width: '80%',
          height: '80%',
          objectFit: 'contain',
          x: xSpring,
          y: ySpring,
          filter: 'drop-shadow(0 0 20px rgba(124, 77, 255, 0.3))'
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}
