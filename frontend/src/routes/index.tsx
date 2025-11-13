import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Title,
  Text,
  Group,
  Stack,
  Loader,
  Center,
  Alert,
  Badge,
  Pagination,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import type {
  FeedbackEntry,
  FeedbackListResponse,
} from "@full-stack-starter/shared";
import { FeedbackStats } from "../components/FeedbackStats";
import { SearchBar } from "../components/SearchBar";
import { FilterControls } from "../components/FilterControls";
import { FeedbackCard } from "../components/FeedbackCard";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const ITEMS_PER_PAGE = 5;

function FeedbackList() {
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [starFilter, setStarFilter] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<"recent" | "rating">("recent");
  const [currentPage, setCurrentPage] = useState(1);

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
      setError(err instanceof Error ? err.message : "An error occurred");
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
      if (sortBy === "rating") {
        return b.rating - a.rating;
      } else {
        // Sort by recent (assuming higher ID = more recent)
        return b.id - a.id;
      }
    });

  // Calculate pagination
  const totalPages = Math.ceil(
    filteredAndSortedFeedback.length / ITEMS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedFeedback = filteredAndSortedFeedback.slice(
    startIndex,
    endIndex
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, starFilter, sortBy]);

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
          <Badge size="lg" variant="light" color="primary">
            {feedback.length} review{feedback.length !== 1 ? "s" : ""}
          </Badge>
        </Group>
      </div>

      <FeedbackStats />

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search by name, comment, or rating..."
      />

      <FilterControls
        starFilter={starFilter}
        onStarFilterChange={setStarFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      {feedback.length === 0 ? (
        <Text c="dimmed" ta="center" mt="xl">
          No feedback entries yet.
        </Text>
      ) : filteredAndSortedFeedback.length === 0 ? (
        <Text c="dimmed" ta="center" mt="xl">
          No feedback matches your filters.
        </Text>
      ) : (
        <>
          <Stack gap="md">
            {paginatedFeedback.map((entry) => (
              <FeedbackCard key={entry.id} entry={entry} />
            ))}
          </Stack>

          {totalPages > 1 && (
            <Group justify="center" mt="xl">
              <Pagination
                value={currentPage}
                onChange={setCurrentPage}
                total={totalPages}
                size="md"
                withEdges
                color="primary"
              />
            </Group>
          )}
        </>
      )}
    </Stack>
  );
}

export const Route = createFileRoute("/")({
  component: FeedbackList,
});
