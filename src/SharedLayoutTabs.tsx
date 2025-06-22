import ScrollList from "./assets/scrollList.svg?react";
import Grid from "./assets/grid.svg?react";
import Pack from "./assets/pack.svg?react";
import handWeaving from "./assets/handWeaving.svg?react";
import funkyRadio from "./assets/funkyRadio.svg?react";
import Gem from "./assets/gem.svg?react";

import { motion } from "motion/react";
import { useState } from "react";

function SharedLayoutTabs() {
  const tabs = [
    {
      id: "scroll-list",
      label: "List View",
    },
    {
      id: "card-view",
      label: "Card View",
    },
    {
      id: "pack-view",
      label: "Pack View",
    },
  ];

  const iconsMap: { [key: string]: any } = {
    "card-view": Grid,
    "scroll-list": ScrollList,
    "pack-view": Pack,
  };

  const content = [
    {
      id: "209",
      icon: handWeaving,
      title: "Skilled Fingers Series",
      price: 0.855,
      currency: "ETH",
    },
    {
      id: "808",
      icon: funkyRadio,
      title: "Vibrant Vibes Series",
      price: 0.209,
      currency: "ETH",
    },
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0].id);

  const totalPrice = content.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-col text-left m-auto w-[450px] bg-white p-6 rounded-lg text-black overflow-hidden">
      {/* title */}
      <p className="mb-5">Collectibles</p>
      {/* tabs */}
      <div className="py-3 pb-7 border-b-2 border-[#ebebeb] flex gap-4 justify-between">
        {tabs.map((tab) => {
          const IconComponent = iconsMap[tab.id];
          return (
            <motion.div
              key={tab.id}
              className="flex items-center cursor-pointer bg-[#ebebeb] py-2 px-4 rounded-full transition-colors"
              onClick={() => setSelectedTab(tab.id)}
              animate={{
                backgroundColor: selectedTab === tab.id ? "#02b3ff" : "#f0f0f0",
                color: selectedTab === tab.id ? "#fff" : "#838383",
              }}
              transition={{ duration: 0.1 }}
            >
              <IconComponent className="w-6 h-6 mr-2" />
              <span className="text-sm">{tab.label}</span>
            </motion.div>
          );
        })}
      </div>
      {/* tab view */}
      {selectedTab === tabs[0].id && (
        <div className="flex flex-col gap-4 mt-6 font-medium">
          {content.map((item) => {
            const IconComponent = item.icon;
            const MotionIcon = motion(IconComponent);
            return (
              <div key={item.id} className="flex gap-4 items-center">
                <MotionIcon
                  layoutId={`${item.id}-icon`}
                  height={56}
                  width={56}
                />
                <div className="flex-1">
                  <motion.div layoutId={`${item.id}-title`}>
                    {item.title}
                  </motion.div>
                  <motion.div layoutId={`${item.id}-sub-title`}>
                    {item.price}
                    <span className="text-[#838383]">{` ${item.currency}`}</span>
                  </motion.div>
                </div>
                <motion.div
                  layoutId={`${item.id}-number`}
                  className="text-[#838383] flex items-center gap-1"
                >
                  <Gem /> <span>#{item.id}</span>
                </motion.div>
              </div>
            );
          })}
        </div>
      )}
      {selectedTab === tabs[1].id && (
        <div className="flex gap-4 mt-6 font-medium">
          {content.map((item) => {
            const IconComponent = item.icon;
            const MotionIcon = motion(IconComponent);
            return (
              <div key={item.id} className="flex-1/2 flex-col gap-4">
                <MotionIcon
                  layoutId={`${item.id}-icon`}
                  width={"100%"}
                  className="mb-4"
                />
                <div>
                  <motion.div layoutId={`${item.id}-title`}>
                    {item.title}
                  </motion.div>
                  <div className="flex">
                    <motion.div
                      layoutId={`${item.id}-sub-title`}
                      className="flex-1"
                    >
                      {item.price}
                      <span className="text-[#838383]">{` ${item.currency}`}</span>
                    </motion.div>
                    <motion.div
                      layoutId={`${item.id}-number`}
                      className="text-[#838383] flex items-center gap-1"
                    >
                      <Gem /> <span>#{item.id}</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {selectedTab === tabs[2].id && (
        <div className="flex flex-col gap-4 mt-6 font-medium h-56">
          <div className="relative">
            {content.map((item, index) => {
              const IconComponent = item.icon;
              const MotionIcon = motion(IconComponent);
              return (
                <MotionIcon
                  layoutId={`${item.id}-icon`}
                  width={100}
                  className={`absolute top-0 left-[calc(50%-50px)] ${
                    index % 2 === 0 ? "rotate-12" : "rotate-[-12deg]"
                  } rounded-lg`}
                />
              );
            })}
          </div>
          <motion.div
            className="flex flex-col items-center text-center m-34"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {`${content.length} Collectibles`}
            <span>
              {totalPrice} <span className="text-[#838383]"> ETH</span>
            </span>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default SharedLayoutTabs;
