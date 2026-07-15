import { labelStyle, selectStyle } from "./styles";
import { useLang } from "@/utils/lang";

export function SearchForm({
  fromCity,
  setFromCity,
  toCity,
  setToCity,
  date,
  setDate,
  passengers,
  setPassengers,
  onSubmit,
  cities,
  todayStr,
  t,
  lang,
  sameCityError = false,
}) {
  const { lang: currentLang } = useLang();

  return (
    <div className="step-enter">
      <h2
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
          color: "#0D0D0D",
          marginBottom: "2rem",
          letterSpacing: "-0.03em",
        }}
      >
        {t.book_where_going}
      </h2>
      <form
        onSubmit={onSubmit}
        style={{
          background: "white",
          borderRadius: "1.5rem",
          padding: "clamp(1.25rem, 4vw, 2rem)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
          border: "1px solid #E8E4DA",
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "1.25rem", marginBottom: "1.5rem" }}
        >
          <div>
            <label style={labelStyle}>{t.book_from}</label>
            <select
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              required
              style={selectStyle}
            >
              {cities.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.region})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>{t.book_to}</label>
            <select
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              required
              style={{
                ...selectStyle,
                borderColor: sameCityError ? "#E85D04" : "#E8E4DA",
              }}
            >
              {cities.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.region})
                </option>
              ))}
            </select>
            {sameCityError && (
              <div
                style={{
                  color: "#E85D04",
                  fontSize: "0.75rem",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  marginTop: "0.4rem",
                }}
              >
                ⚠{" "}
                {currentLang === "fr"
                  ? "La ville de départ et d'arrivée ne peuvent pas être identiques."
                  : "Departure and destination cannot be the same city."}
              </div>
            )}
          </div>
          <div>
            <label style={labelStyle}>{t.book_date}</label>
            <input
              type="date"
              value={date}
              min={todayStr}
              onChange={(e) => setDate(e.target.value)}
              required
              style={selectStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>{t.book_passengers}</label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              style={selectStyle}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}{" "}
                  {lang === "fr"
                    ? `Passager${n > 1 ? "s" : ""}`
                    : `Passenger${n > 1 ? "s" : ""}`}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #E85D04, #CC5500)",
            color: "white",
            border: "none",
            borderRadius: "999px",
            padding: "1.1rem",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 900,
            fontSize: "1.05rem",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(232,93,4,0.3)",
          }}
        >
          {t.book_search_btn}
        </button>
      </form>
    </div>
  );
}
