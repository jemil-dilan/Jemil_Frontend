import { useLang } from "@/utils/lang";

export function QuickSeatPicker({ onSelect, selected }) {
  const { t } = useLang();
  const booked = [3, 7, 11, 15, 19];
  const btnStyle = (n) => {
    const taken = booked.includes(n);
    const sel = selected === n;
    return {
      width: 30,
      height: 30,
      borderRadius: "5px 5px 3px 3px",
      border: "none",
      cursor: taken ? "not-allowed" : "pointer",
      background: sel
        ? "#E85D04"
        : taken
          ? "rgba(245,241,232,.15)"
          : "rgba(245,241,232,.12)",
      color: sel
        ? "white"
        : taken
          ? "rgba(245,241,232,.2)"
          : "rgba(245,241,232,.7)",
      fontFamily: "Montserrat,sans-serif",
      fontWeight: 800,
      fontSize: ".65rem",
      boxShadow: sel ? "0 0 12px rgba(232,93,4,.5)" : "none",
      transition: "all .15s",
    };
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "rgba(232,93,4,.15)",
            border: "1px solid rgba(232,93,4,.3)",
            borderRadius: 6,
            padding: "4px 16px",
            fontFamily: "Montserrat,sans-serif",
            fontWeight: 700,
            fontSize: ".65rem",
            color: "#E85D04",
            letterSpacing: ".1em",
            marginBottom: 6,
          }}
        >
          {t.modal_driver_label}
        </div>
        {[0, 1, 2, 3, 4].map((row) => (
          <div
            key={row}
            style={{ display: "flex", gap: 5, alignItems: "center" }}
          >
            {[0, 1].map((col) => {
              const n = row * 4 + col + 1;
              return (
                <button
                  key={col}
                  disabled={booked.includes(n)}
                  onClick={() => onSelect(selected === n ? null : n)}
                  style={btnStyle(n)}
                >
                  {n}
                </button>
              );
            })}
            <div style={{ width: 18 }} />
            {[2, 3].map((col) => {
              const n = row * 4 + col + 1;
              return (
                <button
                  key={col}
                  disabled={booked.includes(n)}
                  onClick={() => onSelect(selected === n ? null : n)}
                  style={btnStyle(n)}
                >
                  {n}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.25rem",
          marginTop: "1rem",
          fontFamily: "Montserrat,sans-serif",
          fontSize: ".65rem",
          color: "rgba(245,241,232,.4)",
        }}
      >
        {[
          [" rgba(245,241,232,.12)", t.modal_seat_available],
          ["#E85D04", t.modal_seat_selected],
          ["rgba(245,241,232,.06)", t.modal_seat_taken],
        ].map(([bg, label]) => (
          <div
            key={label}
            style={{ display: "flex", alignItems: "center", gap: 4 }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                background: bg,
                borderRadius: 3,
                border: "1px solid rgba(245,241,232,.12)",
              }}
            />{" "}
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
