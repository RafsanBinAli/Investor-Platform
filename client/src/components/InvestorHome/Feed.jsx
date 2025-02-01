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
    if (!startupName) return startupData;

    const filteredByName = startupData.filter(
      startup => startup.startupName.toLowerCase() === startupName.toLowerCase()
    );

    return selectedIndustry === 'all'
      ? filteredByName
      : filteredByName.filter(startup => startup.industry === selectedIndustry);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="feed">
      <div className="feed-header">
        <h1 className="feed-header-h1">Suggested Investments</h1>
        <IndustryFilter
          selectedIndustry={selectedIndustry}
          onIndustryChange={handleIndustryChange}
        />
      </div>
      <StartupList
        startups={getFilteredStartups()}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
};

export default Feed;