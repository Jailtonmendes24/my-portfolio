import "./App.css";
import BackgroundBeamsDemo from "./components/example/background-beams-demo";
import CardHoverEffectDemo from "./components/example/card-hover-effect-demo";
import HoverBorderGradientDemo from "./components/example/hover-border-gradient-demo";
import InfiniteMovingCardsDemo from "./components/example/infinite-moving-cards-demo";

function App() {
  return (
    <div>
      <BackgroundBeamsDemo />
      {/* <HoverBorderGradientDemo /> */}
      <InfiniteMovingCardsDemo />
      <CardHoverEffectDemo />
      <HoverBorderGradientDemo />
    </div>
  );
}

export default App;
