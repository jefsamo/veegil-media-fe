/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
} from "@mantine/core";
import { GoogleButton } from "./GoogleButton";
import { TwitterButton } from "./TwitterButton";
import { useAuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";

export function AuthenticationForm(props: PaperProps) {
  const { login } = useAuthContext();
  const navigate = useNavigate(); // Access the history object

  const form = useForm({
    initialValues: {
      email: "adegokep4@gmail.com",
      name: "",
      password: "12345678",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("Clicked");

    login(form.values.email, form.values.password);
    navigate("/transfer");
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Veegil,
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            size="xs"
            onClick={() => {
              navigate("/register");
            }}
          >
            Don't have an account? Register
          </Anchor>
          <Button type="submit" radius="xl" onClick={onSubmit}>
            Login
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
