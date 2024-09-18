import { SportsDataProcessor } from "../src/processor";
import { Summary, Lap, Sample } from "../src/types";

describe("SportsDataProcessor Tests", () => {
  let processor: SportsDataProcessor;
  let summary: Summary;
  let laps: Lap[];
  let samples: Sample[];

  // Set up test data before each test case
  beforeEach(() => {
    processor = new SportsDataProcessor();

    // Example summary data for testing
    summary = {
      userId: "1234567890",
      activityId: 9480958402,
      activityName: "Indoor Cycling",
      durationInSeconds: 3667,
      startTimeInSeconds: 1661158927,
      startTimeOffsetInSeconds: 7200,
      activityType: "INDOOR_CYCLING",
      averageHeartRateInBeatsPerMinute: 150,
      activeKilocalories: 561,
      deviceName: "instinct2",
      maxHeartRateInBeatsPerMinute: 190,
    };

    // Example laps data for testing
    laps = [
      {
        startTimeInSeconds: 1661158927,
        airTemperatureCelsius: 28,
        heartRate: 109,
        totalDistanceInMeters: 15,
        timerDurationInSeconds: 600,
      },
      {
        startTimeInSeconds: 1661158929,
        airTemperatureCelsius: 28,
        heartRate: 107,
        totalDistanceInMeters: 30,
        timerDurationInSeconds: 900,
      },
    ];

    // Example samples data for testing
    samples = [
      {
        "recording-rate": 5,
        "sample-type": "2",
        data: "120,126,122,140,142,155,145",
      },
      {
        "recording-rate": 5,
        "sample-type": "2",
        data: "141,147,155,160,180,152,120",
      },
    ];
  });

  it("should correctly process and create unified data", () => {
    // Load test data into processor
    processor.loadSummary(summary);
    processor.loadLaps(laps);
    processor.loadSamples(samples);

    // Process to generate unified data
    const unifiedData = processor.processUnifiedData();

    // Assertions to validate unified data structure and content
    expect(unifiedData).toBeDefined(); // Check if the unified data is defined
    expect(unifiedData.activityOverview).toEqual({
      userId: "1234567890",
      type: "INDOOR_CYCLING",
      device: "instinct2",
      maxHeartRate: 190,
      duration: 3667,
    });
  });
});
