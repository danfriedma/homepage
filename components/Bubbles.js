import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import "./styles.css";

const random_num = (a, b) => {
  return a + (b - a) * Math.random();
}

const random_int = (a, b) => {
  return Math.floor(random_num(a, b + 1));
}

const colors = ["#dddfd4", "#fae596", "#3fb0ac", "#173e43"];

const makeRgbColor = () => colors[random_int(0, 3)];

const generateDataset = () => {
  const range = Array.from(Array(70).keys());
  return range.map(() => [random_int(1, 100), random_int(1, 100), makeRgbColor()]);
};

const App = () => {
  const [dataset, setDataset] = useState(generateDataset());

  useEffect(() => {
    const interval = setInterval(() => {
      const newDataset = generateDataset();
      setDataset(newDataset);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let counter = 0;
    const timer = setInterval(() => {
      console.log(++counter);
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <svg viewBox="0 0 100 100" style={{ position: 'relative', width: '100%', overflow: 'hidden', opacity: .5, zIndex: 1}}>
      {dataset.map(([x, y, z], index) => (
        <motion.circle
          key={index}
          cx={x}
          cy={y}
          fill={z}
          animate={{ cx: x, cy: y }}
          r={random_int(1, 5)}
        />
      ))}
    </svg>
  );
};

export default App
