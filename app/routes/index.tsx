import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <h1>hello world</h1>
      <Form>
        <TextField name="email" type="email" isRequired>
          <Label>Email</Label>
          <Input />
          <FieldError />
        </TextField>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
