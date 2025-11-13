import { Card, Group, Text, Rating } from '@mantine/core';
import type { FeedbackEntry } from '@full-stack-starter/shared';

interface FeedbackCardProps {
  entry: FeedbackEntry;
}

export function FeedbackCard({ entry }: FeedbackCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
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
  );
}
