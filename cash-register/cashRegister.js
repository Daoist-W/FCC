/* 
     A cash register drawer function checkCashRegister() that accepts:
     - purchase price as the first argument (price)
     - payment as the second argument (cash)
     - cash-in-drawer (cid) as the third argument. This is a 2D array 

     The function should return an object with a status key and a change key
        Return 
            {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.
        Return 
            {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.
        Otherwise, return 
            {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.
        

        Currency            Unit	Amount
        Penny	            $0.01   (PENNY)
        Nickel	            $0.05   (NICKEL)
        Dime	            $0.1    (DIME)
        Quarter	            $0.25   (QUARTER)
        Dollar	            $1      (ONE)
        Five Dollars	    $5      (FIVE)
        Ten Dollars	        $10     (TEN)
        Twenty Dollars	    $20     (TWENTY)
        One-hundred Dollars	$100    (ONE HUNDRED)

    This is the variable naming convention used in this program.
    ____________________________________________________________________________________________________________________________________
    Type       | Example   | Description                                                                                                |
    Container  | cont1     | container to store non information temporarily in a function or scope limited loop. should not be global   |
    String     | sCipher   | 's' indicates string format                                                                                |
    Boolean    | bCheckIf  | 'b' indicates boolean format                                                                               |
    Integer    | numValue  | 'num' indicates a number, floating or integer                                                              |
    Array      | arrCont1  | 'arr' indicates an array                                                                                   |
    Object     | objPerson | 'obj' indicates an object                                                                                  |
    Function   | fnMyFunc  | 'fn' indicates function                                                                                    |
    ____________________________________________________________________________________________________________________________________|

    As a side project, one this challeng is completed, I would like to create an application with a UI that allows me to put in my own values at the
    start of my shift and keep track of money

*/

function checkCashRegister(price, cash, cid) {
    // set up 
    let arrCidUnits = {
        "PENNY":        0.01, 
        "NICKEL":       0.05, 
        "DIME":         0.1, 
        "QUARTER":      0.25, 
        "ONE":          1, 
        "FIVE":         5, 
        "TEN":          10, 
        "TWENTY":       20, 
        "ONE HUNDRED":  100
    };
    let numDiff = cash - price;
    let numerator = numDiff;
    let denom;
    let numChangeTotal
    let remainder
    let output = {}
    let change

    // core function that parses different scenarios 

    let numCidChange = cid.reverse().reduce((acc, currenValue) => {

    // secondary set up to reduce code bloat
    denom = arrCidUnits[currenValue[0]]
    remainder = floatSafeRemainder(numerator, denom)

    if (numerator < denom) { // denom unit is too large
        return acc
    }
    else if (remainder > 0) { // there is a valid remainder
        console.log(numerator, denom, currenValue[1],(numerator - remainder).toFixed(2))
        if (currenValue[1] > (numerator - remainder).toFixed(2)) { // available unit cash is more than numerator - remainder 
            acc.push([currenValue[0], (numerator - remainder).toFixed(2) / denom])
            numChangeTotal = fnChangeTotal(acc, arrCidUnits)
            numerator = Number(remainder.toFixed(2))
        }
        else if (currenValue[1] <= (numerator - remainder).toFixed(2)) { // available unit cash is less than numerator - remainder
            acc.push([currenValue[0], (currenValue[1] / denom)])
            numChangeTotal = fnChangeTotal(acc, arrCidUnits)
            numerator = Number(numerator - currenValue[1])
        }
        return acc
    }
    else if (numChangeTotal == numDiff) { // this is to preserve correct solution, failing this, insufficient change condition prevails
        return acc
    }
    else if (remainder == 0 && numChangeTotal !== numDiff && currenValue[1] >= numerator) { // remainder is 0 and total value of accumulated change is not equal to required change; and available unit cash is more than change required
        acc.push([currenValue[0], numerator / denom])
        numChangeTotal = fnChangeTotal(acc, arrCidUnits)
        numerator = 0;
        return acc 
    }
    return acc
    }, [])

    // processing results 
    change = fnChangeCalc(numCidChange, arrCidUnits)
    if (change == false) {
        output.status = "INSUFFICIENT_FUNDS";
        output.change = change;
    }
    else if (fnCidTotal(change) == fnCidTotal(cid)) {
        output.status = "CLOSED";
        output.change = cid;
    }
    else {
        output.status = "OPEN";
        output.change = change;
    }
    return output;
}

// SUPPORTING FUNCTIONS 

function fnCidTotal (arr) { // total amount availble in cid
    return arr
    .reduce((acc2, currenValue2) => {
        return acc2 + currenValue2[1]
    }, 0)
}

function fnChangeTotal (arr, arr2) { // total accumulated cash value across all stored units 
    return arr
    .reduce((acc2, currenValue2) => {
        return acc2 + currenValue2[1] * arr2[currenValue2[0]]
    })
}

function fnChangeCalc (arr, arr2) { // returns an array with total cash values of each unit, input is an array with quantities of units e.g. number of 5 dollar notes
    return arr.map(money => {
        return [money[0], money[1] * arr2[money[0]]]
    })
}
 
function floatSafeRemainder(val, step){ // this function is a workaround to the floating point problem, found on stackoverflow
    // https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript
    
var valDecCount = (val.toString().split('.')[1] || '').length;
var stepDecCount = (step.toString().split('.')[1] || '').length;
var decCount = valDecCount > stepDecCount? valDecCount : stepDecCount;
var valInt = parseInt(val.toFixed(decCount).replace('.',''));
var stepInt = parseInt(step.toFixed(decCount).replace('.',''));
return (valInt % stepInt) / Math.pow(10, decCount);
}

// Testing function 
let test = checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
console.log(test)


// code planning 

/* 
    I understand this program to work as follows:
    - you recieve the inputs 
    - the difference in cash and price is then compared to the total cash value of cid
    - if difference is higher in value, return insufficient funds condition
    - if the difference is lower in value, determine whether there is a remainder between difference and change
    - if the program is unable to exactly match difference using available currency (i.e there is a remainder), return insufficienct funds condition 
    - if given the cid value = change, the remainder is zero; return closed condition 
    - if given the cid value > change, the remainder is zero, return open condition
    - 

*/

// proof of concept 

// set up 
/* let numPrice = 19.5;
let numCash = 20;
let arrCid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
let arrCidUnits = {
    "PENNY":        0.01, 
    "NICKEL":       0.05, 
    "DIME":         0.1, 
    "QUARTER":      0.25, 
    "ONE":          1, 
    "FIVE":         5, 
    "TEN":          10, 
    "TWENTY":       20, 
    "ONE HUNDRED":  100
};
let numDiff = numCash - numPrice;
let numerator = numDiff;
let denom;
let myVar
let numChangeTotal
let remainder
let output = {} */

/* 
	• receive inputs
	• calculate change 
	• set numerator to change
	• cycle through reversed "cid"
		○ set denominator value from object containing cid unit values
		○ if denominator is larger in value that change, skip unit currency
		○ else if denom is small and there is a remainder
			§ if the total cash in this unit held is greater than change
				□ push unit name and largest valid multiple into acc
				□ set numerator to reminder 
			§ if the total cash in this unit held is less than change
				□ push unit name and value of total unit cash / unit
				□ set numerator to reminder 
			§ return acc
		○ else if remainder = 0, total acc value is != change, and total unit cash >= remainder
			§ push unit name and value of numerator / denom
			§ return acc
		○ else if total acc value = = change
			§ return acc to preserve correct answer through remaining loops
		○ if all the above fail, return "Insufficient Change" state 
*/ 

/* let numCidChange = arrCid.reverse().reduce((acc, currenValue) => {

    // secondary set up to reduce code bloat
    denom = arrCidUnits[currenValue[0]]
    remainder = floatSafeRemainder(numerator, denom)

    if (numerator < denom) { // denom unit is too large
        console.log(numerator, denom, "too high", acc, currenValue[0])
        return acc
    }
    else if (remainder > 0) { // there is a valid remainder
        console.log(numerator, denom, currenValue[1],(numerator - remainder).toFixed(2))
        if (currenValue[1] > (numerator - remainder).toFixed(2)) { // available unit cash is more than numerator - remainder 
            console.log(acc, "type0")
            acc.push([currenValue[0], (numerator - remainder).toFixed(2) / denom])
            numChangeTotal = fnChangeTotal(acc)
            numerator = Number(remainder.toFixed(2))
        }
        else if (currenValue[1] <= (numerator - remainder).toFixed(2)) { // available unit cash is less than numerator - remainder
            console.log(acc, "type2")
            acc.push([currenValue[0], (currenValue[1] / denom)])
            numChangeTotal = fnChangeTotal(acc)
            numerator = Number(numerator - currenValue[1])
        }
        console.log(acc, "type3")
        return acc
    }
    else if (numChangeTotal == numDiff) { // this is to preserve correct solution, failing this, insufficient change condition prevails
        console.log("check1")
        return acc
    }
    else if (remainder == 0 && numChangeTotal !== numDiff && currenValue[1] >= numerator) { // remainder is 0 and total value of accumulated change is not equal to required change; and available unit cash is more than change required
        acc.push([currenValue[0], numerator / denom])
        numChangeTotal = fnChangeTotal(acc)
        numerator = 0;
        console.log(fnChangeTotal(acc), numDiff, "test2")
        return acc 
    }
    return acc
}, [])

function fnCidTotal (arr) { // total amount availble in cid
    return arr
    .reduce((acc2, currenValue2) => {
        return acc2 + currenValue2[1]
    }, 0)
}

function fnChangeTotal (arr) { // total accumulated cash value across all stored units 
    console.log(arr, "test4")
    return arr
    .reduce((acc2, currenValue2) => {
        return acc2 + currenValue2[1] * arrCidUnits[currenValue2[0]]
    })
}

function fnChangeCalc (arr) { // returns an array with total cash values of each unit, input is an array with quantities of units e.g. number of 5 dollar notes
    return arr.map(money => {
        return [money[0], money[1] * arrCidUnits[money[0]]]
    })
}

function floatSafeRemainder(val, step){ // this function is a workaround to the floating point problem, found on stackoverflow
                                        // https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript
                                        
    var valDecCount = (val.toString().split('.')[1] || '').length;
    var stepDecCount = (step.toString().split('.')[1] || '').length;
    var decCount = valDecCount > stepDecCount? valDecCount : stepDecCount;
    var valInt = parseInt(val.toFixed(decCount).replace('.',''));
    var stepInt = parseInt(step.toFixed(decCount).replace('.',''));
    return (valInt % stepInt) / Math.pow(10, decCount);
}

// processing results 
change = fnChangeCalc(numCidChange)
if (change == false) {
    output.status = "INSUFFICIENT_FUNDS";
    output.change = change;
}
else if (fnCidTotal(change) == fnCidTotal(arrCid)) {
    output.status = "CLOSED";
    output.change = arrCid;
}
else {
    output.status = "OPEN";
    output.change = change;
}

console.log(output)
 */

