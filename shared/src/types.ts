// API Response Types

export interface FeedbackEntry {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

export interface FeedbackListResponse {
  data: FeedbackEntry[];
}
