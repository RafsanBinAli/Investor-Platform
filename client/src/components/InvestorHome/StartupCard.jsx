import { useState } from 'react';
import './StartupCard.css';

const StartupCard = ({ startup, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onViewDetails(startup.tinNumber);
  };

  return (
    <div 
      className={`startup-card ${isHovered ? 'hovered' : ''} ${isAnimating ? 'clicked' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onAnimationEnd={() => setIsAnimating(false)}
    >
      <div className="startup-card-inner">
        <div className="startup-card-content">
          <h4 className="startup-title">{startup.startupName}</h4>
          <h6 className="startup-founder">
            Founder: {startup.startupManagerUsername}
          </h6>
          <h6 className="startup-tin">{startup.tinNumber}</h6>
          
          <div className="startup-info">
            <span className="startup-industry">
              {startup.industry || 'Technology'}
            </span>
            <span className="startup-location">
              {startup.location || 'Local'}
            </span>
          </div>

          <p className="startup-update">
            <small>Last updated 3 mins ago</small>
          </p>
          
          <button
            className="details-button"
            onClick={handleClick}
          >
            View Details
            <span className="button-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartupCard;