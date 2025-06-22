import { motion } from "motion/react";
import { useState } from "react";

function AnimatedToggles({
  toggles,
  id = "sample-id",
  propTheme = "dark",
}: {
  toggles: {
    id: string;
    label: string;
    children?: { id: string; label: string }[];
  }[];
  id?: string;
  propTheme?: "light" | "dark";
}) {
  const colorTheme = {
    light: {
      primary: "#ffffff",
      secondary: "#000000",
    },
    dark: {
      primary: "#000000",
      secondary: "#ffffff",
    },
  };
  const [theme, _] = useState(
    propTheme === "dark" ? colorTheme.dark : colorTheme.light
  );
  const [selectedToggle, setSelectedToggle] = useState(toggles[0].id);

  return (
    <div className="h-16 w-full bg-gray-50 m-auto flex p-[3px] rounded-full overflow-hidden">
      {toggles.map((toggle) => (
        <motion.div
          className="w-[50%] relative flex flex-col"
          key={toggle.id}
          animate={{
            color:
              selectedToggle === toggle.id ? theme?.secondary : theme?.primary,
          }}
          layoutId={toggle.id}
          onClick={() => setSelectedToggle(toggle.id)}
        >
          {selectedToggle === toggle.id && (
            <motion.div
              layoutId={`toggle-indicator-${id}`}
              style={{
                backgroundColor: theme?.primary,
              }}
              className={`w-full h-full rounded-full absolute`}
            ></motion.div>
          )}

          {selectedToggle === toggle.id && toggle.children ? (
            <AnimatedToggles
              toggles={toggle.children}
              id="child"
              propTheme="light"
            />
          ) : (
            <div className="m-auto">
              <motion.span className={`z-10 relative font-bold text-xl`}>
                {toggle.label}
              </motion.span>

              <motion.div>
                {toggle.children?.map((child, index) => {
                  return (
                    <motion.span
                      layoutId={child.id}
                      className={`z-10 relative font-medium text-xs`}
                      key={child.id}
                    >
                      {index !== 0 && <span className="mx-1">•</span>}
                      {child.label}
                    </motion.span>
                  );
                })}
              </motion.div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default AnimatedToggles;
