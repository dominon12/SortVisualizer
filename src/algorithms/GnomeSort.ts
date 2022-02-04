import SortingAlgorithm  from './SortingAlgorithm';
import { sleep } from 'src/helpers/helper';

export default class GnomeSort extends SortingAlgorithm {
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

  async sort() {
    let arrayLength = this.dataset.length;
    let counter = 1;
    let index = 0;
    while (index < arrayLength) {
      if (index === 0 || this.dataset[index] >= this.dataset[index - 1]) {
        index++;
      } else {
        let temp = this.dataset[index];
        await sleep(0);
        this.dataset[index] = this.dataset[index - 1];
        this.dataset[index - 1] = temp;
        index--;
      }
      counter++;
    }
  }

  static toString() {
    return 'Gnome Sort';
  }
}
