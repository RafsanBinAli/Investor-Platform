import './NothingFound.css';

const NothingFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">
          <div className="search-circle"></div>
          <div className="search-line"></div>
          <div className="cross-left"></div>
          <div className="cross-right"></div>
        </div>
        <h2 className="not-found-title">The Feature is Coming Soon...</h2>
        <p className="not-found-message">
          We're working hard on something amazing!<br />
          Check back soon for exciting updates.
        </p>
      </div>
    </div>
  );
};

export default NothingFound;