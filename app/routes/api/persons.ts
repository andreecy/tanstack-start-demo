import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import { findPeople } from "~/database/PersonRepository";

export const Route = createAPIFileRoute("/api/persons")({
  GET: async ({ request, params }) => {
    const people = await findPeople({});
    return json({ data: people });
  },
});
