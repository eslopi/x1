import { BaseService } from './base.service';
import { FirebaseService } from './firebase.service';
import { Rating, RatingSummary } from '../types/rating.types';

export class RatingService extends BaseService {
  private firebaseService: FirebaseService;

  constructor() {
    super();
    this.firebaseService = FirebaseService.getInstance();
  }

  async addRating(rating: Partial<Rating>): Promise<void> {
    return this.handleServiceCall(async () => {
      const ratingsRef = this.firebaseService.getDatabase()
        .ref(`venues/${rating.venueId}/ratings`);
      
      await ratingsRef.push({
        ...rating,
        timestamp: Date.now()
      });

      await this.updateVenueRating(rating.venueId!);
    }, 'RatingService.addRating');
  }

  private async updateVenueRating(venueId: string): Promise<void> {
    const ratingsRef = this.firebaseService.getDatabase()
      .ref(`venues/${venueId}/ratings`);
    
    const snapshot = await ratingsRef.once('value');
    const ratings = snapshot.val() || {};
    
    const ratingValues = Object.values(ratings) as Rating[];
    const totalRatings = ratingValues.length;
    
    if (totalRatings > 0) {
      const sum = ratingValues.reduce((acc, curr) => acc + curr.score, 0);
      const average = sum / totalRatings;
      
      await this.firebaseService.getDatabase()
        .ref(`venues/${venueId}`)
        .update({ rating: average.toFixed(1) });
    }
  }

  watchVenueRatings(venueId: string, callback: (summary: RatingSummary) => void): () => void {
    const ratingsRef = this.firebaseService.getDatabase()
      .ref(`venues/${venueId}/ratings`);

    const listener = ratingsRef.on('value', snapshot => {
      const ratings = snapshot.val() || {};
      const ratingValues = Object.values(ratings) as Rating[];
      
      const summary: RatingSummary = {
        averageScore: 0,
        totalRatings: ratingValues.length,
        distribution: {
          1: 0, 2: 0, 3: 0, 4: 0, 5: 0
        }
      };

      if (ratingValues.length > 0) {
        const sum = ratingValues.reduce((acc, curr) => {
          summary.distribution[curr.score]++;
          return acc + curr.score;
        }, 0);
        
        summary.averageScore = parseFloat((sum / ratingValues.length).toFixed(1));
      }

      callback(summary);
    });

    return () => ratingsRef.off('value', listener);
  }
}