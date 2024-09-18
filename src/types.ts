export interface Summary {
  userId: string;
  activityId: number;
  activityName: string;
  durationInSeconds: number;
  startTimeInSeconds: number;
  startTimeOffsetInSeconds: number;
  activityType: string;
  averageHeartRateInBeatsPerMinute: number;
  activeKilocalories: number;
  deviceName: string;
  maxHeartRateInBeatsPerMinute: number;
}

export interface Lap {
  startTimeInSeconds: number;
  airTemperatureCelsius: number;
  heartRate: number;
  totalDistanceInMeters: number;
  timerDurationInSeconds: number;
}

export interface Sample {
  "recording-rate": number;
  "sample-type": string;
  data: string;
}

export interface HeartRateSample {
  sampleIndex: number;
  heartRate: number;
}

export interface ActivityOverview {
  userId: string;
  type: string;
  device: string;
  maxHeartRate: number;
  duration: number;
}

export interface UnifiedData {
  activityOverview: ActivityOverview;
  lapsData: {
    startTime: number;
    distance: number;
    duration: number;
    heartRateSamples: HeartRateSample[];
  }[];
}
