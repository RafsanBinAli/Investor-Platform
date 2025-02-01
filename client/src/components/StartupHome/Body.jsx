import { useContext, useEffect, useState } from "react";
import "./Body.css";
import UserContext from "../../contexts/userContext";
import { fetchUserStartups } from "../../api/startupApi";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const managerUsername= localStorage.getItem('username')

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (managerUsername) {
        try {
          const data = await fetchUserStartups(managerUsername);
          setStartups(data);
        } catch (error) {
          console.error("Error fetching startups:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [managerUsername]);
  const handleNavigate = (tinNumber) => {
    navigate(`/startup-info/${tinNumber}`);
  };

  return (
    <div className="Body-home">
      <div className="startup-holder">
        <h3 className="startup-header-h3">My Startups</h3>

        {loading ? (
          <h4 className="loading-text">Loading...</h4>
        ) : startups.length > 0 ? (
          <div className="mystartups">
            {startups.map((startup, index) => (
              <div className="startup-card" key={index}>
                <div className="card-content">
                  <h4 className="card-title">{startup.startupName}</h4>
                  <h6 className="startup-founder">
                    Founder: {startup.startupManagerUsername}
                  </h6>
                  <h6 className="card-tin">TIN: {startup.tinNumber}</h6>
                  <button
                    className="details-button"
                    onClick={() => handleNavigate(startup.tinNumber)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h4 className="nothing-found">
            You have not uploaded any startup yet! Waiting for you to upload
            one.
          </h4>
        )}
      </div>
    </div>
  );
};

export default Body;
