"use client";

import { motion } from "framer-motion";

type LoaderProps = {
  size?: number;
  color?: string;
  type?: "spinner" | "dots" | "pulse";
};

const Loader: React.FC<LoaderProps> = ({ size = 40, color = "#3b82f6", type = "spinner" }) => {
  return (
    <div className="flex items-center justify-center h-full">
      {type === "spinner" && (
        <motion.div
          className="rounded-full border-4 border-transparent border-t-current"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          style={{ width: size, height: size, borderTopColor: color }}
        />
      )}

      {type === "dots" && (
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="rounded-full"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              style={{ width: size / 4, height: size / 4, backgroundColor: color }}
            />
          ))}
        </div>
      )}

      {type === "pulse" && (
        <motion.div
          className="rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          style={{ width: size, height: size, backgroundColor: color }}
        />
      )}
    </div>
  );
};

export default Loader;
