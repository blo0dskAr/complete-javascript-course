'use strict';

// default parameters 
const bookings = [];

const createBooking = function (flightNum, numPassengers = 1, price = 199) {
    const booking = {
        flightNum,
        numPassengers,
        price
    };
    console.log(booking);
    bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', undefined, 1000);


// how passing arguments work: values vs. references

// const flight = 'LH234';
// const jonas = {
//     name: 'Jonas Wurst',
//     passport = 123123123123
// }

// const checkIn = function (flightNm, passenger) {
//     passenger.name = 'Mr. ' + passenger.name;
// }

// checkIn(flight, jonas)


// Higher order Functions - Functions accepting Callback Functions 

const oneWord = function (str) {
    return str.replace(/ /g, '-').toLowerCase();
}

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
}

// Higher
const transformer = function (str, fn) {
    console.log(`Original String: ${str}`)
    console.log(`Transformed string: ${fn(str)}`)

    console.log(`Transformed by: ${fn.name}`);
};

transformer('Javascript is the best!', upperFirstWord);

transformer('Javascript is the best!', oneWord);

// Functions returns new Functions 
// works because of closures ... more later

const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`)
    }
}

const greeterHey = greet('Hey');

greeterHey('Jonas');
greeterHey('Steven')

greet('Hello')('Hans');

// Challenge - mit arrowFunctions extra kurz
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Ola')('Chesus')


// The Call and Apply Methods
const Lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],

    book(flightNumber, myName) {
        console.log(`${name}} booked a sear on ${this.airline} flight ${this.iataCode}${flightNumber}`
        );
        this.bookings.push({ flight: `${this.iataCode}${flightNumber}`, name });
    },
};

Lufthansa.book(239, 'Hans Wurst');
Lufthansa.book(635, 'Melinda Wurst');
console.log(Lufthansa)

const eurowings = {
    name: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
}

const book = Lufthansa.book;
// Doesnt work (it shouldnt)
// book(23, 'Sarah Williams')

book.call(eurowings, 23, 'Sarah Williams')
console.log(eurowings)

book.call(Lufthansa, 239, 'Mary Cooper');
console.log(Lufthansa)

// Apply Method
const flightData = [583, 'George Cooper'];
book.apply(eurowings, flightData)
console.log(eurowings)

// Das ist die besser version vom obigen apply
book.call(eurowings, ...flightData);


// Bind Method
// returns a new function where "the this keyword is bound"
const bookEW = book.bind(eurowings);
bookEW(666, 'Steven Hawkings')

const bookEW666 = book.bind(eurowings, 42);
bookEW666('Hans Wörst');

// Partial Application 

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23)
console.log(addVAT(23));

const addTaxRate = function (rate) {
    return function (value) {
        return value + value * rate;
    }
}

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(23));


// Im,mediately Invoked Function Expressions (IIFE)

// klammern um die function herum. und danach nochmal () - quasi weil functionaufruf
// mit aktuellem javascript weniger verwendet. 
(function () {
    console.log('This will never run again')
})();

(() => console.log('This will never run again2'))();


// CLosures
// nur implizit
// A Function has access to the variable environment of the execution context which it was created
// closure: VE Attache to the function, exactly as it was at the time and place the function was created.

const secureBooking = function () {
    let passengerCount = 0;

    return function () {
        passengerCount++;
        console.log(`${passengerCount} passengers`)
    }
}

const booker = secureBooking();

booker();
booker();
booker();

// so kann man sich die properties anguggen. 
console.dir(booker)

// Closure examples
let myVar;

const myConst = function () {
    const aa = 23;
    myVar = function () {
        console.log(aa * 2);
    }
}

const otherConst = function () {
    const bb = 777;
    myVar = function () {
        console.log(bb * 2);
    }
}

myConst();
myVar();
otherConst();
myVar();

// example 2

const boardPassengers = function (n, wait) {
    const perGroupn = n / 3;

    setTimeout(function () {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroupn} passengers`)
    }, 1000)

    console.log(`Will start boarding in ${wait} seconds`)
}

boardPassengers(180, 3); 