import { useContext, useEffect, useState } from "react";
import "./Body.css";
import UserContext from "../../contexts/userContext";
const Body = () => {
  const [startup, setStartup] = useState([]);
  const { managerUsername } = useContext(UserContext);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/startup/mystartups?username=${managerUsername}`
        );
        const data = await response.json();
        console.log(data.startups);
        setStartup(data.startups);
      };
      fetchData();
    } catch (error) {
      console.log("error");
    }
  }, [managerUsername]);
  return (
    <>
      <div className="Body">
        <div className="startup-holder">
          <div className="startup-header">
            <h3 className="startup-header-h3"> My Startups: </h3>{" "}
          </div>
          <div className="mystartups">
            {startup.length > 0 ? (
              startup.map((startup, index) => (
                <div className="card mb-3" key={index}>
                  <div className="row g-0">
                    <div className="col-md-4"></div>
                    <div className="col-md-8">
                      <div className="card-body d-flex flex-column">
                        <div>
                          <h4 className="card-title">{startup.startupName}</h4>
                          <h6 className="startup-founder">
                            Founder: {startup.startupManagerUsername}
                          </h6>
                          <h6 className="card-tit">{startup.tinNumber}</h6>
                          <p className="card-text">
                            <small className="text-body-secondary">
                              Last updated 3 mins ago
                            </small>
                          </p>
                          <div className="details-button ">
                            <button className="btn btn-secondary b">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h4 className="nothing-found">
                You have not uploaded any Startup yet! Waiting for you to upload
                one!
              </h4>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
