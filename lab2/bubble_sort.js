const array = [5,4,3,2,1]; 

function bubbleSort(arr) {
  let temp = 0;

  for(let i = 0; i < arr.length; i++) {
  	for(let j = 0; j < arr.length - i; j++) {
  	  if(arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
  	}
  }
};

bubbleSort(array);
console.log(array);
