import Body from "./Body";
import Profile from "./Profile";
import "./StartupHome.css";

const StartupHome = () => {
  return (
    <>
      <div className="startup">
        <Profile />
        <Body />
      </div>
    </>
  );
};

export default StartupHome;
