import { StatisticsResult, DemoDataset } from '../types/stats';

/**
 * Calculates statistical metrics for an array of 5 numbers.
 */
export function calculateStatistics(data: number[]): StatisticsResult {
  if (data.length !== 5) {
    throw new Error('Dataset must contain exactly 5 numbers');
  }

  const originalData = [...data];
  const sortedData = [...data].sort((a, b) => a - b);
  const count = 5;
  const sum = data.reduce((acc, val) => acc + val, 0);
  const mean = sum / count;
  const formattedMean = Number.isInteger(mean) ? mean.toString() : mean.toFixed(2);
  const median = sortedData[2]; // 3rd element in 0-indexed sorted 5-element array

  // Calculate frequency for Mode
  const frequencyMap = new Map<number, number>();
  for (const num of data) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  let maxFrequency = 0;
  for (const freq of frequencyMap.values()) {
    if (freq > maxFrequency) {
      maxFrequency = freq;
    }
  }

  let mode: number[] | null = null;
  let modeType: 'single' | 'multiple' | 'none' = 'none';
  let modeDisplay = 'No mode';

  // Rule:
  // If all elements appear with frequency 1, there is no mode (e.g., [10, 20, 30, 40, 50]).
  // If maxFrequency > 1, all numbers with maxFrequency are modes.
  // Exception handled correctly: [25, 25, 25, 25, 25] has maxFrequency 5 -> mode is 25.
  if (maxFrequency > 1) {
    const modes: number[] = [];
    frequencyMap.forEach((freq, key) => {
      if (freq === maxFrequency) {
        modes.push(key);
      }
    });
    // Sort modes for clean presentation
    modes.sort((a, b) => a - b);
    mode = modes;

    if (modes.length === 1) {
      modeType = 'single';
      modeDisplay = modes[0].toString();
    } else {
      modeType = 'multiple';
      modeDisplay = modes.join(', ');
    }
  } else {
    modeType = 'none';
    modeDisplay = 'No mode';
  }

  const minimum = sortedData[0];
  const maximum = sortedData[4];
  const range = maximum - minimum;

  return {
    originalData,
    sortedData,
    count,
    sum,
    mean,
    formattedMean,
    median,
    mode,
    modeType,
    modeDisplay,
    minimum,
    maximum,
    range,
  };
}

export const PRESET_DEMOS: DemoDataset[] = [
  {
    id: 'demo-1',
    title: 'Exhibition Benchmark',
    description: 'Standard classroom dataset illustrating clear central tendency with a single mode.',
    values: [10, 20, 20, 30, 40],
    badge: 'Canonical Example',
  },
  {
    id: 'demo-2',
    title: 'Uniform Distribution',
    description: 'Distinct spaced integers demonstrating a dataset with no repeated values and no mode.',
    values: [5, 12, 18, 25, 31],
    badge: 'No Mode Test',
  },
  {
    id: 'demo-3',
    title: 'Bimodal Distribution',
    description: 'Two distinct values occur with matching highest frequencies (two modes).',
    values: [10, 10, 20, 20, 30],
    badge: 'Bimodal (10, 20)',
  },
  {
    id: 'demo-4',
    title: 'Constant Value Series',
    description: 'Zero dispersion across identical measurements yielding zero range and identical averages.',
    values: [25, 25, 25, 25, 25],
    badge: 'Zero Range (0)',
  },
  {
    id: 'demo-5',
    title: 'Wide Spread Variance',
    description: 'High divergence between minimum and maximum showing wide range impact.',
    values: [2, 15, 37, 48, 63],
    badge: 'High Range (61)',
  },
  {
    id: 'demo-6',
    title: 'Single-Digit Sequence',
    description: 'Foundational elementary integers demonstrating precision on small values.',
    values: [1, 2, 2, 3, 5],
    badge: 'Mode = 2',
  },
];
