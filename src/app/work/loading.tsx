export default function WorkLoading() {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--text" style={{ width: "70%" }} />
      </div>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton" style={{ width: "80px", height: "36px", borderRadius: "50px" }} />
        ))}
      </div>
      <div className="gallery__grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton skeleton--card" />
        ))}
      </div>
    </div>
  );
}
