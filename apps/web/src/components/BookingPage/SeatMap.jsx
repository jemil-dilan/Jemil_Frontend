import { useState } from "react";
import { BOOKED_SEATS } from "@/data/bookingData";

export function SeatMap({ busId, onSelect, selected }) {
  const totalSeats = 40;
  const rows = Math.ceil(totalSeats / 4);
  const [bouncing, setBouncing] = useState(null);

  const handleSelect = (seat) => {
    if (BOOKED_SEATS.includes(seat)) return;
    const next = selected === seat ? null : seat;
    if (next) setBouncing(next);
    setTimeout(() => setBouncing(null), 450);
    onSelect(next);
  };

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            background: "#0D0D0D",
            color: "#FAF8F3",
            borderRadius: "0.5rem",
            padding: "0.4rem 1.5rem",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}
        >
          DRIVER
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          alignItems: "center",
        }}
      >
        {Array.from({ length: rows }).map((_, row) => (
          <div
            key={row}
            style={{ display: "flex", gap: "6px", alignItems: "center" }}
          >
            {[0, 1].map((col) => {
              const seatNum = row * 4 + col + 1;
              if (seatNum > totalSeats) return null;
              const isBooked = BOOKED_SEATS.includes(seatNum);
              const isSelected = selected === seatNum;
              const isBouncing = bouncing === seatNum;
              return (
                <button
                  key={col}
                  disabled={isBooked}
                  onClick={() => handleSelect(seatNum)}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "6px 6px 3px 3px",
                    border: "none",
                    background: isSelected
                      ? "#E85D04"
                      : isBooked
                        ? "#E8E4DA"
                        : "white",
                    color: isSelected ? "white" : isBooked ? "#BBB" : "#0D0D0D",
                    fontWeight: 800,
                    fontSize: "0.7rem",
                    cursor: isBooked ? "not-allowed" : "pointer",
                    boxShadow: isSelected
                      ? "0 2px 8px rgba(232,93,4,0.4)"
                      : "0 1px 4px rgba(0,0,0,0.1)",
                    transform: isBouncing ? "scale(1.25)" : "scale(1)",
                    transition: "all 0.15s",
                  }}
                >
                  {seatNum}
                </button>
              );
            })}
            <div
              style={{
                width: "20px",
                textAlign: "center",
                fontSize: "0.6rem",
                color: "#CCC",
              }}
            >
              {row + 1}
            </div>
            {[2, 3].map((col) => {
              const seatNum = row * 4 + col + 1;
              if (seatNum > totalSeats) return null;
              const isBooked = BOOKED_SEATS.includes(seatNum);
              const isSelected = selected === seatNum;
              const isBouncing = bouncing === seatNum;
              return (
                <button
                  key={col}
                  disabled={isBooked}
                  onClick={() => handleSelect(seatNum)}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "6px 6px 3px 3px",
                    border: "none",
                    background: isSelected
                      ? "#E85D04"
                      : isBooked
                        ? "#E8E4DA"
                        : "white",
                    color: isSelected ? "white" : isBooked ? "#BBB" : "#0D0D0D",
                    fontWeight: 800,
                    fontSize: "0.7rem",
                    cursor: isBooked ? "not-allowed" : "pointer",
                    boxShadow: isSelected
                      ? "0 2px 8px rgba(232,93,4,0.4)"
                      : "0 1px 4px rgba(0,0,0,0.1)",
                    transform: isBouncing ? "scale(1.25)" : "scale(1)",
                    transition: "all 0.15s",
                  }}
                >
                  {seatNum}
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
          gap: "1.5rem",
          marginTop: "1.5rem",
          fontSize: "0.7rem",
          color: "#666",
        }}
      >
        {[
          ["white", "Available"],
          ["E85D04", "Selected"],
          ["E8E4DA", "Taken"],
        ].map(([bg, label]) => (
          <div
            key={label}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                background: `#${bg}`,
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
