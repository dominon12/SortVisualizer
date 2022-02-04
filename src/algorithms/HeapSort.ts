import SortingAlgorithm from './SortingAlgorithm';
import { sleep } from 'src/helpers/helper';

export default class HeapSort extends SortingAlgorithm {
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

  async sort() {
    let arrayLength = this.dataset.length;

    let iter = 0;
    // Build a maxheap
    for (let i = arrayLength; i > -1; i--) {
      await sleep(this.animationSpeed);
      this.heapify(this.dataset, arrayLength, i);
      iter++;
    }

    let iter2 = 0;
    // One by one extract elements
    for (let i = arrayLength - 1; i > 0; i--) {
      let temp = this.dataset[i];
      await sleep(this.animationSpeed);
      this.dataset[i] = this.dataset[0];
      await sleep(this.animationSpeed);
      this.dataset[0] = temp;
      //   await wait(this.animationSpeed);
      this.heapify(this.dataset, i, 0);
      iter2++;
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
