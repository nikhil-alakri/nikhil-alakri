import { createServerFn } from "@tanstack/react-start";
import type { MatchResult } from "./matcher.server";

export type MatchResponse = { ok: true; result: MatchResult } | { ok: false; error: string };

export const recommendWork = createServerFn({ method: "POST" })
  .inputValidator((input: { need: string }) => {
    const need = String(input?.need ?? "").trim();
    if (need.length < 8) throw new Error("Please describe what you need in a few more words.");
    return { need: need.slice(0, 800) };
  })
  .handler(async ({ data }): Promise<MatchResponse> => {
    const { recommend, MatcherError } = await import("./matcher.server");
    try {
      return { ok: true, result: await recommend(data.need) };
    } catch (e) {
      return { ok: false, error: e instanceof MatcherError ? e.message : "The recommender is unavailable right now." };
    }
  });
