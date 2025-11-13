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

// API Request Types
export interface CreateFeedbackRequest {
  name: string;
  rating: number;
  comment: string;
}
