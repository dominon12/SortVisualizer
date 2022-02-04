export interface ISortingAlgorithm {
  sortedDataset: number[];
  animationSpeed: number;
  dataset: number[];
  sort: () => void;
}

export default abstract class SortingAlgorithm implements ISortingAlgorithm {
  dataset: number[];
  sortedDataset: number[];
  animationSpeed: number;

  constructor(
    dataset: number[],
    sortedDataset: number[],
    animationSpeed: number
  ) {
    this.dataset = dataset;
    this.sortedDataset = sortedDataset;
    this.animationSpeed = animationSpeed;
  }

  abstract sort(): void;

  static description: string;
  static specifications: string;
  static code: string;
  static sources: string[];
}
