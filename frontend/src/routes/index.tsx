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
  TextInput,
  SegmentedControl,
  Chip,
  Flex,
} from '@mantine/core';
import { IconAlertCircle, IconSearch, IconStar } from '@tabler/icons-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [starFilter, setStarFilter] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'rating'>('recent');

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

  // Filter and sort feedback
  const filteredAndSortedFeedback = feedback
    .filter((entry) => {
      // Search filter
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        entry.name.toLowerCase().includes(query) ||
        entry.comment.toLowerCase().includes(query) ||
        entry.rating.toString().includes(query);

      // Star filter
      const matchesStars =
        starFilter.length === 0 || starFilter.includes(entry.rating);

      return matchesSearch && matchesStars;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else {
        // Sort by recent (assuming higher ID = more recent)
        return b.id - a.id;
      }
    });

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

      <TextInput
        placeholder="Search by name, comment, or rating..."
        leftSection={<IconSearch size={16} />}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
        size="md"
      />

      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <div>
            <Text size="sm" fw={500} mb="xs">
              Filter by rating
            </Text>
            <Chip.Group multiple value={starFilter.map(String)} onChange={(value) => setStarFilter(value.map(Number))}>
              <Flex gap="xs" wrap="wrap">
                {[5, 4, 3, 2, 1].map((star) => (
                  <Chip key={star} value={String(star)} icon={<IconStar size={12} />}>
                    {star} star{star !== 1 ? 's' : ''}
                  </Chip>
                ))}
              </Flex>
            </Chip.Group>
          </div>

          <div>
            <Text size="sm" fw={500} mb="xs">
              Sort by
            </Text>
            <SegmentedControl
              value={sortBy}
              onChange={(value) => setSortBy(value as 'recent' | 'rating')}
              data={[
                { label: 'Most Recent', value: 'recent' },
                { label: 'Highest Rating', value: 'rating' },
              ]}
            />
          </div>
        </Group>
      </Stack>

      {feedback.length === 0 ? (
        <Text c="dimmed" ta="center" mt="xl">
          No feedback entries yet.
        </Text>
      ) : filteredAndSortedFeedback.length === 0 ? (
        <Text c="dimmed" ta="center" mt="xl">
          No feedback matches your filters.
        </Text>
      ) : (
        <Stack gap="md">
          {filteredAndSortedFeedback.map((entry) => (
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
