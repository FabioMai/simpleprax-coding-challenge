import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@mantine/form";
import {
  Title,
  TextInput,
  Textarea,
  Button,
  Group,
  Stack,
  Alert,
  Rating,
  Text,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useState } from "react";
import type { CreateFeedbackRequest } from "@full-stack-starter/shared";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function NewFeedback() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CreateFeedbackRequest>({
    initialValues: {
      name: "",
      rating: 0,
      comment: "",
    },
    validate: {
      name: (value) => {
        if (!value) return "Name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        return null;
      },
      rating: (value) => {
        if (!value || value < 1) return "Please select a rating";
        return null;
      },
      comment: (value) => {
        if (!value) return "Comment is required";
        if (value.length < 10) return "Comment must be at least 10 characters";
        return null;
      },
    },
  });

  const handleSubmit = async (values: CreateFeedbackRequest) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Navigate back to the list after successful submission
      navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsSubmitting(false);
    }
  };

  return (
    <Stack gap="xl" maw={600}>
      <Title order={1}>Add Patient Feedback</Title>

      {error && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Error"
          color="red"
          variant="filled"
        >
          {error}
        </Alert>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Name"
            placeholder="Enter patient name"
            required
            disabled={isSubmitting}
            {...form.getInputProps("name")}
          />

          <div>
            <Text size="sm" fw={500} mb="xs">
              Rating <span style={{ color: "red" }}>*</span>
            </Text>
            <Rating
              size="lg"
              color="primary"
              {...form.getInputProps("rating")}
              onChange={(value) => form.setFieldValue("rating", value)}
            />
            {form.errors.rating && (
              <Text c="red" size="sm" mt={5}>
                {form.errors.rating}
              </Text>
            )}
          </div>

          <Textarea
            label="Comment"
            placeholder="Share your experience..."
            required
            minRows={5}
            disabled={isSubmitting}
            {...form.getInputProps("comment")}
          />

          <Group mt="md">
            <Button type="submit" loading={isSubmitting} color="primary">
              Submit Feedback
            </Button>
            <Button
              variant="outline"
              color="primary"
              onClick={() => navigate({ to: "/" })}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  );
}

export const Route = createFileRoute("/new")({
  component: NewFeedback,
});
