import { Observable } from '@nativescript/core';
import { ErrorHandler } from '../utils/error-handler';

export class BaseService extends Observable {
  protected async handleServiceCall<T>(
    operation: () => Promise<T>,
    context: string
  ): Promise<T | undefined> {
    return ErrorHandler.wrapAsync(operation(), context);
  }

  protected notifyPropertyChangeWithError(
    propertyName: string,
    value: any,
    error?: Error
  ) {
    if (error) {
      ErrorHandler.handleError(error, `Property change: ${propertyName}`);
    }
    this.notifyPropertyChange(propertyName, value);
  }
}