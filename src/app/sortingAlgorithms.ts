export interface ISortingAlgorithm {
  sortedDataset: number[];
  animationSpeed: number;
  dataset: number[];
  sort: () => void;
}

export abstract class SortingAlgorithm implements ISortingAlgorithm {
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

export class SelectionSort extends SortingAlgorithm {
  static description: string = `
    <p>
      The selection sort algorithm sorts an array by repeatedly finding the
      minimum element (considering ascending order) from unsorted part and
      putting it at the beginning. The algorithm maintains two subarrays in
      a given array.
    </p>
    <p>
      1) The subarray which is already sorted. <br />
      2) Remaining subarray which is unsorted.
    </p>
    <p>
      In every iteration of selection sort, the minimum element (considering
      ascending order) from the unsorted subarray is picked and moved to the
      sorted subarray.
    </p>
    <p>Following example explains the above steps:</p>
    <pre>
arr[] = 64 25 12 22 11

// Find the minimum element in arr[0...4]
// and place it at beginning
11 25 12 22 64

// Find the minimum element in arr[1...4]
// and place it at beginning of arr[1...4]
11 12 25 22 64

// Find the minimum element in arr[2...4]
// and place it at beginning of arr[2...4]
11 12 22 25 64

// Find the minimum element in arr[3...4]
// and place it at beginning of arr[3...4]
11 12 22 25 64 
  </pre>`;
  static specifications: string = `
    <p><b>Time Complexity</b>: O(n2) as there are two nested loops.</p>
    <p>
      <b>Auxiliary Space:</b> O(1) The good thing about selection sort is it
      never makes more than O(n) swaps and can be useful when memory write
      is a costly operation.
    </p>
    `;
  static code: string = `
    <pre>
def selection_sort(arr):

  # Traverse through all array elements
  for i in range(len(arr)):
          
      # Find the minimum element in remaining 
      # unsorted array
      min_idx = i
      for j in range(i + 1, len(arr)):
          if arr[min_idx] > arr[j]:
              min_idx = j
                  
      # Swap the found minimum element with 
      # the first element        
      arr[i], arr[min_idx] = arr[min_idx], arr[i]
    </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/selection-sort/'];

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

export class BubbleSort extends SortingAlgorithm {
  static description: string = `
    <p>
      Bubble Sort is the simplest sorting algorithm that works 
      by repeatedly swapping the adjacent elements if they are in wrong order.
    </p>
    <p>
      Example:
    </p>
    <p>1st pass:</p>
    <pre>
arr[] = 64 25 12 22 11
( 5 1 4 2 8 ) –> ( 1 5 4 2 8 ), Here, algorithm compares the first two elements, and swaps since 5 > 1.
( 1 5 4 2 8 ) –>  ( 1 4 5 2 8 ), Swap since 5 > 4
( 1 4 5 2 8 ) –>  ( 1 4 2 5 8 ), Swap since 5 > 2
( 1 4 2 5 8 ) –> ( 1 4 2 5 8 ), Now, since these elements are already in order (8 > 5), algorithm does not swap them.
    </pre>
    <p>2nd pass:</p>
    <pre>
arr[] = 64 25 12 22 11
( 1 4 2 5 8 ) –> ( 1 4 2 5 8 )
( 1 4 2 5 8 ) –> ( 1 2 4 5 8 ), Swap since 4 > 2
( 1 2 4 5 8 ) –> ( 1 2 4 5 8 )
( 1 2 4 5 8 ) –>  ( 1 2 4 5 8 )
    </pre>
    <p>Now, the array is already sorted, but our algorithm does
     not know if it is completed. The algorithm needs one whole 
     pass without any swap to know it is sorted.
     </p>
     <p>3rd pass:</p>
     <pre>
( 1 2 4 5 8 ) –> ( 1 2 4 5 8 )
( 1 2 4 5 8 ) –> ( 1 2 4 5 8 )
( 1 2 4 5 8 ) –> ( 1 2 4 5 8 )
( 1 2 4 5 8 ) –> ( 1 2 4 5 8 )
     </pre>
     <p>
        Due to its simplicity, bubble sort is often used to introduce 
        the concept of a sorting algorithm.
        In computer graphics it is popular for its capability to detect a very small 
        error (like swap of just two elements) in almost-sorted arrays and fix it with just 
        linear complexity (2n). For example, it is used in a polygon filling algorithm, 
        where bounding lines are sorted by their x coordinate at a specific scan line (a 
        line parallel to x axis) and with incrementing y their order changes (two elements are swapped)
        only at intersections of two lines 
     </p>
    `;
  static specifications: string = `
    <p>
      <b>Worst and Average Case Time Complexity</b>: O(n*n). Worst case occurs when array is reverse sorted.
    </p>
    <p>
      <b>Best Case Time Complexity</b>: O(n). Best case occurs when array is already sorted.
    </p>
    <p>
      <b>Auxiliary Space</b>: O(1)
    </p>
    <p>
      <b>Boundary Cases</b>: Bubble sort takes minimum time (Order of n) when elements are already sorted.
    </p>
    `;
  static code: string = `
    <pre>
def bubble_sort(arr):
  n = len(arr)

  # Traverse through all array elements
  for i in range(n):

      # Last i elements are already in place
      for j in range(0, n - i - 1):

          # traverse the array from 0 to n - i - 1
          # Swap if the element found is greater
          # than the next element
          if arr[j] > arr[j + 1] :
              arr[j], arr[j + 1] = arr[j + 1], arr[j]
  </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/bubble-sort/'];

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

export class InsertionSort extends SortingAlgorithm {
  static description: string = `
    <p>
      Insertion sort is a simple sorting algorithm 
      that works similar to the way you sort playing cards in your hands. 
      The array is virtually split into a sorted and an unsorted part. 
      Values from the unsorted part are picked and placed at the correct position in the sorted part.
    </p>
    <h3>
      Algorithm 
    </h3>
    <p>
      To sort an array of size n in ascending order: 
    </p>
    <ul>
      <li>Iterate from arr[1] to arr[n] over the array.</li>
      <li>Compare the current element (key) to its predecessor.</li>
      <li>If the key element is smaller than its predecessor, compare it to 
      the elements before. Move the greater elements one position up to make space 
      for the swapped element.</li>
    </ul>
    <h3>Example:</h3>
    <pre>
      <b>12</b>, 11, 13, 5, 6
    </pre>
    <p>
      Let us loop for i = 1 (second element of the array) to 4 (last element of the array)
      i = 1. Since 11 is smaller than 12, move 12 and insert 11 before 12 
    </p>
    <pre>
      <b>11, 12,</b> 13, 5, 6
    </pre>
    <p>
      i = 2. 13 will remain at its position as all elements in A[0..I-1] are smaller than 13 
    </p>
    <pre>
      <b>11, 12, 13,</b> 5, 6
    </pre>
    <p>
      i = 3. 5 will move to the beginning and all other elements from 11 
      to 13 will move one position ahead of their current position. 
    </p>
    <pre>
      <b>5, 11, 12, 13,</b> 6
    </pre>
    <p>
      i = 4. 6 will move to position after 5, and elements 
      from 11 to 13 will move one position ahead of their current position. 
    </p>
    <pre>
      <b>5, 6, 11, 12, 13 </pre>
    </p>
    `;
  static specifications: string = `
      <p>
        <b>Time Complexity</b>: O(n*2)
      </p>
      <p>
        <b>Auxiliary Space</b>: O(1)
      </p>
      <p>
        <b>Boundary Cases</b>: Insertion sort takes maximum time to 
        sort if elements are sorted in reverse order. And it takes 
        minimum time (Order of n) when elements are already sorted.
      </p>
      <p>
        <b>Algorithmic Paradigm</b>: Incremental Approach
      </p>
      <p>
        <b>Uses</b>: Insertion sort is used when number of elements is small. 
        It can also be useful when input array is almost sorted, only few elements 
        are misplaced in complete big array.
      </p>
    `;
  static code: string = `
    <pre>
def insertion_sort(arr):
  
    # Traverse through 1 to len(arr)
    for i in range(1, len(arr)):
  
        key = arr[i]
  
        # Move elements of arr[0..i-1], that are
        # greater than key, to one position ahead
        # of their current position
        j = i - 1
        while j >= 0 and key < arr[j] :
                arr[j + 1] = arr[j]
                j -= 1
        arr[j + 1] = key
    </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/insertion-sort/'];

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

export class HeapSort extends SortingAlgorithm {
  static description: string = `
    <p>
      Heap sort is a comparison based sorting 
      technique based on Binary Heap data structure. 
      It is similar to selection sort where we first 
      find the maximum element and place the maximum element at the end. 
      We repeat the same process for the remaining elements.
    </p>
    <h3>What is Binary Heap?</h3>
    <p>
      Let us first define a Complete Binary Tree. A complete binary tree is a binary tree in which every level, 
      except possibly the last, is completely filled, and all nodes are as far left as possible 
      (Source <a href="http://en.wikipedia.org/wiki/Binary_tree#Types_of_binary_trees" target="_blank" rel="noreferrer">Wikipedia</a>)
      A Binary Heap is a Complete Binary Tree where items are stored in a special order such that 
      value in a parent node is greater(or smaller) than the values in its two children nodes. 
      The former is called as max heap and the latter is called min-heap. The heap can be represented 
      by a binary tree or array.
    </p>
    <h3>Why array based representation for Binary Heap?</h3>
    <p>
      Since a Binary Heap is a Complete Binary Tree, it can be easily represented as an array 
      and the array-based representation is space-efficient. If the parent node is stored at index I, 
      the left child can be calculated by 2 * I + 1 and right child by 2 * I + 2 (assuming the indexing starts at 0).
    </p>
    <h3>Heap Sort Algorithm for sorting in increasing order:</h3>
    <ul>
      <li>Build a max heap from the input data. </li>
      <li>At this point, the largest item is stored at the root of the heap. 
      Replace it with the last item of the heap followed by reducing the size of heap by 1. 
      Finally, heapify the root of the tree. </li>
      <li>Repeat step 2 while size of heap is greater than 1.</li>
    </ul>
    <h3>How to build the heap? </h3>
    <p>
      Heapify procedure can be applied to a node only if its children nodes are heapified. 
      So the heapification must be performed in the bottom-up order.
      Lets understand with the help of an example:
    </p>
    <pre>
    Input data: 4, 10, 3, 5, 1
      4(0)
    /   \\
  10(1)   3(2)
  /   \\
5(3)  1(4)

The numbers in bracket represent the indices in the array 
representation of data.

Applying heapify procedure to index 1:

      4(0)
    /   \\
  10(1)    3(2)
  /   \\
5(3)  1(4)

Applying heapify procedure to index 0:

    10(0)
    /  \\
  5(1)  3(2)
  /   \\
4(3)  1(4)

The heapify procedure calls itself recursively to build heap
in top down manner.
  </pre >`;
  static specifications: string = `
    <p>
      <b>Time complexity of heapify</b>: O(Logn)
    </p>
    <p>
        <b>Time complexity of createAndBuildHeap():</b> O(n)
    </p>
    <p>
        <b>Overall time complexity of Heap Sort:</b> O(nLogn)
    </p>
    `;
  static code: string = `
    <pre>
# To heapify subtree rooted at index i.
# n is size of heap
  
  
def heapify(arr, n, i):
    largest = i  # Initialize largest as root
    l = 2 * i + 1     # left = 2 * i + 1
    r = 2 * i + 2     # right = 2 * i + 2
  
    # See if left child of root exists and is
    # greater than root
    if l < n and arr[largest] < arr[l]:
        largest = l
  
    # See if right child of root exists and is
    # greater than root
    if r < n and arr[largest] < arr[r]:
        largest = r
  
    # Change root, if needed
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]  # swap
  
        # Heapify the root.
        heapify(arr, n, largest)
  
# The main function to sort an array of given size  
  
def heap_sort(arr):
    n = len(arr)
  
    # Build a maxheap.
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
  
    # One by one extract elements
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]  # swap
        heapify(arr, i, 0)
    </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/heap-sort/'];

  sort() {
    let arrayLength = this.dataset.length;

    let iter = 0;
    // Build a maxheap
    for (let i = arrayLength; i > -1; i--) {
      setTimeout(() => {
        this.heapify(this.dataset, arrayLength, i);
        iter++;
      }, (iter + 1) * this.animationSpeed);
    }

    let iter2 = 0;
    // One by one extract elements
    for (let i = arrayLength - 1; i > 0; i--) {
      setTimeout(() => {
        let temp = this.dataset[i];
        this.dataset[i] = this.dataset[0];
        this.dataset[0] = temp;
        this.heapify(this.dataset, i, 0);
        iter2++;
      }, (iter2 + this.animationSpeed / 2) * this.animationSpeed);
    }
  }

  private heapify(arr: number[], heap_size: number, root_index: number) {
    let largest = root_index;
    let left_child = 2 * root_index + 1;
    let right_child = 2 * root_index + 2;

    // See if left child of root exists and is
    // greater than root
    if (left_child < heap_size && arr[left_child] > arr[largest]) {
      largest = left_child;
    }
    //  See if right child of root exists and is
    //  greater than root
    if (right_child < heap_size && arr[right_child] > arr[largest]) {
      largest = right_child;
    }
    // Change root, if needed
    if (largest !== root_index) {
      let temp = arr[root_index];
      arr[root_index] = arr[largest];
      arr[largest] = temp;
      // Heapify the root.
      this.heapify(arr, heap_size, largest);
    }
  }

  static toString() {
    return 'Heap Sort';
  }
}

export class ShellSort extends SortingAlgorithm {
  static description: string = `
    <p>
      ShellSort is mainly a variation of Insertion Sort. In insertion sort, 
      we move elements only one position ahead. When an element has to be moved far ahead, 
      many movements are involved. The idea of shellSort is to allow exchange of far items. 
      In shellSort, we make the array h-sorted for a large value of h. We keep reducing the value of h 
      until it becomes 1. An array is said to be h-sorted if all sublists of every h’th element is sorted.
    </p>`;
  static specifications: string = `
    <p>
      <b>Time Complexity</b>: Time complexity of above implementation of shellsort is O(n2). 
      In the above implementation gap is reduce by half in every iteration. 
      There are many other ways to reduce gap which lead to better time complexity.
    </p>`;
  static code: string = `
    <pre>
def shell_sort(arr):

  # Start with a big gap, then reduce the gap
  n = len(arr)
  gap = n // 2

  # Do a gapped insertion sort for this gap size.
  # The first gap elements a[0..gap-1] are already in gapped 
  # order keep adding one more element until the entire array
  # is gap sorted
  while gap > 0:

      for i in range(gap, n):

          # add a[i] to the elements that have been gap sorted
          # save a[i] in temp and make a hole at position i
          temp = arr[i]

          # shift earlier gap-sorted elements up until the correct
          # location for a[i] is found
          j = i
          while  j >= gap and arr[j - gap] > temp:
              arr[j] = arr[j - gap]
              j -= gap

          # put temp (the original a[i]) in its correct location
          arr[j] = temp
      gap //= 2
  </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/shellsort/'];

  sort() {
    let gap = Math.floor(this.dataset.length / 2);
    let arrayLength = this.dataset.length;
    let interval = setInterval(() => {
      if (gap <= 0) {
        clearInterval(interval);
      }

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
    }, this.animationSpeed * 4);
  }

  static toString() {
    return 'Shell Sort';
  }
}

export class CountingSort extends SortingAlgorithm {
  static description: string = `
    <p>
      Counting sort is a sorting technique based on keys between a specific range. 
      It works by counting the number of objects having distinct key values (kind of hashing). 
      Then doing some arithmetic to calculate the position of each object in the output sequence.
      Let us understand it with the help of an example. 
    </p>
    <p>
      For simplicity, consider the data in the range 0 to 9. 
    </p>
    <p>
      Input data: 1, 4, 1, 2, 7, 5, 2
    </p>
    <h3>1) Take a count array to store the count of each unique object.</h3>
    <pre>
  Index:     0  1  2  3  4  5  6  7  8  9
  Count:     0  2  2  0  1  1  0  1  0  0
    </pre>
    <h3>2) Modify the count array such that each element at each index stores the sum of previous counts. </h3>
    <pre>
  Index:     0  1  2  3  4  5  6  7  8  9
  Count:     0  2  4  4  5  6  6  7  7  7
    </pre>
    <p>
      The modified count array indicates the position of each object in 
      the output sequence.
    </p>
    <h3>3) Output each object from the input sequence followed by decreasing its count by 1.</h3>
    <p>
      Process the input data: 1, 4, 1, 2, 7, 5, 2. Position of 1 is 2.
      Put data 1 at index 2 in output. Decrease count by 1 to place 
      next data 1 at an index 1 smaller than this index.
    </p>`;
  static specifications: string = `
    <p>
      <b>Time Complexity</b>: O(n + k) where n is the number of elements in input array and k is the range of input. 
    </p>    
    <p>
      <b>Auxiliary Space</b>: O(n + k)
    </p>
    `;
  static code: string = `
    <pre>
def count_sort(arr):
  
    # The output character array that will have sorted arr
    output = [0 for i in range(len(arr))]
  
    # Create a count array to store count of inidividual
    # characters and initialize count array as 0
    count = [0 for i in range(256)]
  
    # For storing the resulting answer since the
    # string is immutable
    ans = ["" for _ in arr]
  
    # Store count of each character
    for i in arr:
        count[ord(i)] += 1
  
    # Change count[i] so that count[i] now contains actual
    # position of this character in output array
    for i in range(256):
        count[i] += count[i - 1]
  
    # Build the output character array
    for i in range(len(arr)):
        output[count[ord(arr[i])] - 1] = arr[i]
        count[ord(arr[i])] -= 1
  
    # Copy the output array to arr, so that arr now
    # contains sorted characters
    for i in range(len(arr)):
        ans[i] = output[i]
    return ans
    </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/counting-sort/'];

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

export class OddEvenSort extends SortingAlgorithm {
  static description: string = `
    <p>
      This is basically a variation of bubble-sort. This algorithm is
      divided into two phases- Odd and Even Phase.
      The algorithm runs until the array elements are sorted and in 
      each iteration two phases occurs- Odd and Even Phases.
    </p>
    <p>
      In the odd phase, we perform a bubble sort on odd indexed elements and in the even phase, 
      we perform a bubble sort on even indexed elements.
    </p>
    <p>
      We demonstrate the above algorithm using the below illustration on the array = [3, 2, 3, 8, 5, 6, 4, 1]
    </p>
    <p>
      <img src="https://www.geeksforgeeks.org/wp-content/uploads/odd-even-sort.png">
    </p>
    `;
  static specifications: string = `
    <p>
      <b>Time Complexity</b>: O(N2) where, N = Number of elements in the input array.
    </p>
    <p>
      <b>Auxiliary Space</b>: O(1). Just like bubble sort this is also an in-place algorithm.
    </p>`;
  static code: string = `
    <pre>
def odd_even_sort(arr, n):
  # Initially array is unsorted
  is_sorted = 0
  while not is_sorted:
      is_sorted = True
      temp = 0
      for i in range(1, n - 1, 2):
          if arr[i] > arr[i + 1]:
              arr[i], arr[i + 1] = arr[i + 1], arr[i]
              is_sorted = False
                
      for i in range(0, n - 1, 2):
          if arr[i] > arr[i + 1]:
              arr[i], arr[i + 1] = arr[i + 1], arr[i]
              is_sorted = False
    
  return
  </pre>`;
  static sources: string[] = [
    'https://www.geeksforgeeks.org/odd-even-sort-brick-sort/',
  ];

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

export class CocktailSort extends SortingAlgorithm {
  static description: string = `
  <p>
    Cocktail Sort is a variation of Bubble sort. 
    The Bubble sort algorithm always traverses elements from left and moves 
    the largest element to its correct position in first iteration and 
    second largest in second iteration and so on. Cocktail Sort traverses 
    through a given array in both directions alternatively. 
  </p>
  <h3>Algorithm:</h3>
  <p>
    Each iteration of the algorithm is broken up into 2 stages: 
  </p>
  <ul>
    <li>
      The first stage loops through the array from left to right, 
      just like the Bubble Sort. During the loop, adjacent items 
      are compared and if value on the left is greater than the 
      value on the right, then values are swapped. At the end of 
      first iteration, largest number will reside at the end of the array.
    </li>
    <li>
      The second stage loops through the array in opposite direction - starting 
      from the item just before the most recently sorted item, and moving back 
      to the start of the array. Here also, adjacent items are compared and are swapped if required.
    </li>
  </ul>
  <h3>Example:</h3>
  <p>Let us consider an example array = [5, 1, 4, 2, 8, 0, 2]</p>
  <h4>First Forward Pass:</h4>
  <pre>
  (5 1 4 2 8 0 2) ? (1 5 4 2 8 0 2), Swap since 5 > 1 
  (1 5 4 2 8 0 2) ? (1 4 5 2 8 0 2), Swap since 5 > 4 
  (1 4 5 2 8 0 2) ? (1 4 2 5 8 0 2), Swap since 5 > 2 
  (1 4 2 5 8 0 2) ? (1 4 2 5 8 0 2) 
  (1 4 2 5 8 0 2) ? (1 4 2 5 0 8 2), Swap since 8 > 0 
  (1 4 2 5 0 8 2) ? (1 4 2 5 0 2 8), Swap since 8 > 2
  </pre>
  <p>
    After first forward pass, greatest element of the array will be present at the last index of array.
  </p>
  <h4>First Backward Pass:</h4>
  <pre>
  (1 4 2 5 0 2 8) ? (1 4 2 5 0 2 8) 
  (1 4 2 5 0 2 8) ? (1 4 2 0 5 2 8), Swap since 5 > 0 
  (1 4 2 0 5 2 8) ? (1 4 0 2 5 2 8), Swap since 2 > 0 
  (1 4 0 2 5 2 8) ? (1 0 4 2 5 2 8), Swap since 4 > 0 
  (1 0 4 2 5 2 8) ? (0 1 4 2 5 2 8), Swap since 1 > 0
  </pre>
  <p>
    After first backward pass, smallest element of the array will be present at 
    the first index of the array.
  </p>
  <h4>Second Forward Pass:</h4>
  <pre>
  (0 1 4 2 5 2 8) ? (0 1 4 2 5 2 8) 
  (0 1 4 2 5 2 8) ? (0 1 2 4 5 2 8), Swap since 4 > 2 
  (0 1 2 4 5 2 8) ? (0 1 2 4 5 2 8) 
  (0 1 2 4 5 2 8) ? (0 1 2 4 2 5 8), Swap since 5 > 2
  </pre>
  <h4>Second Backward Pass:</h4>
  <pre>
  (0 1 2 4 2 5 8) ? (0 1 2 2 4 5 8), Swap since 4 > 2
  </pre>
  <p>
    Now, the array is already sorted, but our algorithm doesn’t 
    know if it is completed. The algorithm needs to complete this 
    whole pass without any swap to know it is sorted. 
  </p>
  <pre>
  (0 1 2 2 4 5 8) ? (0 1 2 2 4 5 8) 
  (0 1 2 2 4 5 8) ? (0 1 2 2 4 5 8)
  </pre>
  `;
  static specifications: string = `
  <p>
    <b>Worst and Average Case Time Complexity</b>: O(n*n). 
  </p>
  <p>
    <b>Best Case Time Complexity</b>: O(n). Best case occurs when array is already sorted.
  </p>
  <p>
    <b>Auxiliary Space</b>: O(1)
  </p>
  <p>
    <b>Comparison with Bubble Sort</b>: Time complexities are same, but Cocktail performs 
    better than Bubble Sort. Typically cocktail sort is less than two times faster than 
    bubble sort. Consider the example (2, 3, 4, 5, 1). Bubble sort requires four 
    traversals of array for this example, while Cocktail sort requires only two traversals.
  </p>
  `;
  static code: string = `
  <pre>
def cocktail_sort(a):
  n = len(a)
  swapped = True
  start = 0
  end = n - 1
  while swapped:

      # reset the swapped flag on entering the loop,
      # because it might be true from a previous
      # iteration.
      swapped = False

      # loop from left to right same as the bubble
      # sort
      for i in range(start, end):
          if (a[i] > a[i + 1]):
              a[i], a[i + 1] = a[i + 1], a[i]
              swapped = True

      # if nothing moved, then array is sorted.
      if not swapped:
          break

      # otherwise, reset the swapped flag so that it
      # can be used in the next stage
      swapped = False

      # move the end point back by one, because
      # item at the end is in its rightful spot
      end -= 1

      # from right to left, doing the same
      # comparison as in the previous stage
      for i in range(end - 1, start - 1, -1):
          if (a[i] > a[i + 1]):
              a[i], a[i + 1] = a[i + 1], a[i]
              swapped = True

      # increase the starting point, because
      # the last stage would have moved the next
      # smallest number to its rightful spot.
      start += 1
  </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/cocktail-sort/'];

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
    return 'Cocktail Sort';
  }
}

export class CycleSort extends SortingAlgorithm {
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

export class GnomeSort extends SortingAlgorithm {
  static description: string = `
    <p>
      Gnome Sort also called Stupid sort is based on 
      the concept of a Garden Gnome sorting his flower pots. 
      A garden gnome sorts the flower pots by the following method:
    </p>
    <ul>
      <li>
        He looks at the flower pot next to him and the previous one; 
        if they are in the right order he steps one pot forward, otherwise 
        he swaps them and steps one pot backwards.
      </li>
      <li>
        If there is no previous pot (he is at the starting of the pot line), 
        he steps forwards; if there is no pot next to him (he is at the end 
        of the pot line), he is done.
      </li>
    </ul>
    <h3>Algorithm:</h3>
    <ul>
        <li>
          If you are at the start of the array then go to the right 
          element (from arr[0] to arr[1]).
        </li>
        <li>
          If the current array element is larger or equal to the previous 
          array element then go one step right
        </li>
        <li>
          If the current array element is smaller than the previous array 
          element then swap these two elements and go one step backwards
        </li>
        <li>
          Repeat steps 2) and 3) till ‘i’ reaches the end of the array (i.e- ‘n-1’)
        </li>
        <li>
          If the end of the array is reached then stop and the array is sorted.
        </li>
    </ul>
    <h3>Example:</h3>
    <p>
        Array = [34, 2, 10, -9] <br>
        <b><u>Underlined</u></b> elements are the pair under consideration. <br>
        <span class="red">“Red”</span> colored are the pair which needs to be swapped <br>
        Result of the swapping is colored as <span class="blue">“blue”</span>
    </p>
    <p>
      <img src="https://www.geeksforgeeks.org/wp-content/uploads/gnomesort.png">    
    </p>
    `;
  static specifications: string = `
  <p>
    <b>Time Complexity</b>: As there are no nested loop (only one while) it may seem that this is a linear O(N) time algorithm. But the time complexity is O(N^2). This is because the variable – ‘index’ in our program doesn’t always gets incremented, it gets decremented too.
    However this sorting algorithm is adaptive and performs better if the array is already/partially sorted.
  </p>
  <p>
    <b>Auxiliary Space</b>: This is an in-place algorithm. So O(1) auxiliary space is needed.
  </p>`;
  static code: string = `
    <pre>
def gnome_sort(arr, n):
  index = 0
  while index < n:
      if index == 0:
          index += 1
      if arr[index] >= arr[index - 1]:
          index += 1
      else:
          arr[index], arr[index - 1] = arr[index - 1], arr[index]
          index -= 1

  return arr
  </pre>`;
  static sources: string[] = [
    'https://www.geeksforgeeks.org/gnome-sort-a-stupid-one/',
  ];

  sort(): void {
    let arrayLength = this.dataset.length;
    let counter = 1;
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
      counter++;

      if (index >= arrayLength) {
        clearInterval(interval);
      }
    }, this.animationSpeed / (counter * 1000000));
  }

  static toString() {
    return 'Gnome Sort';
  }
}

export class CombSort extends SortingAlgorithm {
  static description: string = `
    <p>
      Comb Sort is mainly an improvement over Bubble Sort. 
      Bubble sort always compares adjacent values. So all inversions are 
      removed one by one. Comb Sort improves on Bubble Sort by using gap of 
      size more than 1. The gap starts with a large value and shrinks by a 
      factor of 1.3 in every iteration until it reaches the value 1. 
      Thus Comb Sort removes more than one inversion counts with one swap 
      and performs better than Bubble Sort.
    </p>
    <p>
      The shrink factor has been empirically found to be 1.3 
      (by <a href="https://en.wikipedia.org/wiki/Comb_sort" target="_blank" rel="noreferrer">testing Combsort</a> 
      on over 200,000 random lists)
    </p>
    <p>
      Although, it works better than Bubble Sort on average, worst case remains O(n2).
    </p>
    <h3>Illustration:</h3>
    <p>
      Let the array elements be = [8, 4, 1, 56, 3, -44, 23, -6, 28, 0]
    </p>
    <p>
      Initially gap value = 10 <br>
      After shrinking gap value => 10 / 1.3 = 7; 
    </p>
    <pre>
    8 4 1 56 3 -44 23 -6 28 0
    -6 4 1 56 3 -44 23  8 28 0
    -6 4 0 56 3 -44 23  8 28 1
    </pre>
    <p>
      New gap value => 7 / 1.3 = 5;  
    </p>
    <pre>
    -44 4 0 56 3 -6 23 8 28 1
    -44 4 0 28 3 -6 23 8 56 1
    -44 4 0 28 1 -6 23 8 56 3
    </pre>
    <p>
      New gap value => 5 / 1.3 = 3; 
    </p>
    <pre>
    -44 1  0 28 4 -6 23 8 56 3
    -44 1 -6 28 4  0 23 8 56 3
    -44 1 -6 23 4  0 28 8 56 3
    -44 1 -6 23 4  0  3 8 56 28
    </pre>
    <p>
      New gap value => 3 / 1.3 = 2;  
    </p>
    <pre>
    -44 1 -6 0 4 23 3 8 56 28
    -44 1 -6 0 3 23 4 8 56 28
    -44 1 -6 0 3 8 4 23 56 28
    </pre>
    <p>
      New gap value => 2 / 1.3 = 1;  
    </p>
    <pre>
    -44 -6 1 0 3 8 4 23 56 28
    -44 -6 0 1 3 8 4 23 56 28
    -44 -6 0 1 3 4 8 23 56 28
    -44 -6 0 1 3 4 8 23 28 56 

    no more swaps required (Array sorted)
    </pre>
    `;
  static specifications: string = `
  <p>
    <b>Time Complexity</b>: Average case time complexity of the algorithm is Ω(N2/2p), 
    where p is the number of increments. The worst-case complexity of this 
    algorithm is O(n2) and the Best Case complexity is O(nlogn). 
  </p>
  <p>
    <b>Auxiliary Space</b>: O(1).   
  </p>
    `;
  static code: string = `
    <pre>
# To find next gap from current
def get_next_gap(gap):

  # Shrink gap by Shrink factor
  gap = (gap * 10) / 13
  if gap < 1:
      return 1
  return gap
      
# Function to sort arr[] using Comb Sort
def comb_sort(arr):
  n = len(arr)

  # Initialize gap
  gap = n

  # Initialize swapped as true to make sure that
  # loop runs
  swapped = True

  # Keep running while gap is more than 1 and last
  # iteration caused a swap
  while gap != 1 or swapped == 1:

      # Find next gap
      gap = get_next_gap(gap)

      # Initialize swapped as false so that we can
      # check if swap happened or not
      swapped = False

      # Compare all elements with current gap
      for i in range(0, n - gap):
          if arr[i] > arr[i + gap]:
              arr[i], arr[i + gap] = arr[i + gap], arr[i]
              swapped = True
  </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/comb-sort/'];

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

export class BogoSort extends SortingAlgorithm {
  static description: string = `
    <p>
      BogoSort also known as permutation sort, stupid sort, slow sort, 
      shotgun sort or monkey sort is a particularly ineffective algorithm 
      based on generate and test paradigm. 
    </p>
    <p>
      The algorithm successively generates permutations of its 
      input until it finds one that is sorted.
    </p>
    <p>
      For example, if bogosort is used to sort a deck of cards, it would 
      consist of checking if the deck were in order, and if it were not, 
      one would throw the deck into the air, pick the cards up at random, 
      and repeat the process until the deck is sorted.
    </p>
    <h3>PseudoCode:</h3>
    <pre>
while not Sorted(list) do
    shuffle (list)
done
  </pre>
  <h3>Example:</h3>
  <p>Let us consider an example array = [3, 2, 5, 1, 0, 4]</p>
  <pre>
  4 5 0 3 2 1 (1st shuffling)
  4 1 3 2 5 0 (2nd shuffling)
  1 0 3 2 5 4 (3rd shuffling)
  3 1 0 2 4 5 (4th shuffling)
  1 4 5 0 3 2 (5th shuffling)
  .
  .
  .
  0 1 2 3 4 5 (nth shuffling) — Sorted Array
  </pre>
  <p>
    Here, n is unknown because algorithm doesn’t known in which 
    step the resultant permutation will come out to be sorted.
  </p>
  `;
  static specifications: string = `
  <p>
    &#9;<b>Worst Case</b>: O(∞) (since this algorithm has no upper bound)  
  </p>
  <p>
    &#9;<b>Average Case</b>: O(n*n!)  
  </p>
  <p>
    &#9;<b>Best Case</b>: O(n)(when array given is already sorted)  
  </p> <br>
  <p>
   <b>Auxiliary Space</b>: O(1)  
  </p>
    `;
  static code: string = `
    <pre>
import random

# Sorts array a[0..n-1] using Bogo sort
def bogo_sort(a):
    n = len(a)
    while (is_sorted(a) == False):
        shuffle(a)
  
# To check if array is sorted or not
def is_sorted(a):
    n = len(a)
    for i in range(0, n - 1):
        if (a[i] > a[i + 1] ):
            return False
    return True
  
# To generate permuatation of the array
def shuffle(a):
    n = len(a)
    for i in range (0, n):
        r = random.randint(0, n - 1)
        a[i], a[r] = a[r], a[i]
  </pre>`;
  static sources: string[] = [
    'https://www.geeksforgeeks.org/bogosort-permutation-sort/',
  ];
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

export class PancakeSort extends SortingAlgorithm {
  static description: string = `
    <p>
      How to sort an array if you are allowed to do only following operation on array:
    </p>
    <pre>
    flip(arr, i): Reverse array from 0 to i 
    </pre>
    <p>
      Unlike a traditional sorting algorithm, which attempts to sort with 
      the fewest comparisons possible, the goal is to sort the sequence 
      in as few reversals as possible. 
    </p>
    <p>
      The idea is to do something similar to Selection Sort. We one by one 
      place maximum element at the end and reduce the size of current array by one. 
    </p>
    <h3>Algorithm:</h3>
    <ul>
      <li>
        Start from current size equal to n and reduce current size by one 
        while it’s greater than 1. Let the current size be curr_size. 
        Do following for every curr_size 
      </li>
      <ul>
        <li>
          Find index of the maximum element in arr[0..curr_szie-1]. Let the index be ‘mi’
        </li>
        <li>
          Call flip(arr, mi)
        </li>
        <li>
          Call flip(arr, curr_size-1)
        </li>
      </ul>
    </ul>
    `;
  static specifications: string = `
  <p>
    <b>Overall time complexity</b>: O(n^2).
  </p>
    `;
  static code: string = `
    <pre>
# Reverses arr[0..i] */
def flip(arr, i):
    start = 0
    while start < i:
        arr[start], arr[i] = arr[i], arr[start]
        start += 1
        i -= 1
  
# Returns index of the maximum
# element in arr[0..n-1] */
def find_max(arr, n):
    mi = 0
    for i in range(0, n):
        if arr[i] > arr[mi]:
            mi = i
    return mi
  
# The main function that
# sorts given array
# using flip operations
def pancake_sort(arr, n):
      
    # Start from the complete
    # array and one by one
    # reduce current size
    # by one
    curr_size = n
    while curr_size > 1:
        # Find index of the maximum
        # element in
        # arr[0..curr_size-1]
        mi = find_max(arr, curr_size)
  
        # Move the maximum element
        # to end of current array
        # if it's not already at
        # the end
        if mi != curr_size - 1:
            # To move at the end,
            # first move maximum
            # number to beginning
            flip(arr, mi)
  
            # Now move the maximum
            # number to end by
            # reversing current array
            flip(arr, curr_size - 1)
        curr_size -= 1
  </pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/pancake-sorting/'];

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

export class StoogeSort extends SortingAlgorithm {
  static description: string = `
    <p>
      The Stooge sort is a recursive sorting algorithm. 
      It is defined as below (for ascending order sorting).
    </p>
    <pre>
Step 1 : If value at index 0 is greater than
          value at last index, swap them.

Step 2:  Recursively, 
  a) Stooge sort the initial 2/3rd of the array.
  b) Stooge sort the last 2/3rd of the array.
  c) Stooge sort the initial 2/3rd again to confirm.
    </pre>
    <h3>Illustration:</h3>
    <pre>
    Input : 2 4 5 3 1
    Output : 1 2 3 4 5
    </pre>
    <h4>Initially, swap 2 and 1 following above step 1.</h4>
    <pre>
    1 4 5 3 2
    </pre>
    <h4>Now, recursively sort initial 2/3rd of the elements.</h4>
    <pre>
    1 4 5 3 2
    1 3 4 5 2 
    </pre>
    <h4>Then, recursively sort last 2/3rd of the elements.</h4>
    <pre>
    1 3 4 5 2
    1 2 3 4 5
    </pre>
    <h4>Again, sort the initial 2/3rd of the elements to confirm final data is sorted.</h4>
    <pre>
    1 2 3 4 5
    </pre>
    <p>
      <img src="https://media.geeksforgeeks.org/wp-content/uploads/stoogeSort.png">    
    </p>
    `;
  static specifications: string = `
    <p>
      <b>Time complexity</b>: O(nlog 3 / log 1.5 ) = O(n2.7095...), hence it is slower than even bubble sort(n^2)  
    </p>    
    `;
  static code: string = `
    <pre>
def stooge_sort(arr, l, h):
  if l >= h:
      return

  # If first element is smaller
  # than last, swap them
  if arr[l] > arr[h]:
      t = arr[l]
      arr[l] = arr[h]
      arr[h] = t

  # If there are more than 2 elements in
  # the array
  if h - l + 1 > 2:
      t = ((h - l + 1) / 3)

      # Recursively sort first 2 / 3 elements
      stooge_sort(arr, l, (h - t))

      # Recursively sort last 2 / 3 elements
      stooge_sort(arr, l + t, (h))

      # Recursively sort first 2 / 3 elements
      # again to confirm
      stooge_sort(arr, l, (h - t))
</pre>`;
  static sources: string[] = ['https://www.geeksforgeeks.org/stooge-sort/'];

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

// export class TimeSort extends SortingAlgorithm {
//   sort(): void {
//     this.dataset.forEach((item) => {
//       setTimeout(() => {
//         this.sortedDataset.push(item);
//         let itemIndex = this.dataset.indexOf(item);
//         this.dataset.splice(itemIndex, 1);
//       }, item * this.animationSpeed);
//     });
//   }

//   static toString() {
//     return 'Time Sort';
//   }
// }
