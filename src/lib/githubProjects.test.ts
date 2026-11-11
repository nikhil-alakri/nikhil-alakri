import { describe, expect, it } from "vitest";
import { projectFromRepo, safeWebUrl, type Repo } from "./githubProjects";

const repo: Repo = { name: "ipo", description: "", language: "TypeScript", topics: [], url: "https://github.com/nikhil-alakri/ipo", homepage: "https://ipo-data.vercel.app/", updated: "2024-06-01", fork: false, archived: false };
describe("Real GitHub project catalogue", () => {
  it("uses the published GitHub demo and real case study description", () => {
    const project = projectFromRepo(repo);
    expect(project.homepage).toBe("https://ipo-data.vercel.app/");
    expect(project.slug).toBe("ipo");
    expect(project.skills).toContain("React");
  });
  it("never invents a live demo for repositories without one", () => {
    expect(projectFromRepo({ ...repo, name: "flight-search", url: "https://github.com/nikhil-alakri/flight-search", homepage: null }).homepage).toBeNull();
  });
  it("preserves GitHub descriptions rather than replacing them", () => {
    expect(projectFromRepo({ ...repo, description: "Repository author's description" }).description).toBe("Repository author's description");
  });
  it("rejects unsafe demo links", () => {
    expect(safeWebUrl("javascript:alert(1)")).toBeNull();
    expect(safeWebUrl("not a URL")).toBeNull();
  });
  it("includes archived and forked repositories with their provenance", () => {
    const project = projectFromRepo({ ...repo, archived: true, fork: true });
    expect(project.archived).toBe(true);
    expect(project.fork).toBe(true);
  });
});