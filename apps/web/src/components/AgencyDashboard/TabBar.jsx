export function TabBar({ tabs, activeTab, onTabChange }) {
  return (
    <div
      style={{
        display: "flex",
        gap: ".25rem",
        marginTop: "1.25rem",
        overflowX: "auto",
      }}
    >
      {tabs.map(function (t) {
        var active = activeTab === t.id;
        return (
          <button
            key={t.id}
            onClick={function () {
              onTabChange(t.id);
            }}
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontWeight: 700,
              fontSize: ".8rem",
              color: active ? "#FAF8F3" : "rgba(245,241,232,.45)",
              background: active ? "rgba(232,93,4,.18)" : "transparent",
              border: active
                ? "1px solid rgba(232,93,4,.35)"
                : "1px solid transparent",
              borderRadius: "999px",
              padding: ".5rem 1rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all .18s",
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
