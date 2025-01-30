import StartupCard from './StartupCard';

const StartupList = ({ startups, onViewDetails }) => {
  if (startups.length === 0) {
    return <h4 className="nothing-found">No startups found</h4>;
  }

  return (
    <div className="card-holder">
      {startups.map((startup, index) => (
        <StartupCard
          key={startup.tinNumber || index}
          startup={startup}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default StartupList;