import { describe, expect, it, vi } from "vitest";
import { formatRelativeTimeFromSeconds } from "./formatRelativeTime";

describe("formatRelativeTimeFromSeconds", () => {
  it("returns just now for less than one minute ago", () => {
    vi.setSystemTime(new Date("2026-05-25T12:00:30Z"));

    expect(formatRelativeTimeFromSeconds(1779710400)).toBe("just now");
  });

  it("formats minutes ago", () => {
    vi.setSystemTime(new Date("2026-05-25T12:05:00Z"));

    expect(formatRelativeTimeFromSeconds(1779710400)).toBe("5 minutes ago");
  });

  it("formats hours ago", () => {
    vi.setSystemTime(new Date("2026-05-25T15:00:00Z"));

    expect(formatRelativeTimeFromSeconds(1779710400)).toBe("3 hours ago");
  });

  it("formats days ago", () => {
    vi.setSystemTime(new Date("2026-05-27T12:00:00Z"));

    expect(formatRelativeTimeFromSeconds(1779710400)).toBe("2 days ago");
  });
});
