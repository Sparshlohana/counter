import { useState } from "react";
import { motion, useAnimation } from 'framer-motion';
import Counter from "./components/Counter";
import { ClearIcon } from "./components/Icons";

function App() {
  const [count, setCount] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const backgroundControls = useAnimation();

  const increaseNum = () => {
    setCount((prev) => prev + 1);

    // Generate a random color for the background
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    // Smoothly transition background color
    backgroundControls.start({
      backgroundColor: randomColor,
      transition: { duration: 0.5, ease: "easeOut" }
    });

    setBackgroundColor(randomColor);
  };

  // Function to calculate the inverse color
  const calculateInverseColor = (color) => {
    const hex = color.replace(/#/, '');
    return `#${(Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()}`;
  };

  const textColor = calculateInverseColor(backgroundColor);

  return (
    <motion.div
      layout
      className="text-white cursor-pointer select-none relative flex justify-center items-center min-h-[100vh] flex-col"
      initial={{ backgroundColor: "#000000" }}
      animate={backgroundControls}
      onClick={increaseNum}
    >
      <motion.div
        style={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Counter count={count} textColor={textColor} />
      </motion.div>

      <div className="absolute bottom-10 text-4xl flex justify-end items-center gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          whileHover={{ scale: 1.4 }}
          whileTap={{ rotate: -360, borderRadius: "100%" }}
        >
          <ClearIcon
            className="fill-white mt-3 cursor-pointer"
            onClick={() => setCount(-1)}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default App;
