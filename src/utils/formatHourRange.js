function formatHourRange(hour) {
  const start = new Date();
  start.setHours(hour, 0, 0, 0);

  const end = new Date(start);
  end.setHours(hour + 1);

  const label = `${to12Hour(start)} – ${to12Hour(end)}`;
  const range = `${pad(hour)}:00–${pad((hour + 1) % 24)}:00`;

  return { label, range };
}

function to12Hour(date) {
  let h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function pad(n) {
  return n.toString().padStart(2, "0");
}

function getDayPeriod(hour) {
  if (hour >= 5 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 17) return "Afternoon";
  if (hour >= 17 && hour < 21) return "Evening";
  return "Night";
}

module.exports = { formatHourRange, getDayPeriod };
