import { type RouteConfig, index, layout, route } from "@react-router/dev/routes"
import { classes } from "./content/classes"

// Die URLs entsprechen 1:1 der bisherigen WordPress-Seite, damit Google-Rankings und Links erhalten bleiben.
export default [
  layout("components/layout/site-layout.tsx", [
    index("routes/home.tsx"),
    route("info", "routes/info.tsx"),
    route("unterricht", "routes/unterricht.tsx"),
    route("team", "routes/team.tsx"),
    route("klassen", "routes/klassen.tsx"),
    ...classes.map((c) => route(c.path.slice(1), "routes/klasse.tsx", { id: `klasse-${c.slug}` })),
    route("begleitetes-fahren", "routes/begleitetes-fahren.tsx"),
    route("preise", "routes/preise.tsx"),
    route("anmeldung", "routes/anmeldung.tsx"),
    route("impressum", "routes/impressum.tsx"),
    route("datenschutz", "routes/datenschutz.tsx"),
    route("agb", "routes/agb.tsx"),
    route("*", "routes/not-found.tsx"),
  ]),
] satisfies RouteConfig
