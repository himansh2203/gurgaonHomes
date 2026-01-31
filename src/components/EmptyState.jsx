export default function EmptyState({ onExplore }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">🔍</div>
      <h3 className="empty-title">No properties found</h3>
      <p className="empty-subtitle">Try adjusting your search terms</p>
      <button className="explore-btn" onClick={onExplore}>
        Explore All Properties
      </button>
    </div>
  );
}
