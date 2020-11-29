//bubble sort function
export function bubbleSort(array, anim, l, r) {
    //moves the largest element to the top during each sweep of the algorithm
    for(var i = array.length-1; i > 0; i--)
    {
        for(var j = 0; j < i; j++)
        {
            //updates colour of this element and the one next to it
            anim.push(j, j+1, 1);
            if(array[j] > array[j+1])
            {
                var x = array[j]; array[j] = array[j+1]; array[j+1] = x;
                //swap two values
                anim.push(j, j+1, 3);
            }
        }
    }
}

