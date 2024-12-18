import { Observable } from '@nativescript/core';
import { Venue } from '../types/venue.types';
import { RatingService } from '../services/rating.service';
import { RatingSummary } from '../types/rating.types';
import { formatOperatingHours } from '../utils/date-time';

export class VenueDetailsViewModel extends Observable {
  private ratingService: RatingService;
  private _venue: Venue;
  private _ratingSummary: RatingSummary;
  private _userRating = 3;
  private _userComment = '';
  private cleanupFunctions: (() => void)[] = [];

  constructor(venue: Venue, private userId: string, private userName: string) {
    super();
    this._venue = venue;
    this.ratingService = new RatingService();
    this.initializeRatings();
  }

  private initializeRatings() {
    const cleanup = this.ratingService.watchVenueRatings(this._venue.id, (summary) => {
      this._ratingSummary = summary;
      this.notifyPropertyChange('ratingSummary', summary);
      this.notifyPropertyChange('ratingDistribution', this.ratingDistribution);
    });

    this.cleanupFunctions.push(cleanup);
  }

  get venue(): Venue {
    return this._venue;
  }

  get ratingSummary(): RatingSummary {
    return this._ratingSummary;
  }

  get userRating(): number {
    return this._userRating;
  }

  set userRating(value: number) {
    if (this._userRating !== value) {
      this._userRating = value;
      this.notifyPropertyChange('userRating', value);
    }
  }

  get userComment(): string {
    return this._userComment;
  }

  set userComment(value: string) {
    if (this._userComment !== value) {
      this._userComment = value;
      this.notifyPropertyChange('userComment', value);
    }
  }

  get formattedHours() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return this._venue.operatingHours.map(hour => ({
      day: days[hour.day],
      hours: `${formatOperatingHours(hour.open)} - ${formatOperatingHours(hour.close)}`
    }));
  }

  get ratingDistribution() {
    if (!this._ratingSummary) return [];

    return [5, 4, 3, 2, 1].map(stars => ({
      stars,
      count: this._ratingSummary.distribution[stars],
      percentage: (this._ratingSummary.distribution[stars] / this._ratingSummary.totalRatings) * 100 || 0
    }));
  }

  async submitRating() {
    await this.ratingService.addRating({
      userId: this.userId,
      userName: this.userName,
      venueId: this._venue.id,
      score: this._userRating,
      comment: this._userComment.trim() || undefined
    });

    this._userComment = '';
    this.notifyPropertyChange('userComment', '');
  }

  cleanup() {
    this.cleanupFunctions.forEach(cleanup => cleanup());
  }
}