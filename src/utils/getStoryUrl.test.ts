import { describe, expect, it } from "vitest";
import { getStoryUrl } from "./getStoryUrl";

describe("getStoryUrl", () => {
  it("returns the original URL when available", () => {
    expect(getStoryUrl("https://example.com/article", "123")).toBe(
      "https://example.com/article",
    );
  });

  it("returns the Hacker News discussion URL when original URL is missing", () => {
    expect(getStoryUrl(null, "123")).toBe(
      "https://news.ycombinator.com/item?id=123",
    );
  });
});
