import { describe, expect, it } from "vitest";
import { projectsForSkills } from "./skillMatch";

describe("projectsForSkills", () => {
  it("Healthcare surfaces the CitiusTech healthcare platform", () => {
    expect(projectsForSkills(["Healthcare"]).map(r => r.study.slug)).toEqual(["healthcare-ui-platform"]);
  });
  it("AI & RAG surfaces odin-eye", () => {
    expect(projectsForSkills(["AI & RAG"])[0].study.slug).toBe("odin-eye");
  });
  it("ranks projects matching more selected skills first", () => {
    const res = projectsForSkills(["Healthcare", "Accessibility", "Design systems"]);
    expect(res[0].study.slug).toBe("healthcare-ui-platform");
    expect(res[0].hits).toHaveLength(3);
  });
  it("returns nothing when no skill is selected", () => {
    expect(projectsForSkills([])).toEqual([]);
  });
});
