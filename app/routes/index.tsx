import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { Button } from "react-aria-components";
import { deletePerson } from "~/database/PersonRepository";

export const Route = createFileRoute("/")({
  component: Home,
});

const delPerson = createServerFn("POST", async (id: number) => {
  try {
    deletePerson(id);
    // Reload the page to trigger the loader again
    return new Response("ok", { status: 301, headers: { Location: "/" } });
  } catch (error) {
    throw error;
  }
});

function Home() {
  const navigate = useNavigate();

  // using react query to fetch data
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["persons"],
    queryFn: async () => {
      return fetch("/api/persons")
        .then((res) => res.json())
        .then((data) => {
          return data;
        });
    },
  });

  const persons = query.data?.data;

  // react query mutation
  const mutation = useMutation({
    mutationFn: delPerson,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["persons"] });
    },
  });

  return (
    <div className="container p-4">
      <h1 className="text-xl font-medium">Persons</h1>
      <Button onPress={() => navigate({ to: "/add" })}>Add</Button>

      {persons?.map((person) => (
        <div key={person.id} className="p-4 border-b flex justify-between">
          <h2 className="text-lg font-medium">
            {person.first_name} {person.last_name}
          </h2>

          <Button onPress={() => mutation.mutate(person.id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
}
