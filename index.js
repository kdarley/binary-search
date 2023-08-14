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

    const findNode = (value, currentNode = root) => {
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

    const levelOrder = (currentNode = root, func = null) => {
        if (currentNode === null){
            return
        }
        let levelOrderArray = []
        let queue = [currentNode]

        while (queue.length !== 0){
            node = queue.shift()
            if (func !== null){
                func(node.data)
            } else {
                levelOrderArray.push(node.data)
            }

            if (node.left !== null){
                queue.push(node.left)
            }
            if (node.right !== null){
                queue.push(node.right)
            }
        }
        return levelOrderArray
    }

    const inOrder = (currentNode = root, func = null) => {
        if (currentNode === null){
            return
        }
        let inOrderArray = []
        
        function traverse(node){
            if (node !== null){
                traverse(node.left)
                if (func) {
                    func(node.data)
                } else {
                    inOrderArray.push(node.data)
                }
                traverse(node.right)
            }
        }
 
        traverse(currentNode)
        return inOrderArray
    }

    const preOrder = (currentNode = root, func = null) => {
        if (currentNode === null){
            return
        }

        let preOrderArray = []

        function traverse(node){
            if (node !== null){
                if (func) {
                    func(node.data)
                } else {
                    preOrderArray.push(node.data)
                }
                traverse(node.left)
                traverse(node.right)
            }
        }

        traverse(currentNode)
        return preOrderArray
    }

    const postOrder = (currentNode = root, func = null) => {
        if (currentNode === null){
            return
        }

        let postOrderArray = []

        function traverse(node){
            if (node !== null){
                traverse(node.right)
                traverse(node.left)
                if (func) {
                    func(node.data)
                } else {
                    postOrderArray.push(node.data)
                }                
            }
        }

        traverse(currentNode)
        return postOrderArray
    }

    const height = (currentNode = root) => {
        if (currentNode === null){
            return 0; // first height will be 0
        }

        const leftHeight = height(currentNode.left)
        const rightHeight = height(currentNode.right)

        return Math.max(leftHeight, rightHeight)+1 // first height will be 0 + 1
    }

    const depth = (targetNodeValue, currentNode = root, currentDepth = 0) => {
        if (currentNode === null){
            return null // node not found, 
        }

        if (currentNode.data === targetNodeValue) {
            return currentDepth
        }

        const leftDepth = depth(targetNodeValue, currentNode.left, currentDepth+1)
        const rightDepth = depth(targetNodeValue, currentNode.right, currentDepth+1)

        if (leftDepth !== null){
            return leftDepth
        }
        return rightDepth
    }

    const isBalanced = (currentNode = root) => {
        if (currentNode === null){
            return true
        }
        const leftHeight = height(currentNode.left)
        const rightHeight = height(currentNode.right)

        return (Math.abs(leftHeight - rightHeight) <= 1 && isBalanced(currentNode.left) && isBalanced(currentNode.right))
    }

    const rebalance = (currentNode = root) => {
        if (currentNode === null){
            return null
        }
        if (isBalanced(currentNode) === true){
            return
        }
        let array = levelOrder(currentNode)      

        root = buildTree(array)
    }

    return {
        prettyPrint,
        insert, 
        deleteNode, 
        findNode,
        levelOrder,
        inOrder,
        preOrder,
        postOrder,
        height,
        depth,
        isBalanced,
        rebalance
    }
}

function createRandomArray(length = 23, min = 0, max =100){
    const randomArray = []

    for (let i = 0; i<length; i++){
        const randomNumber = Math.floor(Math.random()*(max-min+1)) + min;
        randomArray.push(randomNumber)
    }
    return randomArray
}

let randArray = createRandomArray()
let t = Tree(randArray)

t.prettyPrint()
console.log(t.isBalanced())
console.log(t.preOrder())
console.log(t.postOrder())
console.log(t.inOrder())

let addMore = createRandomArray(43)
addMore.forEach((randomNumber) => t.insert(randomNumber))
t.prettyPrint()
console.log(t.isBalanced())
t.rebalance()
t.prettyPrint()
console.log(t.isBalanced())