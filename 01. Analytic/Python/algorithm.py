from icecream import ic
ic.configureOutput(includeContext=True,argToStringFunction=str)
print=ic


def binarySearch (nums, target):
# binarySearch suitable for 
    (left,right)=(0,len(nums)-1)

    while left<=right:
        mid=(left+right)//2
        if target==nums[mid]: 
            return mid
        elif target<nums[mid]:
            right=mid-1
        else:
            left=mid+1
    return -1

def binarySearchRecursive(nums, left, right, target):
    print (left,right)
    # Base condition (search space is exhausted)
    if left > right:
        return -1
 
    # find the mid-value in the search space and
    # compares it with the target
 
    mid = (left + right) // 2
 
    # overflow can happen. Use below
    # mid = left + (right - left) / 2
 
    # Base condition (a target is found)
    if target == nums[mid]:
        return mid
 
    # discard all elements in the right search space,
    # including the middle element
    elif target < nums[mid]:
        return binarySearchRecursive(nums, left, mid-1, target)
 
    # discard all elements in the left search space,
    # including the middle element
    else:
        return binarySearchRecursive(nums, mid + 1, right, target)


if __name__ == '__main__':
 
    nums = [5, 6, 7, 8, 9, 90]
    target = 9
    (left, right) = (0, len(nums) - 1)
    index = binarySearchRecursive(nums,left,right, target)
    print (globals())
    if index != -1:
        print('Element found at index', index)
    else:
        print('Element found not in the list')