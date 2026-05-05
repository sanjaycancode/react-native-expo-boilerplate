const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

type RelativeUnit = {
  threshold: number;
  divisor: number;
  suffix: string;
};

const UNITS: RelativeUnit[] = [
  { threshold: YEAR, divisor: YEAR, suffix: "yr" },
  { threshold: MONTH, divisor: MONTH, suffix: "mo" },
  { threshold: DAY, divisor: DAY, suffix: "day" },
  { threshold: HOUR, divisor: HOUR, suffix: "hr" },
  { threshold: MINUTE, divisor: MINUTE, suffix: "min" },
  { threshold: SECOND, divisor: SECOND, suffix: "sec" },
];

function pluralize(value: number, suffix: string) {
  if (value === 1) {
    return suffix;
  }

  if (suffix === "day") {
    return "days";
  }

  return `${suffix}s`;
}

export function formatTimeAgo(value?: string | null, now = Date.now()) {
  if (!value) {
    return "Just now";
  }

  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return "Just now";
  }

  const lower = trimmed.toLowerCase();
  if (lower.includes("ago")) {
    return trimmed;
  }

  const parsed = Date.parse(trimmed);
  if (Number.isNaN(parsed)) {
    return trimmed;
  }

  const diffSeconds = Math.max(0, Math.floor((now - parsed) / 1000));
  if (diffSeconds < 5) {
    return "Just now";
  }

  for (const unit of UNITS) {
    if (diffSeconds >= unit.threshold) {
      const valueCount = Math.floor(diffSeconds / unit.divisor);
      return `${valueCount} ${pluralize(valueCount, unit.suffix)} ago`;
    }
  }

  return "Just now";
}
