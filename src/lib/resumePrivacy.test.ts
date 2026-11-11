import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Resume PDF privacy", () => {
  it("does not serve the resume PDF from the public directory", () => {
    expect(existsSync("public/resume/Nikhil_Alakri_Resume_CitiusTech.pdf")).toBe(false);
  });
});