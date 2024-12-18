import { Mapbox } from '@nativescript/mapbox';
import { MAPBOX_ACCESS_TOKEN } from '../config/mapbox.config';

export class MapService {
  private static instance: MapService;
  private mapbox: Mapbox;

  private constructor() {
    this.mapbox = new Mapbox();
    this.mapbox.accessToken = MAPBOX_ACCESS_TOKEN;
  }

  static getInstance(): MapService {
    if (!MapService.instance) {
      MapService.instance = new MapService();
    }
    return MapService.instance;
  }

  getMapbox(): Mapbox {
    return this.mapbox;
  }
}