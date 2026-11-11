<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Portfolio (migrated from Next.js)
- Next.js APIs are replaced by shims in src/lib (dynamic.tsx = browser-only lazy load, next-link.tsx, next-navigation.ts); keep using them so 3D/WebGL code never runs during SSR.
- Theme lives in tailwind.config.ts (loaded via @config) with raw values as --site-* CSS vars in src/styles.css; --color-* names are reserved for Tailwind to avoid self-referencing vars.
- Case studies are data in src/data/caseStudies.ts rendered by the /work/$slug route; the home showcase and AI matcher read the same list so they never drift.
- The AI project matcher runs server-side (src/lib/matcher.*) and may only recommend slugs from caseStudies.ts, so it can't invent work.

- Project showcase uses the shared Embla carousel for pointer dragging and keyboard navigation, so mobile and desktop share one interaction model.
- Portfolio audio is opt-in browser Web Audio with separate music/effect controls; initialize only after hydration and create audio contexts only from a user gesture.
- Generated project imagery is editorial concept artwork, not a claim of actual product screenshots or the owner's workplace.
- The projects page and AI matcher share the paginated public GitHub catalogue and resume-backed enrichment; keep missing demo URLs absent rather than inventing deployments.
- Resolve share-image URLs from the server request origin on leaf routes so previews remain valid across deployments.
- Emit portfolio milestones directly in existing successful handlers through the optional Lovable events global, with a closed non-personal catalog schema, to keep visitor tracking privacy-safe and queryable.
