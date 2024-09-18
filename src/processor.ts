import * as fs from "fs";
import {
  Summary,
  Lap,
  Sample,
  UnifiedData,
  ActivityOverview,
  HeartRateSample,
} from "./types";

export class SportsDataProcessor {
  private summary: Summary | null = null; // Store summary data
  private laps: Lap[] = []; // Store lap data
  private samples: Sample[] = []; // Store sample data

  /**
   * Loads summary data.
   * @param summaryData - Summary data to load.
   */
  loadSummary(summaryData: Summary): void {
    this.summary = summaryData;
  }

  /**
   * Loads lap data.
   * @param lapsData - Array of lap data.
   */
  loadLaps(lapsData: Lap[]): void {
    this.laps = lapsData;
  }

  /**
   * Loads sample data.
   * @param samplesData - Array of sample data.
   */
  loadSamples(samplesData: Sample[]): void {
    this.samples = samplesData;
  }

  /**
   * Preprocesses heart rate data by parsing, filtering, and interpolating it.
   * @param heartRates - Comma-separated heart rate data.
   * @returns Array of interpolated heart rates.
   */
  private preprocessHeartRateData(heartRates: string): number[] {
    const rates = heartRates
      .split(",")
      .map((hr) => parseInt(hr, 10))
      .filter((hr) => !isNaN(hr));

    // Interpolate heart rate values
    const interpolatedRates = rates.reduce<number[]>(
      (result, currentRate, index, array) => {
        if (index === array.length - 1) return result;
        const nextRate = array[index + 1];
        const diff = (nextRate - currentRate) / 5;
        for (let i = 0; i < 5; i++) {
          result.push(currentRate + i * diff);
        }
        return result;
      },
      []
    );

    return interpolatedRates;
  }

  /**
   * Processes all loaded data into a unified format.
   * @returns Unified data object.
   */
  processUnifiedData(): UnifiedData {
    if (!this.summary) {
      throw new Error("Summary data is not loaded.");
    }

    // Create an overview of the activity based on summary data
    const activityOverview: ActivityOverview = {
      userId: this.summary.userId,
      type: this.summary.activityType,
      device: this.summary.deviceName,
      maxHeartRate: this.summary.maxHeartRateInBeatsPerMinute,
      duration: this.summary.durationInSeconds,
    };

    const heartRateSamples: HeartRateSample[] = [];

    // Collect relevant heart rate samples
    this.samples
      .filter((sample) => sample["sample-type"] === "2")
      .forEach((sample) => {
        const interpolatedHR = this.preprocessHeartRateData(sample.data);
        interpolatedHR.forEach((hr, index) => {
          heartRateSamples.push({ sampleIndex: index, heartRate: hr });
        });
      });

    // Create a structured array of lap data
    const lapsData = this.laps.map((lap) => ({
      startTime: lap.startTimeInSeconds,
      distance: lap.totalDistanceInMeters,
      duration: lap.timerDurationInSeconds,
      heartRateSamples: heartRateSamples, // Placeholder association
    }));

    return { activityOverview, lapsData };
  }

  /**
   * Saves the processed unified data as a JSON file.
   * @param filename - The output file path.
   */
  saveAsJson(filename: string): void {
    const unifiedData = this.processUnifiedData();
    fs.writeFileSync(filename, JSON.stringify(unifiedData, null, 2));
  }
}
