import { Group, Text, Chip, Flex, Select, Stack } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";

type SortOption = "newest" | "oldest" | "highest" | "lowest";

interface FilterControlsProps {
  starFilter: number[];
  onStarFilterChange: (value: number[]) => void;
  sortBy: SortOption;
  onSortByChange: (value: SortOption) => void;
}

export function FilterControls({
  starFilter,
  onStarFilterChange,
  sortBy,
  onSortByChange,
}: FilterControlsProps) {
  return (
    <Stack gap="md">
      <Group justify="space-between" align="flex-start">
        <div>
          <Text size="sm" fw={500} mb="xs">
            Filter by rating
          </Text>
          <Chip.Group
            multiple
            value={starFilter.map(String)}
            onChange={(value) => onStarFilterChange(value.map(Number))}
          >
            <Flex gap="xs" wrap="wrap">
              {[5, 4, 3, 2, 1].map((star) => (
                <Chip
                  key={star}
                  value={String(star)}
                  icon={<IconStar size={12} />}
                >
                  {star} star{star !== 1 ? "s" : ""}
                </Chip>
              ))}
            </Flex>
          </Chip.Group>
        </div>

        <div style={{ minWidth: 200 }}>
          <Text size="sm" fw={500} mb="xs">
            Sort by
          </Text>
          <Select
            value={sortBy}
            onChange={(value) => onSortByChange(value as SortOption)}
            data={[
              { label: "Newest First", value: "newest" },
              { label: "Oldest First", value: "oldest" },
              { label: "Highest Rating", value: "highest" },
              { label: "Lowest Rating", value: "lowest" },
            ]}
            allowDeselect={false}
          />
        </div>
      </Group>
    </Stack>
  );
}
