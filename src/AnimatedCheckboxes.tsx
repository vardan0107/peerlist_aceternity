import { AnimatePresence, motion, useAnimate } from "motion/react";

import checkBox from "./assets/checkbox.svg";
import { useEffect, useState } from "react";
function AnimatedCheckboxes() {
  const [todoList, setTodoList] = useState([
    { id: 1, text: "Learn React", checked: false },
    { id: 2, text: "Learn Framer Motion", checked: false },
    { id: 3, text: "Build a cool app", checked: false },
    { id: 4, text: "Deploy it", checked: false },
  ]);

  const pathVariants = {
    visible: { pathLength: 1 },
    hidden: { pathLength: 0, width: 0 },
  };

  const checkBoxVariants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.5 },
  };

  const handleCheckboxClick = (id: number) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  return (
    <div className="text-left w-fit m-auto mt-10 bg-white p-6 rounded-lg">
      {todoList.map((todo) => {
        const [scope, animate] = useAnimate();
        useEffect(() => {
          animate(
            scope.current,
            { x: [0, -5, 5, -5, 5, 0] },
            { duration: 0.5 }
          );
        }, [todo.checked]);
        return (
          <div
            className="flex hover:bg-[#dfdddd] mb-2 w-fit rounded-lg pl-2 pr-2 cursor-pointer"
            key={`${todo.id}-container`}
            onClick={() => handleCheckboxClick(todo.id)}
          >
            <div className="relative w-7 h-7 m-2">
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute top-0 left-0 w-full h-full z-10"
              >
                <motion.path
                  d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" // Example path
                  stroke="#c4c1c2"
                  strokeLinecap="butt"
                  strokeWidth={3}
                  variants={pathVariants}
                  style={{ rotate: "90deg" }}
                  initial={pathVariants.visible}
                  animate={
                    todo.checked ? pathVariants.hidden : pathVariants.visible
                  }
                  transition={{ duration: 0.5, delay: todo.checked ? 0 : 0.5 }}
                />
              </motion.svg>

              <motion.img
                src={checkBox}
                alt="CheckBox"
                className="absolute top-0 left-[1px] w-[90%] h-full"
                variants={checkBoxVariants}
                initial={checkBoxVariants.hidden}
                animate={
                  todo.checked
                    ? checkBoxVariants.visible
                    : checkBoxVariants.hidden
                }
                transition={{ delay: 0.5 }}
              />
            </div>
            <motion.div
              ref={scope}
              className={`m-2 ${
                todo.checked ? "text-gray-500" : "text-black"
              } relative`}
              initial={false}
            >
              <AnimatePresence mode="wait" initial={false}>
                {todo.checked && (
                  <motion.div
                    className="h-0.5 w-full absolute top-1/2 bg-gray-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </AnimatePresence>

              {todo.text}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

export default AnimatedCheckboxes;
