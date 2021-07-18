/* 
This is the naming convention used in this program.
____________________________________________________________________________________________________________________________________
Type       | Example   | Description                                                                                                |
Container  | myCont    | container to store non information temporarily in a function or scope limited loop. should not be global   |
String     | sCipher   | 's' indicates string format                                                                                |
Boolean    | bCheckIf  | 'b' indicates boolean format                                                                               |
Integer    | numValue  | 'num' indicates a number, floating or integer                                                              |
Array      | arrCont1  | 'arr' indicates an array                                                                                   |
Object     | objPerson | 'obj' indicates an object                                                                                  |
Function   | fnMyFunc  | 'fn' indicates function                                                                                    |
____________________________________________________________________________________________________________________________________|
*/

// The function of this program is to return true if the input string looks like a valid US phone number.


function telephoneCheck(str) {
  // set up 
  let regExInvalid = /[^\w- \(\)]/gm;
  let objValidNumbers = {
    "type1" : /[1]?[- ]?[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{4}/gm,
    "type2" : /[1]?[- ]?\([0-9]{3}\)[- ]?[0-9]{3}[- ]?[0-9]{4}/gm
  }

  // test for invalid characters 
  if (!str.match(regExInvalid)) {
    if (str.match(objValidNumbers.type1) == str) {
      console.log(true, "type1")
      return true
    }
    if (str.match(objValidNumbers.type2) == str) {
      console.log(true, "type2")
      return true
    }
    else {
      console.log(false, "invalid format")
      return false
    }
  }
  else {
    console.log(false, "invalid characters")
  }

    return true;
  }

telephoneCheck("555-555-5555");



// code planning 

/* 
  My initial thoughts are that I should find a way to process the input and reduce the string to a simplified format
  - If any invalid characters are found they should instantly return a false boolean 
  - If any valid characters are found in the wrong place (e.g. "-" or "()") then this should also return false


  The following are valid formats 
    555-555-5555
    (555)555-5555
    (555) 555-5555
    555 555 5555
    5555555555
    1 555 555 5555

  One idea then is to use a switch statement to compare the input to each of the above, after having filtered the string for invalid characters 
*/

// Proof of concept 

// set up 
let sPhoneNumber = "1 555)555-5555";
let regExInvalid = /[^\w- \(\)]/gm;
let objValidNumbers = {
  "type1" : /[1]?[- ]?[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{4}/gm,
  "type2" : /[1]?[- ]?\([0-9]{3}\)[- ]?[0-9]{3}[- ]?[0-9]{4}/gm
}

// test for invalid characters 
if (!sPhoneNumber.match(regExInvalid)) {
  if (sPhoneNumber.match(objValidNumbers.type1) == sPhoneNumber) {
    console.log(true, "type1")
    return true
  }
  if (sPhoneNumber.match(objValidNumbers.type2) == sPhoneNumber) {
    console.log(true, "type2")
    return true
  }
  else {
    console.log(false, "invalid format")
    return false
  }
}
else {
  console.log(false, "invalid characters")
}