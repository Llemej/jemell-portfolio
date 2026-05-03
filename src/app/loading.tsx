export default function HomeLoading() {
  return (
    <div className="page-container" style={{ paddingTop: "4rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div className="skeleton skeleton--title" style={{ margin: "0 auto 1rem", width: "40%" }} />
        <div className="skeleton skeleton--text" style={{ margin: "0 auto", width: "60%" }} />
      </div>
      <div className="featured-grid">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton skeleton--card" />
        ))}
      </div>
    </div>
  );
}
