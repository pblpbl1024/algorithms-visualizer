//merge sort function
export function mergeSort(a, anim, l, r, dec, focus) {
    //update focus of mergesort on the entry to a subarray
    if(focus) anim.push(["focus", l, r]);
    //base case: the segment is length 1
    if(l === r) return;
    let mid = Math.floor((l+r)/2);
    //otherwise, sort the left and right segments (as are always called by reference so all changes
    //in the recursion are reflected in the original array that was passed in)
    mergeSort(a, anim, l, mid, dec, focus); mergeSort(a, anim, mid+1, r, dec, focus);
    //update focus of mergesort on the backtracking of recursion
    if(focus) anim.push(["focus", l, r]);
    //combine sorted segments
    const lft = [], rit = [];
    
    for (let i = l; i <= mid; i++) lft.push(a[i]);
    //add a buffer element so that when the end of the list is reached, the other one automatically finishes
    lft.push(dec ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER);

    for (let i = mid + 1; i <= r; i++) rit.push(a[i]);
    rit.push(dec ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER);

    for (let i = l, x=0, y=0; i <= r; i++)
    {
        //push animations for updating the left and right bar colour, if they exist
        let left = x === lft.length-1 ? -1 : l+x;
        let right = y === rit.length-1 ? -1 : mid+1+y;
        anim.push(["crimson", left, right]);
        //update the pointer element (green bar)
        if(focus) anim.push(["lime", i, i]);
        //update the pointer element's height
        if(dec)
        {
            if (lft[x] >= rit[y]) 
            {
                anim.push(["update", i, lft[x]]); a[i] = lft[x++];
            }
            else 
            {
                anim.push(["update", i, rit[y]]); a[i] = rit[y++];
            }
        }
        else
        {
            if (lft[x] <= rit[y]) 
            {
                anim.push(["update", i, lft[x]]); a[i] = lft[x++];
            }
            else 
            {
                anim.push(["update", i, rit[y]]); a[i] = rit[y++];
            }
        }
        anim.push(["lightskyblue", left, right]);
        if(focus) anim.push(["lightskyblue", i, i]);
    }
}

//quick sort function
export function quickSort(a, anim, l, r, dec, focus) {
    if(l < r)
    {
        //update focus upon calling quickSort on a smaller subarray
        if(focus) anim.push(["focus", l, r]);
        //get the partition index from the quickSort function
        let p = partition(a, anim, l, r, dec, focus);
        //quicksort the two halves
        quickSort(a, anim, l, p-1, dec, focus); quickSort(a, anim, p+1, r, dec, focus);
        //update focus during the backtracking of recursion
        if(focus) anim.push(["focus", l, r]);
    }
}

function partition(a, anim, l, r, dec, focus)
{
    //note that arrays are called by reference
    let pivot = a[r];
    let i = l - 1;
    for (let j = l; j < r; j++)
    {
        anim.push(["crimson", j, r]);
        if(focus) anim.push(["lime", i+1, i+1]);
        let changed = 0;
        if(dec)
        {
            if (a[j] > pivot)
            {
                changed = 1;
                i++; anim.push(["swap", i, j]);
                let x = a[i]; a[i] = a[j]; a[j] = x;
            }
        }
        else
        {
            if (a[j] < pivot)
            {
                changed = 1;
                i++; anim.push(["swap", i, j]);
                let x = a[i]; a[i] = a[j]; a[j] = x;
            }
        }
        anim.push(["lightskyblue", j, r]);
        if(focus) anim.push(["lightskyblue", i+1-changed, i+1-changed]);
    }
    anim.push(["crimson", i+1, r]);
    anim.push(["swap", i+1, r]);
    anim.push(["lightskyblue", i+1, r]);
    let x = a[i+1]; a[i+1] = a[r]; a[r] = x;
    return i + 1;
}

//bubble sort function
export function bubbleSort(a, anim, dec) {
    //moves the largest element to the top during each sweep of the algorithm
    for(var i = a.length-1; i > 0; i--)
    {
        for(var j = 0; j < i; j++)
        {
            //updates colour of this element and the one next to it
            anim.push(["crimson", j, j+1]);
            if(dec)
            {
                if(a[j] < a[j+1])
                {
                    //swap two values
                    let x = a[j]; a[j] = a[j+1]; a[j+1] = x;
                    anim.push(["swap", j, j+1]);
                }
            }
            else
            {
                if(a[j] > a[j+1])
                {
                    //swap two values
                    let x = a[j]; a[j] = a[j+1]; a[j+1] = x;
                    anim.push(["swap", j, j+1]);
                }
            }
            //reset the colours
            anim.push(["lightskyblue", j, j+1]);
        }
    }
}

