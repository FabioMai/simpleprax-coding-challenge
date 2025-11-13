export interface FeedbackEntry {
  id: number;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface FeedbackListResponse {
  data: FeedbackEntry[];
}

export interface FeedbackStatsResponse {
  averageRating: number;
  feedbackThisWeek: number;
  totalFeedback: number;
}

export interface CreateFeedbackRequest {
  name: string;
  rating: number;
  comment: string;
}
