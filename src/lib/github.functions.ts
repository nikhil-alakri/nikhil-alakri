import { createServerFn } from "@tanstack/react-start";

export const listGithubProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { getRepositoryCatalogue } = await import("./github.server");
  const { projectFromRepo } = await import("./githubProjects");
  const result = await getRepositoryCatalogue();
  return { ...result, repos: result.repos.map(projectFromRepo) };
});