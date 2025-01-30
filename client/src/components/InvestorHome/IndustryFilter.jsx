const INDUSTRIES = ['all', 'Tech', 'Food', 'Sports', 'Others'];

const IndustryFilter = ({ selectedIndustry, onIndustryChange }) => (
  <div className="radiobuttons">
    {INDUSTRIES.map((industry) => (
      <label key={industry}>
        <input
          type="radio"
          value={industry}
          checked={selectedIndustry === industry}
          onChange={onIndustryChange}
        />
        {industry.charAt(0).toUpperCase() + industry.slice(1)}
      </label>
    ))}
  </div>
);

export default IndustryFilter;