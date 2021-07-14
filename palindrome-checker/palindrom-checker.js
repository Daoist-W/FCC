// This function returns true if the input given is a palindrome

function palindrome(str) {
    // convert input into an array and remove non alpha-numeric characters
    let myFilter = /[a-z0-9]/gmi
    let myString = str.match(myFilter)

    // implement regex matching loop, which identifies the number of capture groups required to match input argument character length 
    // inital set up 
    let character = "(.)";
    let capture = "\\";
    let myRegEx = [character, ".?"]

    // the following loop adds elements at the beginning and end of the regex until it is suitable to test for a palindrome in the input string, i represents capture group number 
    for (let i = Math.floor(myString.length / 2); i >= 1; i--) {
        myRegEx.unshift(character)
        myRegEx.push(capture + i)
        console.log(myRegEx.join(""))
        if (myString.join("").match(RegExp(myRegEx.join(""), "gmi"))) {
            return true
        }
    }
    if (!myString.join("").match(RegExp(myRegEx.join(""), "gmi"))) {
        return false
    }
}
// for testing purposes, will call the function a number of times
console.log(palindrome("A man, a plan, a canal. Panama"))




/* code planning

// sample string 
let myString = "2_A3*3#A2";

// can I find the midpoint of a string? 
// console.log(myString[Math.floor(myString.length/2)])

// convert string into an array, eliminate non alpha-numeric characters
myFilter = /[a-z0-9]/gmi
myString = myString.match(myFilter)

console.log(myString, Math.floor(myString.length / 2))


// alternative solution, use .pop() and .shift() recursively to check for symmetry 


function popShift (arr) {
    let length = Math.floor(arr.length / 2)
    let first = arr.shift()
    let last = arr.pop()
    let test = []
    // created sub function to retain values
    function recursive (x) {
        if (first == last && x.length >= 2) {
            first = x.shift()
            last = x.pop()
            recursive(x)
            console.log(x)
            test.push(x)
            console.log(test, test.length, length)
        }
    }
    recursive(arr)
    
    return test.length == arr.length % 2 == 0 ? length + 1 : length // if the length of the matching elements is equal to the length of one symmetrical side, it has to be a palindrome
}

console.log(popShift(myString))

// is there a way I can use regex?

// let length = 3;

// myRegEx = RegExp("^([a-z])" + "{" + length + "}" + "&& [$1]$" , 'gm')

// console.log(myString.match(myRegEx)) */
