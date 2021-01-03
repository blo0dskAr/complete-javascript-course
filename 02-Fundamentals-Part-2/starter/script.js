'use strict';

let hasDriversLicense = false;
const passTest = true;

// if (passTest) hasDriverLicense = true;       // schreibfehler quasi
if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("i can drive");

// Functions

function logger() {
    console.log('My name is Jonas');
}

// call
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}

const applejuice = fruitProcessor(5, 0);
console.log(applejuice);



// declarations vs. expressions
const actualYear = 2020;

// Function Declaration
function calcAge1(birthYear) {
    return actualYear - birthYear;
}

const age1 = calcAge1(1991);

// Function Expression - quasi anonyme funktion
const calcAge2 = function (birthYear) {
    return actualYear - birthYear;
}

const age2 = calcAge2(1991);
console.log(age1, age2);


// Arrow Function
const calcAge3 = birthYear => actualYear - birthYear;

const age3 = calcAge3(1990);
console.log(age3);

const yearsUntilRetirement = birthYear => {
    const age = actualYear - birthYear;
    const retirement = 65 - age;
    return retirement;
}

const yearsUntilRetirementWithName = (birthYear, firstName) => {
    const age = actualYear - birthYear;
    const retirement = 65 - age;
    return `${firstName} retires in ${retirement} years`;
}

console.log(yearsUntilRetirement(1990));
console.log(yearsUntilRetirementWithName(1984, 'hans'));

// functions calling other functions
function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitPiecesProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
    return juice;
}

console.log(fruitPiecesProcessor(2, 3));


// Wiederholung

const calcAge = function (birthYear) {
    return actualYear - birthYear;
}

const yearsUntilRetirementWithName2 = function (birthYear, firstName) {
    const age = calcAge(birthYear);
    const retirement = 65 - age;

    if (retirement > 0) {
        return `${firstName} retires in ${retirement} years`;
    } else {
        return `${firstName} is already retired.`
    }
}

console.log(yearsUntilRetirementWithName2(1954, 'Mike'));



// Arrays

const friends = ['Michael', 'Steven', 'Peter'];

const years = new Array(1991, 1990, 1989)

console.log(friends[0]);
console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = 'Jay';
console.log(friends);

const jonas = ['Jonas', 'Schmedtmann', 2037 - 1991, 'teacher', friends];
console.log(jonas);

// Basic Array Operations/Methods

console.log(friends.push('Chesus'));

console.log(friends.unshift('Max'));

console.log(friends.pop());

console.log(friends);

console.log(friends.indexOf('Max'));

console.log(friends.includes('Max'));



// Objects

const jonasObject = {
    firstName: 'Jonas',
    lastName: 'Muh',
    age: 2037 - 1991,
    job: 'teacher',
    friends: ['Michael', 'Hans', 'Wurst']
};
console.log(jonasObject);

// Bracked and dot Notation
console.log(jonasObject.lastName);
console.log(jonasObject['lastName']);

const nameKey = 'Name';
console.log(jonasObject['first' + nameKey]);
console.log(jonasObject['last' + nameKey]);

// const interestedIn = prompt('what do you want to know about jonas? firstName, lastName, age, job and friends');
// if (jonas[interestedIn]) {
//     console.log(jonas[interestedIn]);
// } else {
//     console.log('Wrong request! choose between: firstName, lastName, age, job and friends');
// }

jonasObject.location = 'Portugal';
jonasObject['twitter'] = '@jonasBloergh';
console.log(jonasObject);


// Object Methods

const dudeObject = {
    firstName: 'Dude',
    lastName: 'Lebowski',
    myBirthYear: 1991,
    job: 'Professional Bowler',
    friends: ['Michael', 'Hans', 'Wurst'],
    hasDriversLicense: true,

    // calcAge: function (myBirthYear) {
    //     return 2037 - myBirthYear;
    // }

    // calcAge: function () {
    //     return 2034 - this.myBirthYear
    // }

    calcAge: function () {
        this.age = 2037 - this.myBirthYear;
        return this.age
    }
};

// console.log(dudeObject.calcAge());
console.log(dudeObject.calcAge());



// Loops
for (let rep = 1; rep <= 10; rep++) {
    console.log('Lifing weights repetition ' + rep);
}

const JonasArray = ['Jonas', 'Schmedtmann', 2037 - 1991, 'teacher', friends, true];
const types = [];

for (let i = 0; i <= JonasArray.length - 1; i++) {
    console.log(JonasArray[i], typeof JonasArray[i]);

    // types[i] = typeof JonasArray[i];
    types.push(typeof JonasArray[i])
}

console.log(types);

const years0 = [1991, 2008, 1988, 1965, 2019];
const ages = [];

for (let i = 0; i < years0.length; i++) {
    ages.push(2037 - years0[i]);
}
console.log(ages);

// continue and break 
console.log('--- ONLY STRINGS ---')
for (let i = 0; i < JonasArray.length; i++) {
    if (typeof JonasArray[i] !== 'string') continue;

    console.log(JonasArray[i], typeof JonasArray[i])
}


console.log('--- BREAK WITH NUMBER ---')
for (let i = 0; i < JonasArray.length; i++) {
    if (typeof JonasArray[i] === 'number') break;

    console.log(JonasArray[i], typeof JonasArray[i])
}


// Backward loops and Loops in Loops

for (let i = JonasArray.length - 1; i >= 0; i--) {
    console.log(i, JonasArray[i]);
}

for (let exercise = 1; exercise < 4; exercise++) {
    console.log('--- starting exercise ' + exercise)
    for (let rep = 1; rep <= 5; rep++) {
        console.log('Lifting weight repetition ' + rep)
    }
}

// while loop 