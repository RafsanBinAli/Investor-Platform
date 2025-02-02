import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IndustryFilter from './IndustryFilter';
import StartupList from './StartupList';
import { useStartupData } from '../../hooks/useStartupData';
import './Feed.css';

const Feed = ({ startupName }) => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const navigate = useNavigate();
  const { startupData, isLoading, error } = useStartupData();

  const handleIndustryChange = (event) => {
    setSelectedIndustry(event.target.value);
  };

  const handleViewDetails = (tinNumber) => {
    navigate(`/startup-info/${tinNumber}`);
  };

  const getFilteredStartups = () => {
    let filteredStartups = [...startupData];

    // First filter by name if a search term exists
    if (startupName) {
      filteredStartups = filteredStartups.filter(startup => 
        startup.startupName.toLowerCase().includes(startupName.toLowerCase())
      );
    }

    // Then filter by industry if not 'all'
    if (selectedIndustry !== 'all') {
      filteredStartups = filteredStartups.filter(startup => 
        startup.industry === selectedIndustry
      );
    }

    return filteredStartups;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredStartups = getFilteredStartups();

  return (
    <div className="feed">
      <div className="feed-header">
        <h1 className="feed-header-h1">Suggested Investments</h1>
        <IndustryFilter
          selectedIndustry={selectedIndustry}
          onIndustryChange={handleIndustryChange}
        />
      </div>
      {filteredStartups.length === 0 ? (
        <div className="no-results">No startups found matching your criteria</div>
      ) : (
        <StartupList
          startups={filteredStartups}
          onViewDetails={handleViewDetails}
        />
      )}
    </div>
  );
};

export default Feed;