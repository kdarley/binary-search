console.log("hello world")

const Node = (data = null, left = null, right = null) => {
    this.data = data
    this.left = left
    this.right = right

    return {
        data,
        left,
        right
    }
}

const Tree = (array) => {

    function cleanArray(array) {
        //if array is empty, return
        if (array===null || array.length===0){
            return console.log("array is empty or null")
        }
        // remove duplicates
        const dedupedArray = array.filter((item, index) => array.indexOf(item) ===index);
        // sort array
        const sortedArray = dedupedArray.sort((a,b) => a-b);
        return sortedArray
    
    }
    array = cleanArray(array)

    root = buildTree(array)
    
    const prettyPrint = (node=root, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    function buildTree(array){
        // console.log(array)
        // base case
        //if array is empty, return
        if (array === undefined, array.length===0){
            return null
        } else {
            // console.log(array)
            // find center index  of array
            const rootIndex = Math.floor(array.length/2) // floor because js ar is indexed 0
            // define node
            // console.log(rootIndex)
            const leftArray = array.slice(0, rootIndex)
            const rightArray = array.slice(rootIndex+1)
            // console.log("left", leftArray)
            // console.log("right", rightArray)
            const node = Node(array[rootIndex], buildTree(leftArray), buildTree(rightArray))
            // node.left = buildTree(array.slice(0, rootIndex))
            // node.right = buildTree(array.slice(-rootIndex))

            return node



            // console.log(arr.slice(0, rootIndex))
            // console.log(arr.slice(-rootIndex))



            // let currentNode = Node(arr.at(rootIndex))
            // console.log(currentNode)
            // if (root===null){
            //     root = currentNode

            //     currentNode.left = buildTree(arr = arr.slice(0, rootIndex))
            //     currentNode.right = buildTree(arr = arr.slice(-rootIndex))
            // } else {
            //     currentNode.left = buildTree(arr = arr.slice(0, rootIndex))
            //     currentNode.right = buildTree(arr = arr.slice(-rootIndex))
                
            // }
        }     

    }

    return {
        prettyPrint,
        buildTree
    }
}

let t = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,6 ,3 ,2, 19, 10])
// let t = Tree([])
t.prettyPrint()