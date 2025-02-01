import Body from "../components/StartupHome/Body";
import Profile from "../components/StartupHome/Profile";

const StartupHome = () => {
  return (
    <>
      <div
        className="startup"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <Profile />
        <Body />
      </div>
    </>
  );
};

export default StartupHome;
