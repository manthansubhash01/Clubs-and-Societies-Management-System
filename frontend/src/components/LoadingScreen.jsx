import { motion } from "framer-motion";

const LoadingScreen = ({ message = "Loading, please wait..." }) => {
  const blobTransition = {
    repeat: Infinity,
    repeatType: "reverse",
    duration: 4,
    ease: "easeInOut",
  };

  return (
    <motion.div
      className="relative flex items-center justify-center min-h-[calc(100vh-6rem)] px-8 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="absolute w-72 h-72 bg-[#f2b98a] rounded-[60%] blur-3xl opacity-80"
        style={{ top: "-10%", left: "-10%" }}
        animate={{ x: 40, y: 40, scale: 1.1 }}
        transition={blobTransition}
      />

      <motion.div
        className="absolute w-80 h-80 bg-[#f7d2a6] rounded-[60%] blur-3xl opacity-80"
        style={{ bottom: "-15%", right: "-10%" }}
        animate={{ x: -40, y: -20, scale: 1.05 }}
        transition={{ ...blobTransition, duration: 5 }}
      />

      <motion.div
        className="absolute w-64 h-64 bg-[#e8a96b] rounded-[60%] blur-3xl opacity-70"
        style={{ top: "40%", left: "50%", transform: "translateX(-50%)" }}
        animate={{ y: -30, scale: 1.08 }}
        transition={{ ...blobTransition, duration: 6 }}
      />

      <motion.div
        className="relative flex flex-col items-center gap-4 z-10"
        initial={{ scale: 0.9, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-[#4a2f16] tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.h1>

        <motion.p
          className="text-sm md:text-base text-[#7b5731]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.4 }}
        >
          This will only take a moment...
        </motion.p>

        <motion.div className="mt-4 w-52 md:w-72 h-1.5 rounded-full bg-[#e3c3a2]/60 overflow-hidden">
          <motion.div
            className="h-full w-1/2 bg-[#8b5a2b]"
            animate={{ x: ["-50%", "120%"] }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
