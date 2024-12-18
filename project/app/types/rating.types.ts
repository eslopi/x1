export interface Rating {
  id: string;
  userId: string;
  userName: string;
  venueId: string;
  score: number;
  comment?: string;
  timestamp: number;
}

export interface RatingSummary {
  averageScore: number;
  totalRatings: number;
  distribution: {
    [key: number]: number;
  };
}