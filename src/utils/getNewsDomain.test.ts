import { describe, expect, it } from "vitest";
import { getNewsDomain } from "./getNewsDomain";

describe("getNewsDomain", () => {
  it("returns a clean domain from a valid URL", () => {
    expect(getNewsDomain("https://www.github.com/user/repo")).toBe(
      "github.com",
    );
  });

  it("returns the domain without changing non-www domains", () => {
    expect(getNewsDomain("https://news.ycombinator.com/item?id=123")).toBe(
      "news.ycombinator.com",
    );
  });

  it("returns Hacker News domain when URL is missing", () => {
    expect(getNewsDomain(null)).toBe("news.ycombinator.com");
  });

  it("returns Hacker News domain when URL is invalid", () => {
    expect(getNewsDomain("not-a-url")).toBe("news.ycombinator.com");
  });
});
