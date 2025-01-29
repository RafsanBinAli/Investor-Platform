import StartupBody from "./StartupInfoBody/startupBody";
import StartupPortfolio from "./StartupPortfolio/StartupPortfolio";
import "./StartupShow.css";

const StartupShow = () => {
  return (
    <>
      <div className="startup">
        <StartupPortfolio />
        <StartupBody />
      </div>
    </>
  );
};

export default StartupShow;
