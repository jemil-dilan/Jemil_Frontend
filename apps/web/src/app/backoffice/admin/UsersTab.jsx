import { useState } from "react";
import { USERS_RECENT } from "@/data/backofficeData";
import { Badge } from "./Badge";
import { ACCENT, GREEN, CARD } from "./constants";

export function UsersTab({ showToast }) {
  const [users, setUsers] = useState(USERS_RECENT);

  function handleBlock(id, name) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Flagged" } : u)),
    );
    showToast(`⊘ ${name} account blocked`, "warning");
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: ".75rem",
        }}
      >
        <h2 style={{ fontWeight: 900, fontSize: "1.15rem", color: "#FAF8F3" }}>
          User Management
        </h2>
        <div style={{ display: "flex", gap: ".5rem" }}>
          {[
            ["14,820 Total", "#FAF8F3"],
            ["620 New this month", GREEN],
            ["5 Diaspora", "#A78BFA"],
            ["1 Flagged", "#F87171"],
          ].map(([l, c]) => (
            <span
              key={l}
              style={{
                fontWeight: 700,
                fontSize: ".67rem",
                color: c,
                background: "rgba(245,241,232,.05)",
                border: "1px solid rgba(245,241,232,.09)",
                borderRadius: "999px",
                padding: ".28rem .75rem",
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
      <div
        style={{
          background: CARD,
          borderRadius: "1.1rem",
          border: "1px solid rgba(245,241,232,.07)",
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(245,241,232,.06)" }}>
                {[
                  "ID",
                  "Name",
                  "Phone",
                  "Tickets",
                  "Total Spend",
                  "Joined",
                  "Type",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: ".65rem 1rem",
                      textAlign: "left",
                      fontWeight: 700,
                      fontSize: ".57rem",
                      color: "rgba(245,241,232,.28)",
                      textTransform: "uppercase",
                      letterSpacing: ".1em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  style={{ borderBottom: "1px solid rgba(245,241,232,.04)" }}
                >
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 700,
                      fontSize: ".73rem",
                      color: ACCENT,
                    }}
                  >
                    {u.id}
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 800,
                      fontSize: ".85rem",
                      color: "#FAF8F3",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {u.name}
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 600,
                      fontSize: ".73rem",
                      color: "rgba(245,241,232,.45)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {u.phone}
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 700,
                      fontSize: ".8rem",
                      color: ACCENT,
                    }}
                  >
                    {u.tickets}
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 800,
                      fontSize: ".8rem",
                      color: GREEN,
                    }}
                  >
                    {u.spend.toLocaleString()} XAF
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 600,
                      fontSize: ".72rem",
                      color: "rgba(245,241,232,.38)",
                    }}
                  >
                    {u.joined}
                  </td>
                  <td style={{ padding: ".7rem 1rem" }}>
                    <Badge label={u.type} />
                  </td>
                  <td style={{ padding: ".7rem 1rem" }}>
                    <Badge label={u.status} />
                  </td>
                  <td style={{ padding: ".7rem 1rem" }}>
                    <div style={{ display: "flex", gap: ".35rem" }}>
                      <button
                        onClick={() =>
                          showToast(
                            `👤 Viewing profile: ${u.name} · ${u.tickets} trips · ${u.spend.toLocaleString()} XAF`,
                            "info",
                          )
                        }
                        style={{
                          fontWeight: 700,
                          fontSize: ".65rem",
                          color: "rgba(245,241,232,.5)",
                          background: "rgba(245,241,232,.04)",
                          border: "1px solid rgba(245,241,232,.08)",
                          borderRadius: "999px",
                          padding: ".2rem .55rem",
                          cursor: "pointer",
                        }}
                      >
                        View
                      </button>
                      {u.status === "Flagged" && (
                        <button
                          onClick={() => handleBlock(u.id, u.name)}
                          style={{
                            fontWeight: 700,
                            fontSize: ".65rem",
                            color: "#F87171",
                            background: "rgba(239,68,68,.07)",
                            border: "1px solid rgba(239,68,68,.18)",
                            borderRadius: "999px",
                            padding: ".2rem .55rem",
                            cursor: "pointer",
                          }}
                        >
                          ⊘ Block
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
