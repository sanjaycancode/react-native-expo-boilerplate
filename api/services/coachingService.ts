import { apiClient } from "@/api/client";

export type CoachingTeacher = {
  id?: string | number | null;
  display_name?: string | null;
  bio?: string | null;
};

type GetCoachingTeachersResponse = {
  success?: boolean;
  data?: CoachingTeacher[];
  meta?: unknown;
};

function toNumberOrNull(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

export async function getCoachingTeachers(): Promise<CoachingTeacher[]> {
  const response = await apiClient.get<
    GetCoachingTeachersResponse | CoachingTeacher[]
  >("/coaching/teachers");

  const payload = response.data;
  if (Array.isArray(payload)) return payload;
  return payload.data ?? [];
}

export type TeacherOffering = {
  id?: string | number | null;
  title?: string | null;
  description?: string | null;
  price?: number | null;
  duration_minutes?: number | null;
  amount?: number | null;
  currency?: string | null;
};

type GetTeacherOfferingsResponse = {
  success?: boolean;
  data?: TeacherOffering[];
  meta?: unknown;
};

type GetTeacherOfferingsAltResponse = {
  success?: boolean;
  data?: {
    offerings?: TeacherOffering[];
  } | null;
  meta?: unknown;
};

function normalizeOffering(offering: TeacherOffering): TeacherOffering {
  const raw = offering as unknown as Record<string, unknown>;
  const rawCurrency = raw.currency;
  const rawAmount = raw.amount;

  const rawPrice =
    raw.price ??
    raw.price_per_session ??
    raw.session_price ??
    (typeof rawAmount === "number" ? rawAmount : undefined);
  const rawDuration =
    raw.duration_minutes ?? raw.duration ?? raw.durationMinutes ?? raw.duration_in_minutes;

  const currency =
    typeof rawCurrency === "string" && rawCurrency.trim() !== ""
      ? rawCurrency.trim().toLowerCase()
      : null;

  const amountNumber = toNumberOrNull(rawAmount);
  const priceNumber = toNumberOrNull(rawPrice);

  const normalizedPrice =
    priceNumber != null && rawAmount != null && raw.price == null
      ? currency === "usd" && Number.isInteger(priceNumber)
        ? priceNumber / 100
        : priceNumber
      : priceNumber;
  return {
    ...offering,
    amount: amountNumber,
    currency,
    price: normalizedPrice,
    duration_minutes: toNumberOrNull(rawDuration),
  };
}

export async function getTeacherOfferings(
  teacherId: string | number,
): Promise<TeacherOffering[]> {
  const response = await apiClient.get<
    GetTeacherOfferingsResponse | GetTeacherOfferingsAltResponse | TeacherOffering[]
  >(`/coaching/teachers/${teacherId}/offerings`);

  const payload = response.data;
  if (Array.isArray(payload)) return payload.map(normalizeOffering);
  if (Array.isArray(payload.data)) return payload.data.map(normalizeOffering);
  const alt = payload as GetTeacherOfferingsAltResponse;
  if (Array.isArray(alt.data?.offerings)) {
    return alt.data.offerings.map(normalizeOffering);
  }
  return [];
}
