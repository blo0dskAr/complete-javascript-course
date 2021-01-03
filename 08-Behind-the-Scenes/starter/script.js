'use strict';

// points to global context (also file, DOM)
console.log(this);

const calcAge = function (birthYear) {
    console.log(2037 - birthYear);
    // points to undefined
    console.log(this);
};
calcAge(1991);

const calcAgeArrow = birthYear => {
    console.log(2037 - birthYear);
    // Points at this (window) from global scope (upper scope)
    console.log(this)
}
calcAgeArrow(1980);

const jonasObject = {
    year: 1991,
    calcAge: function () {
        //Points to the jonas Object
        console.log(this);
    }
}
jonasObject.calcAge();


// primitives vs. objects 

let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';

console.log(lastName, oldLastName)

const jessica = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27
};

// kein neues object, nur kopie der referenzadresse. 
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before Marriage: ', jessica)
console.log('After marriage: ', marriedJessica);

// copying objects
const jessica2 = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
    family: ['Alica', 'Bob']
};

// Shallow copy (only properties from first level - der rest als referenz, was recht weird is)
const jessicaCopy = Object.assign({}, jessica2)
jessicaCopy.lastName = 'Davis';
console.log('Before Marriage: ', jessica2)
console.log('After marriage: ', jessicaCopy);

// deep copy
