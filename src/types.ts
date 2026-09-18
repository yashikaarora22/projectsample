export type Page = 'home' | 'analyze' | 'compare' | 'cross-modal' | 'history';

export type SensorType = 'optical' | 'sar' | 'multispectral';

export type NavigationTab =
  | 'orbital-explorer'
  | 'multimodal-query'
  | 'sar-spectral-analytics'
  | 'constellation-feeds'
  | 'mission-logs';

export type SensorMode = 'SAR' | 'OPTICAL' | 'THERMAL' | 'HYPER' | 'LIDAR';

export interface ClassifiedTarget {
  id: string;
  type: string;
  confidence: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  coords?: string;
  details?: string;
  bboxNormalized?: [number, number, number, number];
  bounding?: { x: number; y: number; w: number; h: number } | string;
  lengthMeters: number;
  speedKnots: number;
  headingDegrees?: number;
  status: string;
  sensorCorrelation?: string;
}

export interface SatelliteNode {
  id: string;
  name: string;
  agency: string;
  sensor: string;
  sensorType: SensorMode;
  swathWidthKm: number;
  resolutionMeters: number;
  altitudeKm: number;
  velocityKmS?: number;
  inclinationDeg?: number;
  inclination?: string | number;
  orbitRev: number;
  downlinkMbps: number;
  batteryPercent: number;
  nextPass: string;
  status?: string;
  polarization?: string;
}

export interface MissionPreset {
  id: string;
  label: string;
  aoi: string;
  query: string;
  sensorMode: SensorMode;
  description: string;
  fusion?: string;
  icon?: string;
}

export interface QueryAnalysisResult {
  executiveSummary: string;
  confidence: number;
  sensorMode: SensorMode;
  aoi: string;
  reasoningSteps: string[];
  classifiedTargets: ClassifiedTarget[];
  telemetry: {
    nadir: string;
    vectorCount: number;
    thermalDelta: string;
    cloudCover: string;
    polarization?: string;
    altitudeKm?: number;
  };
  timestamp: string;
  source: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  thumbnailUrl?: string;
  sensorType?: SensorType;
  confidence?: number;
  segmentedImageUrl?: string;
  legend?: { label: string; color: string }[];
  actionButtons?: { label: string; action: string; icon?: string }[];
}

export interface HistoryItem {
  id: string;
  title: string;
  category: string;
  time: string;
  thumbnail: string;
  pageTarget: Page;
  sensor: string;
  query: string;
}
