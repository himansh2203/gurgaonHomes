import "../styles/SearchBar.css";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search properties...",
}) {
  return (
    <div className="search-wrapper">
      <i className="search-icon">🔍</i>
      <input
        type="text"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
