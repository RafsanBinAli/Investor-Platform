import "./RightBar.css";
import BarChart from "./BarChart";
import { useState, useEffect } from "react";

const RightBar = ({ onSearch }) => {
  const [chartData, setChartData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = () => {
    onSearch(searchInput);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bar`);

      if (!response.ok) {
        console.log("error fetching data");
      }
      const data = await response.json();
      setChartData(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="rightbar">
        <div className="rightbar-inside">
          <div className="container mt-3">
            <div className="Search-Header">
              <h1 className="header"> Search Here to invest! </h1>
            </div>
            {/* Search Input Group */}
            <div className="input-group mb-3 ml-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search By Name"
                aria-label="Search"
                aria-describedby="basic-addon2"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text"
                  id="basic-addon2"
                  onClick={handleSubmit}
                >
                  <i className="fas fa-search"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="chart">
            <h1 className="chartHeader">Field Count Bar Chart</h1>
            <BarChart data={chartData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RightBar;
