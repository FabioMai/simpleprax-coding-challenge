import { useState, useEffect } from "react";
import {
  Card,
  Group,
  Stack,
  Text,
  Loader,
  Center,
  Alert,
  SimpleGrid,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconStar,
  IconCalendar,
  IconMessage,
} from "@tabler/icons-react";
import type { FeedbackStatsResponse } from "@full-stack-starter/shared";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export function FeedbackStats() {
  const [stats, setStats] = useState<FeedbackStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/feedback/stats`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: FeedbackStatsResponse = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Center h={100}>
        <Loader size="md" />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="Error loading stats"
        color="red"
        variant="light"
      >
        {error}
      </Alert>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group gap="sm">
          <IconStar
            size={24}
            style={{ color: "var(--mantine-color-yellow-6)" }}
          />
          <Stack gap={0}>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Average Rating
            </Text>
            <Text size="xl" fw={700}>
              {stats.averageRating.toFixed(1)}
            </Text>
          </Stack>
        </Group>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group gap="sm">
          <IconCalendar
            size={24}
            style={{ color: "var(--mantine-color-blue-6)" }}
          />
          <Stack gap={0}>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              This Week
            </Text>
            <Text size="xl" fw={700}>
              {stats.feedbackThisWeek}
            </Text>
          </Stack>
        </Group>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group gap="sm">
          <IconMessage
            size={24}
            style={{ color: "var(--mantine-color-green-6)" }}
          />
          <Stack gap={0}>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Total Feedback
            </Text>
            <Text size="xl" fw={700}>
              {stats.totalFeedback}
            </Text>
          </Stack>
        </Group>
      </Card>
    </SimpleGrid>
  );
}
