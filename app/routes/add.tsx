import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import { createPerson } from "~/database/PersonRepository";

const addPerson = createServerFn("POST", async (formData: FormData) => {
  console.log("foo barr");
  // createPerson({ first_name: "foo", last_name: "bar" });
  return new Response("ok", { status: 301, headers: { Location: "/" } });
});

export const Route = createFileRoute("/add")({
  component: Home,
});

function Home() {
  return (
    <div className="container">
      <h1>Add Person</h1>
      <Form method="post" action={addPerson.url}>
        <TextField name="first_name">
          <Label>First Name</Label>
          <Input />
          <FieldError />
        </TextField>
        <TextField name="last_name">
          <Label>Last Name</Label>
          <Input />
          <FieldError />
        </TextField>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
