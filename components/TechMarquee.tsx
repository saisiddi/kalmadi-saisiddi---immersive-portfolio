import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const TechMarquee = () => {
  return (
    <div className="py-24 overflow-hidden border-y border-white/5 bg-background/50 backdrop-blur-sm relative z-10">
      <div className="flex whitespace-nowrap">
        <motion.div 
          className="flex gap-16 items-center pr-16"
          animate={{ x: "-50%" }}
          transition={{ 
            duration: 20, 
            ease: "linear", 
            repeat: Infinity 
          }}
        >
          {[...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS].map((skill, i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-white/20 hover:text-accent transition-colors duration-300 cursor-default">
                {skill}
              </span>
              <span className="w-2 h-2 rounded-full bg-accent/50" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TechMarquee;