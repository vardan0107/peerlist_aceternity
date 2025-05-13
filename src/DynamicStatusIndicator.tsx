import { motion } from "motion/react";
import safeTickLogo from "./assets/safeTick.svg";
import warningLogo from "./assets/warning.svg";
import { useEffect, useState } from "react";

const TRASNSACTION_STATES = [
  {
    id: 0,
    key: "pending",
    text: "Analyzing",
    bgColor: "#eff6ff",
    textFromLeft: true,
    textColor: "#3b82f6",
  },
  {
    id: 1,
    key: "success",
    text: "Safe",
    bgColor: "#dcfce7",
    textColor: "#22c55e",
    textFromRight: true,
  },
  {
    id: 2,
    key: "warning",
    text: "Warning",
    bgColor: "#fef2f2",
    textColor: "#ef4444",
    textFromRight: true,
  },
];

const DUMMY_SEQUENCE = ["pending", "success", "pending", "warning"];
const leftVariants = {
  visible: { x: 0, opacity: 1, width: "auto" },
  hidden: { x: -30, opacity: 0, width: 0 },
};

const rightVariants = {
  visible: { x: 0, opacity: 1, width: "auto" },
  hidden: { x: 30, opacity: 0, width: 0 },
};
function DynamicStatusIndicator() {
  const [transactionState, setTransactionState] = useState(
    TRASNSACTION_STATES[0]
  );
  const [_, setSequenceIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSequenceIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % DUMMY_SEQUENCE.length;
        const nextState =
          TRASNSACTION_STATES.find(
            (state) => state.key === DUMMY_SEQUENCE[nextIndex]
          ) || TRASNSACTION_STATES[0];
        setTransactionState(nextState);
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className={`mt-10 w-fit p-5 rounded-full flex place-items-center m-auto font-semibold gap-1 overflow-hidden`}
      style={{
        backgroundColor: transactionState.bgColor,
        color: transactionState.textColor,
      }}
    >
      {transactionState.key === "pending" && <Spinner />}
      {transactionState.key === "success" && (
        <motion.img
          src={safeTickLogo}
          alt="Safe"
          initial={{ width: 0 }}
          animate={{ width: "1.5rem" }}
          transition={{ ease: "easeIn" }}
        />
      )}
      {transactionState.key === "warning" && (
        <motion.img
          src={warningLogo}
          alt="warning"
          initial={{ x: 0 }}
          animate={{ x: [0, -5, 5, -5, 5, 0] }}
          transition={{ duration: 0.5, delay: 1 }}
        />
      )}
      {/* Left Text */}
      <motion.span
        className="whitespace-nowrap"
        variants={leftVariants}
        animate={transactionState.textFromLeft ? "visible" : "hidden"}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {transactionState.text}
      </motion.span>

      {/* Static Center Text */}
      <span className="whitespace-nowrap">Transaction</span>

      {/* Right Text */}
      <motion.span
        className="whitespace-nowrap"
        variants={rightVariants}
        animate={transactionState.textFromRight ? "visible" : "hidden"}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {transactionState.text}
      </motion.span>
    </div>
  );
}

function Spinner({ size = "w-5 h-5", color = "#1f8fe0" }) {
  return (
    <motion.div
      className={`border-3 rounded-full ${size}`}
      style={{
        borderColor: "#aed0fc",
        borderTopColor: color,
      }}
      animate={{ rotate: 360 * 2 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 1,
      }}
    />
  );
}

export default DynamicStatusIndicator;
