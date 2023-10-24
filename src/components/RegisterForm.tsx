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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/contstants";

export function RegisterForm(props: PaperProps) {
  const navigate = useNavigate(); // Access the history object

  const form = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const signup = async () => {
    await axios.post(`${BASE_URL}/signup`, {
      email: form.values.email,
      firstName: form.values.firstName,
      lastName: form.values.lastName,
      phoneNumber: form.values.phoneNumber,
      password: form.values.password,
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("Clicked");

    signup();
    navigate("/login");
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
            placeholder="hello@veegil.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />
          <TextInput
            required
            label="First Name"
            placeholder="John"
            value={form.values.firstName}
            onChange={(event) =>
              form.setFieldValue("firstName", event.currentTarget.value)
            }
            error={form.errors.firstName && "Invalid Data"}
            radius="md"
          />
          <TextInput
            required
            label="Last Name"
            placeholder="Doe"
            value={form.values.lastName}
            onChange={(event) =>
              form.setFieldValue("lastName", event.currentTarget.value)
            }
            error={form.errors.lastName && "Invalid data"}
            radius="md"
          />
          <TextInput
            required
            label="Phone Number"
            value={form.values.phoneNumber}
            onChange={(event) =>
              form.setFieldValue("phoneNumber", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid phone number"}
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
              navigate("/login");
            }}
          >
            Already have an account? Login
          </Anchor>
          <Button type="submit" radius="xl" onClick={onSubmit}>
            Register
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
