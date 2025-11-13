import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import {
  Title,
  Text,
  Card,
  Group,
  Stack,
  Rating,
  Loader,
  Center,
  Alert,
  Badge,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import type {
  FeedbackEntry,
  FeedbackListResponse,
} from '@full-stack-starter/shared';
import { FeedbackStats } from '../components/FeedbackStats';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function FeedbackList() {
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/feedback`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json: FeedbackListResponse = await response.json();
      setFeedback(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Center h={400}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="Error"
        color="red"
        variant="filled"
      >
        {error}
      </Alert>
    );
  }

  return (
    <Stack gap="xl">
      <div>
        <Title order={1}>Patient Feedback</Title>
        <Group gap="xs" mt="xs">
          <Badge size="lg" variant="light">
            {feedback.length} review{feedback.length !== 1 ? 's' : ''}
          </Badge>
        </Group>
      </div>

      <FeedbackStats />

      {feedback.length === 0 ? (
        <Text c="dimmed" ta="center" mt="xl">
          No feedback entries yet.
        </Text>
      ) : (
        <Stack gap="md">
          {feedback.map((entry) => (
            <Card key={entry.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Text fw={700} size="lg">
                  {entry.name}
                </Text>
                <Rating value={entry.rating} readOnly />
              </Group>
              <Text size="sm" c="dimmed">
                {entry.comment}
              </Text>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export const Route = createFileRoute('/')({
  component: FeedbackList,
});
