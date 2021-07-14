// the function of this programme is to convert input intergers into roman numerals
function convertToRoman(num) {
    // set up 
    let cont1 = num.toString().split("")
    let result = []
    let units = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    let tens = ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    let hundreds = ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
    let thousands = ["M", "MM", "MMM"]
  
    // loop function with if statements covering all the different units 
    for (let x = cont1.length - 1; x >= 0; x--) {
      if (x == cont1.length - 1) {
        result.unshift(units[cont1[x] - 1])
      }
      if (x == cont1.length - 2) {
        result.unshift(tens[cont1[x] - 1])
      }
      if (x == cont1.length - 3) {
        result.unshift(hundreds[cont1[x] - 1])
      }
      if (x == cont1.length - 4) {
        result.unshift(thousands[cont1[x] - 1])
      }
    }
   return result.join("");
  }
  
  console.log(convertToRoman(36));
  
// CODE PLANNING 

// Roman numerals should operate on a similar priniciple to base 10 numbering system, but with differences in the way in which they are presented 

// I want to create a switch statement that captures these variations and unshifts them onto an array before joining everything together 

// I can take in a number, turn it into a string and use the indexes as references to poision in the base 10 numbering system 

  /* let number = 400
  
  // converting number to string form
  // console.log(number.toString().split(""))
  
  // set up
  let cont1 = number.toString().split("")
  let result = []
  let units = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
  let tens = ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
  let hundreds = ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
  let thousands = ["M", "MM", "MMM"]
  
  
  // loop function with switch statement 
  for (let x = cont1.length - 1; x >= 0; x--) {
    if (x == cont1.length - 1) {
      result.unshift(units[cont1[x] - 1])
    }
    if (x == cont1.length - 2) {
      result.unshift(tens[cont1[x] - 1])
    }
    if (x == cont1.length - 3) {
      result.unshift(hundreds[cont1[x] - 1])
    }
    if (x == cont1.length - 4) {
      result.unshift(thousands[cont1[x] - 1])
    }
  }
  
  console.log(result.join("")) */