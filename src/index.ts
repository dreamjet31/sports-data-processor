import * as fs from "fs";
import path from "path";
import { SportsDataProcessor } from "./processor";
import { Lap, Summary, Sample } from "./types";

/**
 * Reads and parses a JSON file.
 * @param filePath - The relative path to the JSON file.
 * @returns Parsed JSON data as an object of type T.
 */
function readJSONFile<T>(filePath: string): T {
  const absolutePath = path.resolve(__dirname, "../", filePath);
  const data = fs.readFileSync(absolutePath, "utf-8");
  return JSON.parse(data);
}

// Load data from JSON files
const summaryData: Summary = readJSONFile<Summary>("data/summary.json");
const lapsData: Lap[] = readJSONFile<Lap[]>("data/laps.json");
const samplesData: Sample[] = readJSONFile<Sample[]>("data/samples.json");

// Define paths for output
const outputDirectory = path.resolve(__dirname, "../", "output");
const outputFilePath = path.join(outputDirectory, "output.json");

// Initialize the data processor
const processor = new SportsDataProcessor();

// Load data into the processor
processor.loadSummary(summaryData);
processor.loadLaps(lapsData);
processor.loadSamples(samplesData);

// Ensure the output directory exists
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

// Save the processed data as a JSON file
processor.saveAsJson(outputFilePath);
