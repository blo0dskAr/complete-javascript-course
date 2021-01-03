let js = 'amazing';
// popup
// if (js === 'amazing') alert('JavaScript is FUN!');

console.log(40 + 8 + 23 - 10);

console.log("Jonas");
console.log(23);

let firstName = "Jonas";
console.log(firstName);
console.log(firstName);
console.log(firstName);

let jonas_matilda = "JM";
let $function = 27;

// use descriptive variables ...
let myFirstJob = 'Programmer';
let myCurrentJob = 'Teacher';

// printed boolean, also den datentyp. 
console.log(typeof true);


// neu assignen (muss nicht der selbe typ sein)
jonas_matilda = 123;

// undefined variable
let year;
console.log(year);
console.log(typeof year);
year = 1991;
console.log(year);

// null
console.log(typeof null);


// let, const, var
const actualYear = 2020;
const ageJonas = actualYear - 1991;
const ageSarah = actualYear - 2018;
console.log(ageJonas, ageSarah);

// operators
console.log(ageJonas * 2, ageJonas / 2, 2 ** 3);

const lastName = 'Bloergh';
console.log(firstName + ' ' + lastName);



// strings and template literals 
const job = "Teacher";
const birthYear = 1991;

const jonas = "I'm " + firstName + ', a ' + (actualYear - birthYear) + ' years old ' + job + '!';
console.log(jonas);

const jonasNew = `I'm ${firstName}, a ${actualYear - birthYear} years old ${job}!`;
console.log(jonasNew);

// if/else statements

const age = 15;

if (age >= 18) {
    console.log("Sarah can start driving licence");
} else {
    const yearsLeft = 18 - age;
    console.log("Sarah is not old enough, wait another " + yearsLeft + " years.");
}

// type conversion
const inputYear = '1991';
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number('Jonas'));
console.log(typeof NaN);

console.log(String(23), 23);

// type coercion
console.log('I am ' + 23 + ' years old');
console.log('23' - '10' - 3);

// falsy values 
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Jonas'));
console.log(Boolean({}));

const money = 0;
if (money) {
    console.log("Dont spend it all ;)");
} else {
    console.log("You should get a job!");
}

// equality operators
const thatAge = 18;
if (thatAge === '18') console.log('you just became an adult(strict)')

if (thatAge == '18') console.log('you just became an adult(lesser)')

// prompting
// const favorite = Number(prompt("whats your favorite number?"));
const favorite = 23;
console.log(favorite)
console.log(typeof favorite);

if (favorite === 23) {
    console.log("Cool! 23 is an amazing number!")
} else if (favorite === 7) {
    console.log("7 is also a cool number")
} else {
    console.log("not a cool number")
}

// logical operators
const hasDriversLicence = true;
const hasGoodVision = true;

console.log(hasDriversLicence && hasGoodVision);
console.log(hasDriversLicence || hasGoodVision);

// switch statement

const day = 'monday';

switch (day) {
    case 'monday':
        console.log("thank god its monday!");
        break;
    case 'tuesday':
        console.log("its tuesday");
        break;
    case 'wednesday':
    case 'thursday':
        console.log("on we and thu i write code examples");
        break;
    case 'friday':
    case 'saturday':
    case 'sunday':
        console.log("chill time");
        break;
    default:
        console.log("not a valid day");
}


// Conditional operator
const anotherAge = 23;
age >= 18 ? console.log("i like to drink wine") : console.log("im not allowed to drink alcohol");

console.log(`I like to drink ${age >= 18 ? "wine" : "water"}`); 