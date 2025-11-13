import {
  Group,
  Text,
  Chip,
  Flex,
  SegmentedControl,
  Stack,
} from "@mantine/core";
import { IconStar } from "@tabler/icons-react";

interface FilterControlsProps {
  starFilter: number[];
  onStarFilterChange: (value: number[]) => void;
  sortBy: "recent" | "rating";
  onSortByChange: (value: "recent" | "rating") => void;
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

        <div>
          <Text size="sm" fw={500} mb="xs">
            Sort by
          </Text>
          <SegmentedControl
            value={sortBy}
            onChange={(value) => onSortByChange(value as "recent" | "rating")}
            color="primary"
            data={[
              { label: "Most Recent", value: "recent" },
              { label: "Highest Rating", value: "rating" },
            ]}
          />
        </div>
      </Group>
    </Stack>
  );
}
