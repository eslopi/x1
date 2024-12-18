import { alert } from '@nativescript/core';

export class ErrorHandler {
  static handleError(error: Error, context: string): void {
    console.error(`Error in ${context}:`, error);
    
    if (this.shouldShowErrorToUser(error)) {
      this.showErrorAlert(error);
    }
  }

  private static shouldShowErrorToUser(error: Error): boolean {
    const criticalErrors = [
      'Location permission denied',
      'Network connection failed'
    ];
    
    return criticalErrors.some(msg => error.message.includes(msg));
  }

  private static showErrorAlert(error: Error): void {
    alert({
      title: "Error",
      message: this.getUserFriendlyMessage(error),
      okButtonText: "OK"
    });
  }

  private static getUserFriendlyMessage(error: Error): string {
    const errorMessages: Record<string, string> = {
      'Location permission denied': 'Location access is required to show nearby venues.',
      'Network connection failed': 'Please check your internet connection and try again.'
    };

    return errorMessages[error.message] || 'An unexpected error occurred. Please try again.';
  }
}