import SortingAlgorithm from './SortingAlgorithm';
import { sleep } from 'src/helpers/helper';

export default class CycleSort extends SortingAlgorithm {
  static description: string = `
      <p>
        Cycle sort is an in-place sorting Algorithm, 
        <a href="https://en.wikipedia.org/wiki/Sorting_algorithm#Stability" target="_blank" rel="noreferrer">unstable sorting algorithm</a>, 
        a comparison sort that is theoretically optimal in terms of the total 
        number of writes to the original array. 
      </p>
      <ul>
        <li>
          It is optimal in terms of number of memory writes. 
          It minimizes the number of memory writes to sort (Each value is either 
          written zero times, if it’s already in its correct position, or written 
          one time to its correct position.)
        </li>
        <li>
          It is based on the idea that array to be sorted can be divided 
          into cycles. Cycles can be visualized as a graph. We have n nodes 
          and an edge directed from node i to node j if the element at i-th 
          index must be present at j-th index in the sorted array. 
        </li>
        <li>
          We one by one consider all cycles. We first consider the cycle that 
          includes first element. We find correct position of first element, 
          place it at its correct position, say j. We consider old value of arr[j] 
          and find its correct position, we keep doing this till all elements of 
          current cycle are placed at correct position, i.e., we don’t come back 
          to cycle starting point.
        </li>
      </ul>`;
  static specifications: string = `
    <p>
      <b>Time Complexity</b>: O(n2)  
    </p>
    <p>
      <b>Worst Case</b>: O(n2) 
    </p>
    <p>
      <b>Average Case</b>: O(n2)
    </p>
    <p> 
      <b>Best Case</b>: O(n2)
    </p>
    <p>
      <b>Use cases</b>: This sorting algorithm is best suited for 
      situations where memory write or swap operations are costly. 
    </p>`;
  static code: string = `
      <pre>
  def cycle_sort(array):
    writes = 0
      
    # Loop through the array to find cycles to rotate.
    for cycle_start in range(0, len(array) - 1):
      item = array[cycle_start]
        
      # Find where to put the item.
      pos = cycle_start
      for i in range(cycle_start + 1, len(array)):
        if array[i] < item:
          pos += 1
        
      # If the item is already there, this is not a cycle.
      if pos == cycle_start:
        continue
        
      # Otherwise, put the item there or right after any duplicates.
      while item == array[pos]:
        pos += 1
      array[pos], item = item, array[pos]
      writes += 1
        
      # Rotate the rest of the cycle.
      while pos != cycle_start:
          
        # Find where to put the item.
        pos = cycle_start
        for i in range(cycle_start + 1, len(array)):
          if array[i] < item:
            pos += 1
          
        # Put the item there or right after any duplicates.
        while item == array[pos]:
          pos += 1
        array[pos], item = item, array[pos]
        writes += 1
      
    return writes
    </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/cycle-sort/'];

  async sort() {
    let arrayLength = this.dataset.length;
    for (let cycleStart = 0; cycleStart < arrayLength - 1; cycleStart++) {
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
        await sleep(this.animationSpeed);
        this.dataset[pos] = item;
        item = temp;

        // Rotate the rest of the cycle.
        while (pos !== cycleStart) {
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
          await sleep(this.animationSpeed);
          this.dataset[pos] = item;
          item = temp;
        }
      }
    }
  }

  static toString() {
    return 'Cycle Sort';
  }
}
