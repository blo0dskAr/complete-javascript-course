'use strict';

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // orderDelivery: function ({obj}) {
  //   console.log(obj)
  // }

  orderDelivery: function ({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`)
  },

  orderPasta: function (ingredient1, ingredient2, ingredient3) {
    console.log(`Here is your pasta with ${ingredient1}, ${ingredient2}, ${ingredient3}`)
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  }
};

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});





// Destructuring

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// switch 2 variables using destructuring
[main, secondary] = [secondary, main];
console.log(main, secondary);

const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// nested destructuring
const nested = [2, 4, [5, 6]];
const [i, , j] = nested;
console.log(i, j)

const [d, , [e, f]] = nested;
console.log(d, e, f);

// default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);


// Destructuring Objects
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const { name: restaurantName, openingHours: hours, categories: tags } = restaurant;
console.log(restaurantName, hours, tags);

// default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters)

// Mutating variables
let k = 111;
let l = 999;
const obj = { k: 23, l: 7, m: 14 };
// Muss in klammer gesetzt werden, sonst syntax error -.- 
({ k, l } = obj);
console.log(k, l)


// Nested Objects
const { fri: { open: op, close: cl } } = openingHours;
console.log(op, cl);


// The Spread Operator
const myArray = [7, 8, 9];
const badNewArray = [1, 2, myArray[0], myArray[1], myArray[2]];
console.log(badNewArray);

const newArray = [1, 2, ...myArray];
console.log(newArray);
console.log(...newArray);

const newMainMenu = [...restaurant.mainMenu, 'Gnocchi'];
console.log(newMainMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// join 2 arrays
const joinedMenus = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(joinedMenus);

// iterables: arrays, strings ,maps, sets, NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);

// example
const ingredients = ['meat', 'spagetti', 'tomatoes'];
console.log(ingredients);

restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);


// rest pattern and parameter

const anotherArray = [1, 2, ...[3, 4]]

/// REST, because on the LEFT SIDE of the equal sign: 
const [first, second, ...others] = [1, 2, 3, 4, 5]
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(pizza, risotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// functions 
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum
}
console.log(add(2, 3));
console.log(add(5, 3, 7, 2));
console.log(add(8, 2, 5, 3, 2, 1, 4));

const xxx = [23, 5, 7];
console.log(add(...xxx));

restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');

console.log('--- OR ---')
// Logical Operators advanced
// can use Any datatype, and return datatype, and short-circuiting
console.log(3 || 'Jonas');    // nur 3, weil ab dann short-circuit
console.log(3 | 'Jonas');     // geht da ned :) 
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);


const guests = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests)

// better with short circuit:
restaurant.numGuests = 23;
const guests2 = restaurant.numGuests || 10
console.log(guests2)

console.log('--- AND ---');
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');

console.log('Hello' && 23 && null && 'Jonas');

// practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('Mushrooms', 'spinach');
}

// Eher schiach :) aber geht :) 
restaurant.orderPizza && restaurant.orderPizza('Bacon', 'Cheese');

// Coalesce Nullish Operator
// Nullish: Null, Undefined (NOT 0 or '')
// Nur wenn restaurant null ist, dann nimm die 10. 
const guestCorrect = restaurant ?? 10;
console.log(guestCorrect)


// The for-of Loop (ES6)

const myMenu = [...restaurant.starterMenu, ...restaurant.mainMenu]

for (const item of myMenu) console.log(item);

for (const [item, element] of myMenu.entries()) {
  console.log(`${item + 1}: ${element}`);
}


// enhanced object literals (es6)
// eher am zettl, paar nette erweiterungen.

// optional chaining (es2020)
//console.log(restaurant.openingHours.mon.open);  // Error

// With optional Chaining 
// nur wenn montag (und das davor) existiert, wird open gelesen, sonst undefined returniert
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);


const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

for (const day of days) {
  console.log(day)
  const open = restaurant.openingHours[day]?.open ?? 'nope, not open';
  console.log(`On ${day}, we open at ${open}`)
}

// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist')
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist')

// arrays
const users = [{ name: 'Jonas', email: 'asd@asd.at' }];

console.log(users[0]?.name ?? 'User array empty');



// Looping Objects: Object keys, values, entries

const properties = Object.keys(openingHours);
console.log('we are open on ' + properties.length + ' days');

for (const day of properties) {
  console.log(day);
}

// values
const values = Object.values(openingHours);
console.log(values)

// entries 
const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}



// Sets (ES6)
const ordersSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pizza', 'Pasta'])
console.log(ordersSet)

console.log(new Set('Jonas'));

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));

ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
//ordersSet.clear()

for (const order of ordersSet) {
  console.log(order);
}
const staff = ['Waiter', 'Chef', 'waiter', 'Manager', 'Chef', 'Waiter'];

const staffUnique = new Set(staff);
console.log(staffUnique);


// use case: remove duplicate values from arrays

// Maps
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');

// CHaining möglich, weil immer das neue set returniert wird
rest.set('categories', ['Italian', 'Greek']).set('open, 11').set('close', 23);

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
// delete, size, clear,

rest.set(document.querySelector('h1', 'Heading'));

// Maps: Iterations
const question = new Map([
  ['question', 'What is the best programming language in the world'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try Again!']
])

console.log(question)

// Convert Object to map

console.log(Object.entries(openingHours))
const hoursMap = new Map(Object.entries(openingHours));

for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// nicht schon wieder prompt ... 



// Working with Strings

const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log('B737'[0]);

console.log(airline.length)
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('ortu'));

console.log(airline.slice(4));
console.log(airline.slice(3, 7))
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1))
console.log(airline.slice(-2));
console.log(airline.slice(1, -2));

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Check Email 
const email = 'hello@jonas.io'
const loginEmail = '   Hello@Jonas.IO   \n'

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim()
console.log(normalizedEmail)

console.log(email === normalizedEmail);

// replacing
const priceGB = '288,87$';
const priceUS = priceGB.replace('$', '€');

const announcement = 'All passengers come to boarding door 23. boarding door 23!';
// nur erstes mal wirds geändert
console.log(announcement.replace('door', 'gate'));

// also mit regex
console.log(announcement.replace(/door/g, 'gate'));

//  Booleans  (includes, startsWith, EndsWith)
const plane2 = 'A320neo';
console.log(plane2.includes('20'));

// split 
console.log('a+very+nice+name'.split('+'));

// join 
const [firstName, lastName] = 'Hans Wurst'.split(' ');
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName)

const capitalizeName = function (name) {
  const names = name.split(' ');

  const namesUpper = [];

  for (const namexx of names) {
    namesUpper.push(namexx[0].replace(namexx[0], namexx[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '))
}

const passenger = 'Jessica ann smith davis'

capitalizeName(passenger)

// Padding (added + auf gesamt 25 stellen )
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(35, '+')); 