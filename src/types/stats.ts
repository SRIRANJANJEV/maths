export interface StatisticsResult {
  originalData: number[];
  sortedData: number[];
  count: number;
  sum: number;
  mean: number;
  formattedMean: string;
  median: number;
  mode: number[] | null; // null if no mode, array if single or multiple
  modeType: 'single' | 'multiple' | 'none';
  modeDisplay: string;
  minimum: number;
  maximum: number;
  range: number;
}

export interface DemoDataset {
  id: string;
  title: string;
  description: string;
  values: number[];
  badge: string;
}
