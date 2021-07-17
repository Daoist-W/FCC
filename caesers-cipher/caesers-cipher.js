// This program is designed to decode ciphers based on the ROT13 encoding 

/* 
This is the naming convention used in this program.
____________________________________________________________________________________________________________________________________
Type       | Example   | Description                                                                                                |
Container  | myCont    | container to store non information temporarily in a function or scope limited loop. should not be global   |
String     | sCipher   | 's' indicates string format                                                                                |
Boolean    | bCheckIf  | 'b' indicates boolean format                                                                               |
Integer    | numValue  | 'num' indicates a number, floating or integer                                                              |
Array      | arrCont1  | 'arr' indicates an array                                                                                   |
Object     | oPerson   | 'o' indicates an object                                                                                    |
Function   | fnMyFunc  | 'fn' indicates function                                                                                    |
____________________________________________________________________________________________________________________________________|
*/

// This is the original solution
function rot13(str) {
    // set up 
    let arrCont1 = str.split("")
    let arrCharcodes = []
    let results = []

    // convert string array to ASCII array
    arrCont1.map(char => {
        arrCharcodes.push(char.charCodeAt(char))
    })

    // apply decryption algorithm of ROT13 
    for (let i = 0; i < arrCharcodes.length; i++) {
        let j = arrCharcodes[i]
        if (j >= 65 && j <= 77) {
            j = j + 13;
        }
        else if ( j > 77 && j <= 90 ) {
            j = j - 13;
        }
        results.push(String.fromCharCode(j))
    }
    return results.join("") ;
  }
  
// console.log(rot13("SERR PBQR PNZC!"));

// CODE PLANNING 

// The program will recieve string input and seperate it into a word array 

// each world will further be parsed character by character in a loop which converts it into its decoded equivalent

// spaces and non-alphanumeric characters will be ignored with an if statement requiring a regex to match

// here is a proof of concept code 

/* let myString = "SERR PBQR PNZC"

// split into individual word array 
let cont1 = myString.split(" ") 

// empty array for results 
let result = []

cont1.forEach(element => {
    let cont2 = []
    element.split("").map(x => {
        cont2.push(String.fromCharCode(x.charCodeAt(0) + 13))
    })
    result.push(cont2)
});

console.log(result.flat().join("")) */


// another proof of concept using nested maps and for loops 

/* let myString = "GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."

// 65 - 90
// anything greater than 77 should add the difference between the number and 77 to 65
// 65 + (x - 77)
// other non alphanumeric characters will be filtered out

// set up
let cont1 = myString.split(" ")
let array1 = []
let cont2

// accessing the individual elements, and creating a new array with the ASCII code equivalent to the string array 
// nested map is used to preserve the spacing between words... but this is no longer needed as the conditions in the if loop filter this out anyway 
cont1.map(x => {
  cont2 = []
  x.split("").map(y => {
    cont2.push(y.charCodeAt(0))
  })
  array1.push(cont2)
})

console.log(array1)

for (let i = 0; i < array1.length; i++) {
  
  let index = 0
  array1[i].map(j => {
    if (j <= 77 && j >= 65) {
      array1[i][index] = j + 13;
    }
    else if (j <= 90 && j >= 65) {
      array1[i][index] = j - 13;
    }
    index += 1;
  })
  console.log(array1[i])
}

let result = []
array1.map(x => {
  result.push(String.fromCharCode(...x))
})

console.log(result.join(" ")) */


// below is the revised version removing the unnecessary use of nested loops and map functions

/* let myString = "GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."

// 65 - 90
// anything greater than 77 should add the difference between the number and 77 to 65
// 65 + (x - 77)
// other non alphanumeric characters will be filtered out

let cont1 = myString.split("")
let array1 = []
cont1.map(x => {
    array1.push(x.charCodeAt(0))
  })

console.log(array1)

for (let i = 0; i < array1.length; i++) {
  let j = array1[i]
  if (j <= 77 && j >= 65) {
    array1[i] = j + 13;
  }
  else if (j <= 90 && j > 77) {
    array1[i]= j - 13;
  }
}

console.log(array1)

let result = []
array1.map(x => {
  result.push(String.fromCharCode(x))
})

console.log(result.join("")) */
