import { labelStyle, inputStyle } from "./styles";

export function PassengerDetailsForm({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  errors,
  setErrors,
  t,
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "1.25rem",
        padding: "1.5rem",
        border: "1px solid #E8E4DA",
      }}
    >
      <div
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 800,
          color: "#0D0D0D",
          marginBottom: "1.25rem",
        }}
      >
        {t.book_passenger_details}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div>
          <label style={labelStyle}>{t.book_full_name}</label>
          <input
            type="text"
            placeholder="e.g. Jean-Paul Nkwain"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value)
                setErrors((prev) => ({ ...prev, name: null }));
            }}
            style={inputStyle(errors.name)}
          />
          {errors.name && (
            <div
              style={{
                color: "#E85D04",
                fontSize: "0.75rem",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                marginTop: "0.35rem",
              }}
            >
              ⚠ {errors.name}
            </div>
          )}
        </div>
        <div>
          <label style={labelStyle}>{t.book_phone}</label>
          <input
            type="tel"
            placeholder="+237 6XX XXX XXX"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (e.target.value)
                setErrors((prev) => ({ ...prev, phone: null }));
            }}
            style={inputStyle(errors.phone)}
          />
          {errors.phone && (
            <div
              style={{
                color: "#E85D04",
                fontSize: "0.75rem",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                marginTop: "0.35rem",
              }}
            >
              ⚠ {errors.phone}
            </div>
          )}
        </div>
        <div>
          <label style={labelStyle}>{t.book_email}</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle(false)}
          />
        </div>
      </div>
    </div>
  );
}
