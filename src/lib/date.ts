export function formatDate(input: Date, locale = "zh-CN") {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(input);
}

export function yearMonthKey(input: Date) {
  const y = input.getFullYear();
  const m = String(input.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}
