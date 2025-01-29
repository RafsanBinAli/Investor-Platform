import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="top">
        <div className="Home-main">
          <div className="lekha">
            <div className="Home-heading">
              <h1 className="header">Investment Plateform</h1>
            </div>
            <div className="More-heading">
              Left till here away at to whom past. Feelings laughing at no
              wondered repeated provided finished. It acceptance thoroughly my
              advantages everything as. Are projecting inquietude affronting
              preference saw who. Marry of am do avoid ample as. Old disposal
              followed she ignorant desirous two has. Called played entire
              roused though for one too. He into walk roof made tall cold he.
              Feelings way likewise addition wandered contempt bed indulged.{" "}
            </div>
          </div>
          <div className="background-image" />
          <div className="join">
            <h1 className="join-header"> Join Our Site as</h1>
            <div className="button">
              <Link to="/login">
                <button className="join-button">Investor</button>{" "}
              </Link>

              <Link to="/startup/login">
                <button className="join-button">StartUp Manager</button>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
