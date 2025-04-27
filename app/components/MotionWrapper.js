'use client';

import { motion } from "framer-motion";

export function MotionDiv({ 
  children, 
  className, 
  initial, 
  animate, 
  transition,
  whileHover,
  whileTap
}) {
  return (
    <motion.div 
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
      whileHover={whileHover}
      whileTap={whileTap}
    >
      {children}
    </motion.div>
  );
}

export function MotionButton({ 
  children, 
  className, 
  whileHover, 
  whileTap 
}) {
  return (
    <motion.button 
      className={className}
      whileHover={whileHover}
      whileTap={whileTap}
    >
      {children}
    </motion.button>
  );
}
