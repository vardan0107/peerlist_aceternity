import {
  motion,
  useAnimationControls,
  type AnimationControls,
} from "motion/react";
import alignJustifyLogo from "./assets/alignJustify.svg";
import homeLogo from "./assets/home.svg";
import crossLogo from "./assets/cross.svg";
import mailLogo from "./assets/mail.svg";
import profileLogo from "./assets/profile.svg";
import settingLogo from "./assets/setting.svg";
import { useEffect, useState } from "react";

const INITIAL_MENU_ITEMS = [
  { id: 1, name: "toggle", icon: alignJustifyLogo, y: 0 },
  { id: 2, name: "home", icon: homeLogo, y: 50 },
  { id: 3, name: "mail", icon: mailLogo, y: 100 },
  { id: 4, name: "profile", icon: profileLogo, y: 150 },
  { id: 5, name: "setting", icon: settingLogo, y: 200 },
];

type MenuItemProps = {
  id: number;
  imageSrc: string;
  yaxis: number;
  handleMenuItemClick: (id: number) => void;
  controls: AnimationControls;
};

function FluidMenu() {
  const [menuItems, setMenuItems] = useState(INITIAL_MENU_ITEMS);

  const [menuOpen, setMenuOpen] = useState(false);
  const controls = useAnimationControls();

  useEffect(() => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === 1
          ? { ...item, icon: menuOpen ? crossLogo : alignJustifyLogo }
          : item
      )
    );
    controls.start(menuOpen ? "visible" : "hidden");
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div style={{ filter: "url(#gooey-filter-menu)" }}>
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          id={item.id}
          imageSrc={item.icon}
          yaxis={item.y}
          handleMenuItemClick={toggleMenu}
          controls={controls}
        />
      ))}
    </div>
  );
}

function MenuItem({
  id,
  imageSrc,
  handleMenuItemClick,
  controls,
  yaxis,
}: MenuItemProps) {
  const wrapperVariants = {
    hidden: {
      opacity: 1,
      y: 0,
    },
    visible: {
      opacity: 1,
      y: yaxis,
    },
  };

  return (
    <motion.div
      className={`absolute w-14 h-14 mt-3 bg-white rounded-full flex justify-center items-center ${
        id === 1 ? "z-10" : "z-0"
      }`}
      initial={{ opacity: 1, scale: 1, y: 0 }}
      animate={controls}
      transition={{
        duration: 0.4,
      }}
      variants={wrapperVariants}
      onClick={() => {
        handleMenuItemClick(id);
      }}
    >
      <motion.img
        className="h-5 w-5 text-gray-500 hover:text-black"
        src={imageSrc}
        alt="allign justify logo"
        whileTap={{ scale: 0.8, filter: "blur(5px)" }}
      />
    </motion.div>
  );
}

export default FluidMenu;
