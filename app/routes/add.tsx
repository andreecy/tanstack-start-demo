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

// using no-js server function
// https://tanstack.com/router/latest/docs/framework/react/start/server-functions#no-js-server-functions

const addPerson = createServerFn("POST", async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  try {
    createPerson(data);
    // Reload the page to trigger the loader again
    return new Response("ok", { status: 301, headers: { Location: "/" } });
  } catch (error) {
    throw error;
  }
});

export const Route = createFileRoute("/add")({
  component: Home,
});

function Home() {
  return (
    <div className="container p-4">
      <h1 className="text-xl font-medium">Add Person</h1>
      <Form
        // onSubmit={async (e) => {
        //   e.preventDefault();
        //   const formData = new FormData(e.target as HTMLFormElement);
        //   const result = await addPerson(formData);
        //   console.log(result);
        // }}
        action={addPerson.url}
        method="post"
        encType="multipart/form-data"
      >
        <TextField name="first_name" isRequired>
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
