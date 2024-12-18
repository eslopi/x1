export interface MapConfig {
  defaultCenter: {
    lat: number;
    lng: number;
    zoom: number;
  };
  style: string;
  zoomRange: {
    min: number;
    max: number;
  };
}

export interface MapReadyEventData {
  map: any;
  error?: Error;
}