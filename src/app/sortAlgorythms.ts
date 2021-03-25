export interface ISortAlgorythm {
  sortedDataset: number[];
  animationSpeed: number;
  dataset: number[];
  sort: () => void;
}

export abstract class SortAlgorythm implements ISortAlgorythm {
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
}

export class SelectionSort extends SortAlgorythm {
  sort() {
    let arrayLength = this.dataset.length;
    for (let i = 0; i < arrayLength; i++) {
      setTimeout(() => {
        let minValue = Math.min(...this.dataset);
        this.dataset = this.removeArrayElement(this.dataset, minValue);
        this.sortedDataset.push(minValue);
      }, (i + 1) * this.animationSpeed);
    }
  }

  private removeArrayElement(array: number[], elementToRemove: number) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === elementToRemove) {
        array.splice(i, 1);
        break;
      }
    }
    return array;
  }

  static toString() {
    return 'Selection Sort';
  }
}

export class BubbleSort extends SortAlgorythm {
  sort() {
    let arrayLength = this.dataset.length;
    for (let i = 0; i < arrayLength - 1; i++) {
      setTimeout(() => {
        for (let j = 0; j < arrayLength - i - 1; j++) {
          if (this.dataset[j] > this.dataset[j + 1]) {
            let currentValue = this.dataset[j];
            this.dataset[j] = this.dataset[j + 1];
            this.dataset[j + 1] = currentValue;
          }
        }
      }, (i + 1) * this.animationSpeed);
    }
  }

  static toString() {
    return 'Bubble Sort';
  }
}

export class InsertionSort extends SortAlgorythm {
  sort() {
    let arrayLength = this.dataset.length;
    for (let i = 1; i < arrayLength; i++) {
      setTimeout(() => {
        let keyItem = this.dataset[i];
        let j = i - 1;
        while (j >= 0 && this.dataset[j] > keyItem) {
          this.dataset[j + 1] = this.dataset[j];
          j--;
        }
        this.dataset[j + 1] = keyItem;
      }, (i + 1) * this.animationSpeed);
    }
  }

  static toString() {
    return 'Insertion Sort';
  }
}

export class HeapSort extends SortAlgorythm {
  sort() {
    let arrayLength = this.dataset.length;

    let iter = 0;
    for (let i = arrayLength; i > -1; i--) {
      setTimeout(() => {
        this.heapify(this.dataset, arrayLength, i);
        iter++;
      }, (iter + 1) * this.animationSpeed);
    }

    let iter2 = 0;
    for (let i = arrayLength - 1; i > 0; i--) {
      setTimeout(() => {
        let temp = this.dataset[i];
        this.dataset[i] = this.dataset[0];
        this.dataset[0] = temp;
        this.heapify(this.dataset, i, 0);
        iter2++;
      }, (iter2 + 1) * this.animationSpeed);
    }
  }

  private heapify(arr: number[], heap_size: number, root_index: number) {
    let largest = root_index;
    let left_child = 2 * root_index + 1;
    let right_child = 2 * root_index + 2;

    if (left_child < heap_size && arr[left_child] > arr[largest]) {
      largest = left_child;
    }
    if (right_child < heap_size && arr[right_child] > arr[largest]) {
      largest = right_child;
    }
    if (largest !== root_index) {
      let temp = arr[root_index];
      arr[root_index] = arr[largest];
      arr[largest] = temp;
      this.heapify(arr, heap_size, largest);
    }
  }

  static toString() {
    return 'Heap Sort';
  }
}

export class ShellSort extends SortAlgorythm {
  sort() {
    let gap = Math.floor(this.dataset.length / 2);
    let arrayLength = this.dataset.length;
    let interval = setInterval(() => {
      for (let i = gap; i < arrayLength; i++) {
        let temp = this.dataset[i];
        let j = i;

        while (j >= gap && this.dataset[j - gap] > temp) {
          this.dataset[j] = this.dataset[j - gap];
          j -= gap;
        }
        this.dataset[j] = temp;
      }
      gap = Math.floor(gap / 2);
      if (gap <= 0) {
        clearInterval(interval);
      }
    }, this.animationSpeed * 4);
  }

  static toString() {
    return 'Shell Sort';
  }
}

export class CountingSort extends SortAlgorythm {
  sort(): void {
    let count: number[] = [];
    let z = 0;
    let max = Math.max(...this.dataset);

    for (let i = 0; i <= max; i++) {
      count[i] = 0;
    }
    for (let i = 0; i < this.dataset.length; i++) {
      count[this.dataset[i]]++;
    }
    for (let i = 0; i <= max; i++) {
      setTimeout(() => {
        while (count[i]-- > 0) {
          this.dataset[z++] = i;
        }
      }, (i + 1) * this.animationSpeed);
    }
  }

  static toString() {
    return 'Counting Sort';
  }
}

export class OddEvenSort extends SortAlgorythm {
  sort(): void {
    let arrayLength = this.dataset.length;
    let sort = false;
    let interval = setInterval(() => {
      sort = true;
      for (let i = 1; i < arrayLength - 1; i += 2) {
        if (this.dataset[i] <= this.dataset[i + 1]) continue;
        var temp = this.dataset[i];
        this.dataset[i] = this.dataset[i + 1];
        this.dataset[i + 1] = temp;
        sort = false;
      }
      for (var i = 0; i < arrayLength - 1; i += 2) {
        if (this.dataset[i] <= this.dataset[i + 1]) continue;
        var temp = this.dataset[i];
        this.dataset[i] = this.dataset[i + 1];
        this.dataset[i + 1] = temp;
        sort = false;
      }
      if (sort) {
        clearInterval(interval);
      }
    }, this.animationSpeed);
  }

  static toString() {
    return 'Odd Even Sort';
  }
}

export class CoctailSort extends SortAlgorythm {
  sort(): void {
    let arrayLength = this.dataset.length;
    let swapped = true;
    let start = 0;
    let end = arrayLength - 1;

    let interval = setInterval(() => {
      swapped = false;
      for (let i = start; i < end; i++) {
        if (this.dataset[i] > this.dataset[i + 1]) {
          let temp = this.dataset[i];
          this.dataset[i] = this.dataset[i + 1];
          this.dataset[i + 1] = temp;
          swapped = true;
        }
      }
      if (!swapped) {
        clearInterval(interval);
      }

      swapped = false;
      end--;

      for (let i = end - 1; i >= start; i--) {
        if (this.dataset[i] > this.dataset[i + 1]) {
          let temp = this.dataset[i];
          this.dataset[i] = this.dataset[i + 1];
          this.dataset[i + 1] = temp;
          swapped = true;
        }
      }

      start++;
    }, this.animationSpeed);
  }

  static toString() {
    return 'Coctail Sort';
  }
}

export class CycleSort extends SortAlgorythm {
  sort(): void {
    let arrayLength = this.dataset.length;
    for (let cycleStart = 0; cycleStart < arrayLength - 1; cycleStart++) {
      setTimeout(() => {
        let item = this.dataset[cycleStart];
        // Find where to put the item.
        let pos = cycleStart;
        for (let i = cycleStart + 1; i < arrayLength; i++) {
          if (this.dataset[i] < item) {
            pos++;
          }
        }
        // If the item is already there, this is not a cycle.
        if (pos !== cycleStart) {
          // Otherwise, put the item there or right after any duplicates.
          while (item == this.dataset[pos]) {
            pos++;
          }
          let temp = this.dataset[pos];
          this.dataset[pos] = item;
          item = temp;

          // Rotate the rest of the cycle.
          let interval = setInterval(() => {
            // Find where to put the item.
            pos = cycleStart;
            for (let i = cycleStart + 1; i < arrayLength; i++) {
              if (this.dataset[i] < item) {
                pos++;
              }
            }
            // Put the item there or right after any duplicates.
            while (item === this.dataset[pos]) {
              pos++;
            }
            let temp = this.dataset[pos];
            this.dataset[pos] = item;
            item = temp;
            if (pos === cycleStart) {
              clearInterval(interval);
            }
          }, this.animationSpeed);
        }
      }, (cycleStart + 1) * this.animationSpeed);
    }
  }

  static toString() {
    return 'Cycle Sort';
  }
}

export class GnomeSort extends SortAlgorythm {
  sort(): void {
    let arrayLength = this.dataset.length;
    let index = 0;
    let interval = setInterval(() => {
      if (index === 0 || this.dataset[index] >= this.dataset[index - 1]) {
        index++;
      } else {
        let temp = this.dataset[index];
        this.dataset[index] = this.dataset[index - 1];
        this.dataset[index - 1] = temp;
        index--;
      }

      if (index >= arrayLength) {
        clearInterval(interval);
      }
    }, this.animationSpeed / 100);
  }

  static toString() {
    return 'Gnome Sort';
  }
}

export class CombSort extends SortAlgorythm {
  sort(): void {
    let arrayLength = this.dataset.length;
    let gap = this.dataset.length;
    let shrink = 1.3;
    let noSwap = false;

    let interval = setInterval(() => {
      gap = Math.floor(gap / shrink);

      if (gap < 1) {
        gap = 1;
        noSwap = true;
      } else {
        noSwap = false;
      }

      let i = 0;

      while (i + gap < arrayLength) {
        if (this.dataset[i] > this.dataset[i + gap]) {
          let temp = this.dataset[i];
          this.dataset[i] = this.dataset[i + gap];
          this.dataset[i + gap] = temp;
        }
        i++;
      }
      if (noSwap) {
        clearInterval(interval);
      }
    }, this.animationSpeed);
  }

  static toString() {
    return 'Comb Sort';
  }
}

export class BogoSort extends SortAlgorythm {
  sort(): void {
    let interval = setInterval(() => {
      // if array isn't sorted, shuffle
      this.shuffle();
      if (this.isSorted()) {
        clearInterval(interval);
      }
    }, this.animationSpeed);
  }

  private shuffle() {
    for (var i = this.dataset.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.dataset[i];
      this.dataset[i] = this.dataset[j];
      this.dataset[j] = temp;
    }
  }

  private isSorted() {
    let arrayLength = this.dataset.length;
    for (let i = 0; i < arrayLength - 1; i++) {
      if (this.dataset[i] > this.dataset[i + 1]) {
        return false;
      }
    }
    return true;
  }

  static toString() {
    return 'Bogo Sort';
  }
}

export class PancakeSort extends SortAlgorythm {
  sort(): void {
    let arrayLength = this.dataset.length;
    let interval = setInterval(() => {
      // Find index of the maximum element in arr
      let mi = this.findMax(this.dataset, arrayLength);
      // Move the maximum element to end of current
      // array if it's not already at the end
      if (mi !== arrayLength - 1) {
        // To move at the end, first move maximum number to beginning
        this.flip(mi);
        // Now move the maximum number to end by reversing current array
        this.flip(arrayLength - 1);
      }
      arrayLength--;

      if (arrayLength <= 0) {
        clearInterval(interval);
      }
    }, this.animationSpeed);
  }

  private findMax(arr: number[], arrayLength: number) {
    let mi = 0;
    for (let i = 0; i < arrayLength; i++) {
      if (arr[i] > arr[mi]) {
        mi = i;
      }
    }
    return mi;
  }

  private flip(i: number) {
    let start = 0;
    while (start < i) {
      let temp = this.dataset[start];
      this.dataset[start] = this.dataset[i];
      this.dataset[i] = temp;
      start += 1;
      i -= 1;
    }
  }

  static toString() {
    return 'Pancake Sort';
  }
}

export class StoogeSort extends SortAlgorythm {
  sort(): void {
    let arrayLength = this.dataset.length;
    this.stoogeSort(this.dataset, 0, arrayLength - 1, 0);
  }

  private stoogeSort(arr: number[], i: number, h: number, depth: number) {
    if (i >= h) {
      return;
    }
    // If first element is smaller than last,swap them
    if (arr[i] > arr[h]) {
      let temp = arr[i];
      arr[i] = arr[h];
      arr[h] = temp;
    }
    // If there are more than 2 elements in the array
    if (h - i + 1 > 2) {
      let t = Math.floor((h - i + 1) / 3);
      // Recursively sort first 2/3 elements
      setTimeout(() => {
        this.stoogeSort(arr, i, h - t, depth + 100000);
      }, this.animationSpeed / depth);
      // Recursively sort last 2/3 elements
      setTimeout(() => {
        this.stoogeSort(arr, i + t, h, depth + 100000);
      }, this.animationSpeed / depth);
      // Recursively sort first 2/3 elements again to confirm
      setTimeout(() => {
        this.stoogeSort(arr, i, h - t, depth + 100000);
      }, this.animationSpeed / depth);
    }
  }

  static toString() {
    return 'Stooge Sort';
  }
}
