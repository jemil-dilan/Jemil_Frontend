import { DEPARTURES, MANIFEST } from "@/data/backofficeData";
import { CARD, ACCENT } from "./constants";
import { Badge } from "./Badge";
import { SeatMapMini } from "./SeatMapMini";
import { useLang } from "@/utils/lang";

export function ManifestsTab({ manifestDep, setManifestDep, showToast }) {
  const { t } = useLang();
  const manifestPassengers = MANIFEST.filter((m) => m.dep === manifestDep);
  const selectedDep = DEPARTURES.find((d) => d.id === manifestDep);

  const handleExportCSV = () => {
    if (!selectedDep) return;
    const header = `${t.bo_col_id},${t.bo_col_passenger},${t.bo_col_phone},${t.bo_col_seat},${t.bo_col_payment},${t.bo_col_amount},${t.bo_col_time},${t.bo_col_status}\n`;
    const rows = manifestPassengers
      .map(
        (p) =>
          `${p.id},"${p.name}",${p.phone},${p.seat},${p.pay},${p.amount},${p.time},${p.status}`,
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `manifest-${manifestDep}-${selectedDep.route.replace(/ /g, "_")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    if (!selectedDep) return;
    const printContent = `
      <html><head><title>Manifest ${manifestDep}</title>
      <style>body{font-family:sans-serif;padding:20px;} table{border-collapse:collapse;width:100%;} th,td{border:1px solid #ccc;padding:8px;text-align:left;font-size:12px;} th{background:#f0f0f0;font-weight:bold;}</style>
      </head><body>
      <h2>JEMIL — Manifest: ${selectedDep.route} ${selectedDep.dep}</h2>
      <p>Driver: ${selectedDep.driver} | Plate: ${selectedDep.plate} | Seats: ${selectedDep.sold}/${selectedDep.seats}</p>
      <table><thead><tr>
        <th>${t.bo_col_id}</th><th>${t.bo_col_passenger}</th><th>${t.bo_col_phone}</th><th>${t.bo_col_seat}</th>
        <th>${t.bo_col_payment}</th><th>${t.bo_col_amount}</th><th>${t.bo_col_time}</th><th>${t.bo_col_status}</th>
      </tr></thead><tbody>
      ${manifestPassengers.map((p) => `<tr><td>${p.id}</td><td>${p.name}</td><td>${p.phone}</td><td>${p.seat}</td><td>${p.pay}</td><td>${p.amount.toLocaleString()}</td><td>${p.time}</td><td>${p.status}</td></tr>`).join("")}
      </tbody></table></body></html>`;
    const win = window.open("", "_blank");
    win.document.write(printContent);
    win.document.close();
    win.print();
  };

  const colHeaders = [
    t.bo_col_id,
    t.bo_col_passenger,
    t.bo_col_phone,
    t.bo_col_seat,
    t.bo_col_payment,
    t.bo_col_amount,
    t.bo_col_time,
    t.bo_col_status,
  ];

  const depFields = selectedDep
    ? [
        [t.bo_col_route, selectedDep.route],
        [t.bo_col_dep, selectedDep.dep],
        ["→", selectedDep.arr],
        [t.bo_col_driver, selectedDep.driver],
        [t.bo_col_id, selectedDep.plate],
        [t.bo_col_seats, `${selectedDep.sold}/${selectedDep.seats}`],
        [t.bo_col_class, selectedDep.cls],
      ]
    : [];

  return (
    <>
      {/* Departure selector */}
      <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
        {DEPARTURES.map((d) => (
          <button
            key={d.id}
            onClick={() => setManifestDep(d.id)}
            style={{
              fontWeight: 700,
              fontSize: ".7rem",
              color: manifestDep === d.id ? "#FAF8F3" : "rgba(245,241,232,.4)",
              background:
                manifestDep === d.id
                  ? "rgba(232,93,4,.18)"
                  : "rgba(245,241,232,.05)",
              border: `1.5px solid ${manifestDep === d.id ? "rgba(232,93,4,.4)" : "rgba(245,241,232,.09)"}`,
              borderRadius: "999px",
              padding: ".38rem .85rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {d.id} · {d.route} · {d.dep}
          </button>
        ))}
      </div>

      {/* Trip card */}
      {selectedDep && (
        <div
          style={{
            background: CARD,
            borderRadius: "1.1rem",
            padding: "1.25rem",
            border: "1px solid rgba(232,93,4,.2)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            {depFields.map(([k, v]) => (
              <div key={k}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: ".57rem",
                    color: "rgba(245,241,232,.3)",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    marginBottom: ".18rem",
                  }}
                >
                  {k}
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: ".88rem",
                    color: "#FAF8F3",
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center" }}>
              <Badge label={selectedDep.status} />
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(245,241,232,.07)",
              paddingTop: ".875rem",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: ".58rem",
                color: "rgba(245,241,232,.3)",
                textTransform: "uppercase",
                letterSpacing: ".1em",
                marginBottom: ".5rem",
              }}
            >
              {t.bo_seat_map}
            </div>
            <SeatMapMini sold={selectedDep.sold} total={selectedDep.seats} />
            <div
              style={{ display: "flex", gap: ".75rem", marginTop: ".45rem" }}
            >
              {[
                ["#E85D04", t.bo_sold],
                ["rgba(245,241,232,.12)", t.bo_mani_available],
              ].map(([c, l]) => (
                <div
                  key={l}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".25rem",
                  }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 2,
                      background: c,
                    }}
                  />
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: ".58rem",
                      color: "rgba(245,241,232,.32)",
                    }}
                  >
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Manifest table */}
      <div
        style={{
          background: CARD,
          borderRadius: "1.1rem",
          border: "1px solid rgba(245,241,232,.07)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: ".875rem 1.4rem",
            borderBottom: "1px solid rgba(245,241,232,.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: ".5rem",
          }}
        >
          <span
            style={{ fontWeight: 800, fontSize: ".88rem", color: "#FAF8F3" }}
          >
            {t.bo_passengers(manifestPassengers.length)}
          </span>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <button
              onClick={handleExportCSV}
              style={{
                fontWeight: 700,
                fontSize: ".68rem",
                color: "rgba(245,241,232,.55)",
                background: "rgba(245,241,232,.05)",
                border: "1px solid rgba(245,241,232,.09)",
                borderRadius: "999px",
                padding: ".28rem .75rem",
                cursor: "pointer",
              }}
            >
              {t.bo_export_csv}
            </button>
            <button
              onClick={handlePrint}
              style={{
                fontWeight: 700,
                fontSize: ".68rem",
                color: "rgba(245,241,232,.55)",
                background: "rgba(245,241,232,.05)",
                border: "1px solid rgba(245,241,232,.09)",
                borderRadius: "999px",
                padding: ".28rem .75rem",
                cursor: "pointer",
              }}
            >
              {t.bo_print_pdf}
            </button>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(245,241,232,.06)" }}>
                {colHeaders.map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: ".6rem 1rem",
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
              {manifestPassengers.map((p) => (
                <tr
                  key={p.id}
                  style={{ borderBottom: "1px solid rgba(245,241,232,.04)" }}
                >
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 700,
                      fontSize: ".75rem",
                      color: ACCENT,
                    }}
                  >
                    {p.id}
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 800,
                      fontSize: ".82rem",
                      color: "#FAF8F3",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.name}
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 600,
                      fontSize: ".73rem",
                      color: "rgba(245,241,232,.48)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.phone}
                  </td>
                  <td style={{ padding: ".7rem 1rem" }}>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: ".78rem",
                        color: "#FAF8F3",
                        background: "rgba(232,93,4,.12)",
                        border: "1px solid rgba(232,93,4,.22)",
                        borderRadius: ".5rem",
                        padding: ".18rem .5rem",
                      }}
                    >
                      {p.seat}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 600,
                      fontSize: ".73rem",
                      color: "rgba(245,241,232,.52)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.pay}
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 900,
                      fontSize: ".82rem",
                      color: "#4ADE80",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.amount.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: ".7rem 1rem",
                      fontWeight: 600,
                      fontSize: ".73rem",
                      color: "rgba(245,241,232,.38)",
                    }}
                  >
                    {p.time}
                  </td>
                  <td style={{ padding: ".7rem 1rem" }}>
                    <Badge label={p.status} />
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
