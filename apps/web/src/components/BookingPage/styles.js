export const labelStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 700,
  fontSize: "0.7rem",
  color: "#666",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  display: "block",
  marginBottom: "0.4rem",
};

export const selectStyle = {
  width: "100%",
  border: "2px solid #E8E4DA",
  borderRadius: "0.875rem",
  padding: "0.875rem 1rem",
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 700,
  fontSize: "1rem",
  outline: "none",
  background: "white",
  cursor: "pointer",
  boxSizing: "border-box",
};

export const inputStyle = (hasError) => ({
  width: "100%",
  border: `2px solid ${hasError ? "#E85D04" : "#E8E4DA"}`,
  borderRadius: "0.75rem",
  padding: "0.75rem 1rem",
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 600,
  outline: "none",
  fontSize: "0.95rem",
  boxSizing: "border-box",
  background: hasError ? "#FFF5E8" : "white",
});
