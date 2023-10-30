import {
  mergeSort,
  quickSort,
  selectionSort,
  insertionSort,
  renderArray,
  bubbleSort,
} from './sortings.js';

const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const arrayLengthInput = document.querySelector('#arrayLength');
const speedInput = document.querySelector('#speed');

arrayLengthInput.addEventListener('change', () => {
  generateRandomArray(arrayLengthInput.value);
});

startBtn.addEventListener('click', startSorting);
stopBtn.addEventListener('click', stopSorting);

export let animationSpeed = speedInput.value;
export let isSorting = false;
let array = [];

function generateRandomArray() {
  const size = arrayLengthInput.value;
  array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  renderArray(array);
}

function startSorting() {
  if (!isSorting) {
    isSorting = true;
    const selectedAlgorithm = document.getElementById('algorithm').value;
    sortArray(selectedAlgorithm);
  } else {
    generateRandomArray();
    const selectedAlgorithm = document.getElementById('algorithm').value;
    sortArray(selectedAlgorithm);
  }
}

function stopSorting() {
  isSorting = false;
}

async function sortArray(algorithm) {
  animationSpeed = speedInput.value;

  if (algorithm === 'bubble') {
    bubbleSort(array);
  } else if (algorithm === 'merge') {
    mergeSort(array);
  } else if (algorithm === 'quick') {
    quickSort(array);
  } else if (algorithm === 'insertion') {
    insertionSort(array);
  } else if (algorithm === 'selection') {
    selectionSort(array);
  }
}

generateRandomArray(); // Генерируем начальный массив
