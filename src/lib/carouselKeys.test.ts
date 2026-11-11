import { describe, expect, it } from "vitest";
import { carouselKeyTarget } from "./carouselKeys";

describe("carouselKeyTarget", () => {
  it("ArrowRight moves to the next project and wraps at the end", () => {
    expect(carouselKeyTarget("ArrowRight", 1, 5)).toBe(2);
    expect(carouselKeyTarget("ArrowRight", 4, 5)).toBe(0);
  });
  it("ArrowLeft moves to the previous project and wraps at the start", () => {
    expect(carouselKeyTarget("ArrowLeft", 0, 5)).toBe(4);
  });
  it("Home and End jump to the first and last project", () => {
    expect(carouselKeyTarget("Home", 3, 5)).toBe(0);
    expect(carouselKeyTarget("End", 0, 5)).toBe(4);
  });
  it("ignores unrelated keys", () => {
    expect(carouselKeyTarget("Tab", 2, 5)).toBeNull();
  });
});
