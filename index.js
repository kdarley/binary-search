// console.log("hello world")

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
        // base case
        if (array === null || array.length===0){
            return null
        } else {
            // find center index  of array
            const rootIndex = Math.floor(array.length/2) // floor because js ar is indexed 0
            // split the array 
            const leftArray = array.slice(0, rootIndex) // array does not include index
            const rightArray = array.slice(rootIndex+1)

            // create the node recursively
            const node = Node(array[rootIndex], buildTree(leftArray), buildTree(rightArray))

            return node
        }     

    }

    const insert = (value, currentNode = root) => {
        let nodeValue = currentNode.data
        if (value < nodeValue){
            if (currentNode.left === null) {
                currentNode.left = Node(value)
            } else {
                insert(value, currentNode.left)
            }
        } else if (value > nodeValue){
            if (currentNode.right === null){
                currentNode.right = Node(value)
            } else {
                insert(value, currentNode.right)
            }
        } else { // when values are equal
            return
        }
    }

    function findNode(value, currentNode = root){
        if (currentNode === null){
            return 
        }
        let nodeValue = currentNode.data

        if (value === nodeValue){
            return currentNode
        } 
        if (value < nodeValue){
            if (currentNode.left !== null){
                currentNode = findNode(value, currentNode.left)
                return currentNode
            } 
        } else {
            if (currentNode.right !== null){
                currentNode = findNode(value, currentNode.right)
                return currentNode
            } 
        }
    }

    const minValue = (node) => {
        let minValue = node.data;
        while (node.left) {
            minValue = node.left.data;
            node = node.left;
        }
        return minValue;
    };

    const deleteNode = (value, currentNode = root) => {
        if (currentNode === null){
            return null; 
        }
        // if node has one child, replace node with child
        // if node has two children, find minimum within sub tree and replace with child

        // find the node
        if (value < currentNode.data){
            currentNode.left = deleteNode(value, currentNode.left)
        } else if (value > currentNode.data) {
            currentNode.right = deleteNode(value, currentNode.right)
        } else { // if the value is equal to node data
            // if either or one of children are empty
            if (currentNode.left === null){
                return currentNode.right // in this case the right node is either null or the node to be set to
            } else if (currentNode.right === null) {
                return currentNode.left // in this case we know the left node is not null and just need to reassign the tree
            }

            //if both children contain data
            // assign the data of the current node to the min of the right node
            currentNode.data = minValue(currentNode.right)

            // delete the min node in the sub tree
            currentNode.right = deleteNode(currentNode.data, currentNode.right)
        }

        return currentNode
    }



    return {
        prettyPrint,
        insert, 
        deleteNode
    }
}

let t = Tree([1, 7, 4, 23, 8, 9, 4, 3, 7, 9, 67, 6345, 324,6 ,3 ,2, 19, 10])
// let t = Tree([])
t.prettyPrint()
t.deleteNode(8)
t.deleteNode(7)
t.prettyPrint()
t.deleteNode(9)
t.deleteNode(1)
t.deleteNode(2)
t.prettyPrint()