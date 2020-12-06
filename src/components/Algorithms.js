//merge sort function
export function mergeSort(array, anim, l, r, dec) {
    //base case: the segment is length 1
    if(l === r) return;
    var mid = Math.floor((l+r)/2);
    //otherwise, sort the left and right segments
    mergeSort(array, anim, l, mid, dec); mergeSort(array, anim, mid+1, r, dec);
    //combine sorted segments
    const lft = [], rit = []; 
    
    for (let i = l; i <= mid; i++) lft.push(array[i]); 
    lft.push(dec ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER);

    for (let i = mid + 1; i <= r; i++) rit.push(array[i]); 
    rit.push(dec ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER);

    for (let i = l, x=0, y=0; i <= r; i++)
    {
        //push animations for updating the left and right bar colour, if they exist
        var leftAnim = x === lft.length-1 ? -1 : l+x;
        var rightAnim = y === rit.length-1 ? -1 : mid+1+y;
        anim.push([leftAnim, rightAnim, 1]); 
        //update the pointer element's height
        if(dec)
        {
            if (lft[x] >= rit[y]) 
            {
                anim.push([i, lft[x], 2]);
                array[i] = lft[x++];
            }
            else 
            {
                anim.push([i, rit[y], 2]);
                array[i] = rit[y++];
            }
        }
        else
        {
            if (lft[x] <= rit[y]) 
            {
                anim.push([i, lft[x], 2]);
                array[i] = lft[x++];
            }
            else 
            {
                anim.push([i, rit[y], 2]);
                array[i] = rit[y++];
            }
        }
        anim.push([leftAnim, rightAnim, 0]);
    }
}

//bubble sort function
export function bubbleSort(array, anim, dec) {
    //moves the largest element to the top during each sweep of the algorithm
    for(var i = array.length-1; i > 0; i--)
    {
        for(var j = 0; j < i; j++)
        {
            //updates colour of this element and the one next to it
            anim.push([j, j+1, 1]);
            if(dec)
            {
                if(array[j] < array[j+1])
                {
                    let x = array[j]; array[j] = array[j+1]; array[j+1] = x;
                    //swap two values
                    anim.push([j, j+1, 3]);
                }
            }
            else
            {
                if(array[j] > array[j+1])
                {
                    let x = array[j]; array[j] = array[j+1]; array[j+1] = x;
                    //swap two values
                    anim.push([j, j+1, 3]);
                }
            }
            //reset the colours
            anim.push([j, j+1, 0]);
        }
    }
}

