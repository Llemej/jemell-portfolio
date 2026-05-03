export default function LogsLoading() {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--text" style={{ width: "65%" }} />
      </div>
      <div className="logs-list">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton" style={{ height: "100px" }} />
        ))}
      </div>
    </div>
  );
}
