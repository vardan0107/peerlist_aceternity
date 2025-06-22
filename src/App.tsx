import "./App.css";
import DynamicStatusIndicator from "./DynamicStatusIndicator";
import FluidMenu from "./FluidMenu";
import { motion, useAnimation, useScroll } from "motion/react";
import arrowDownLogo from "./assets/arrowDown.svg";
import { useEffect } from "react";
import AnimatedCheckboxes from "./AnimatedCheckboxes";
import AnimatedToggles from "./AnimatedToggles";
import SharedLayoutTabs from "./SharedLayoutTabs";

const toggles = [
  { id: "toggle1", label: "Free" },
  {
    id: "toggle2",
    label: "Premium",
    children: [
      { id: "toggle1-1", label: "Monthly" },
      { id: "toggle1-2", label: "Annual" },
    ],
  },
];

function App() {
  const { scrollYProgress } = useScroll();
  const controls = useAnimation();

  useEffect(() => {
    async function sequence() {
      // Start bounce animation
      await controls.start({
        y: [-40, 0, -40, 0, -40, 0],
        opacity: 1,
        transition: { duration: 2, ease: "linear" },
      });

      // Then fade out
      await controls.start({
        opacity: 0,
        transition: { duration: 0.5 },
      });
    }

    sequence();
  }, [controls]);
  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          originX: 0,
          backgroundColor: "red",
          zIndex: 1000,
        }}
      ></motion.div>
      <svg className="hidden absolute" aria-hidden="true">
        <defs>
          <filter id="gooey-filter-menu">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="5"
              result="blur"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            ></feColorMatrix>
            <feComposite
              in="SourceGraphic"
              in2="goo"
              operator="atop"
            ></feComposite>
          </filter>
        </defs>
      </svg>

      <motion.img
        className="absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-1/2"
        src={arrowDownLogo}
        initial={{ opacity: 1, y: 0 }}
        animate={controls}
      />

      <div className="flex flex-col w-full">
        <div className="flex h-screen w-full border-b-4 ">
          <div className="absolute mt-10 ml-10">
            <FluidMenu />
          </div>
          <h1 className="place-self-center m-auto">Fluid Menu Animation</h1>
        </div>

        <div className="h-screen w-full place-self-center border-b-4">
          <h1 className="m-auto mt-[40vh]">Dynamic Status Indicator</h1>
          <DynamicStatusIndicator />
        </div>
        <div className="h-screen w-full place-self-center border-b-4">
          <h1 className="m-auto mt-[30vh]">Animated Checkboxes</h1>
          <AnimatedCheckboxes />
        </div>

        <div className="h-screen w-full place-self-center border-b-4">
          <h1 className="m-auto mt-[30vh]">Animated Toggles</h1>
          <div className="w-100 m-auto mt-10">
            <AnimatedToggles toggles={toggles} />
          </div>
        </div>
        <div className="h-screen w-full place-self-center">
          <h1 className="m-auto mt-[20vh] mb-10">Shared Layout Tabs</h1>
          <SharedLayoutTabs />
        </div>
      </div>
    </>
  );
}

export default App;
