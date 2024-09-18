# Sports Data Processor

This repository contains a library intended for processing data from professional athletes' sports computers. This library consolidates data from various sources into a unified JSON format, designed to be used by a sports science team for further analysis.

## Project Overview

This library reads three types of data inputs:

- **Summary**: Provides basic activity summaries including type, average values, etc.
- **Laps**: Includes detailed descriptions of laps, such as time, distance, and duration.
- **Samples**: Contains detailed recorded values grouped by sample type.

The processed output is a unified JSON file consolidating all three datasets with specific structures for activity overview and laps data, which includes detailed heart rate samples.

**Key Features:**

- Data pre-processing including outlier removal and heart rate data interpolation.
- Outputs a clean and well-structured JSON file for further analysis.

## Folder Structure

- **src/**: Contains the main code for the library, including the data processor and type definitions.
- **data/**: Includes input JSON files for summary, laps, and samples used by the library.
- **output/**: Stores the generated output JSON file after processing.
- **tests/**: Contains unit tests for validating the library's functionality.

## Requirements

- Node.js version 14.x or above
- TypeScript

## Installation

Clone the repository and install the required dependencies.

```bash
git clone https://github.com/dreamjet31/sports-data-processor.git
cd sports-data-processor
npm install
```

## Usage

1. Ensure JSON input files are available in the `data/` directory.
2. Run the build command to compile TypeScript to JavaScript.
3. Run the program to generate the processed output.

```bash
npm run build
npm start
```

Check the `output/` directory for the generated `output.json` file.

## Running Tests

The library is tested using Jest. Run the following command to execute the tests.

```bash
npm test
```

## Development Setup

To make changes or enhance the functionality:

1. Modify TypeScript files under `src/` as needed and run.

```bash
npm run dev
```

## Contribution Guidelines

Contributions to this project are welcome. Please follow these guidelines:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License.
