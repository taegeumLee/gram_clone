"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BackgroundSlider() {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key={imageIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3, ease: "easeInOut" }}
      className="absolute inset-0"
    >
      <Image
        src={`/images/background/${imageIndex}.jpeg`}
        alt="Background"
        fill
        className="object-cover brightness-[0.7]"
        priority
        quality={75}
        loading="eager"
      />
    </motion.div>
  );
}
