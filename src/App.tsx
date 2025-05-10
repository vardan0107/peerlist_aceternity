import "./App.css";
import FluidMenu from "./FluidMenu";

function App() {
  return (
    <>
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
      <div className="absolute">
        <FluidMenu />
      </div>
      <h1 className="place-self-center m-auto">Fluid Menu Animation</h1>
    </>
  );
}

export default App;
