'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movements.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${movement} €</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html)
  });
};
displayMovements(account1.movements)
// zum lesen des innerhtml
console.log(containerMovements.innerHTML)


const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${out} €`

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter(int => int > 1)
    .reduce((acc, int) => acc + int, 0)
  labelSumInterest.textContent = `${interest} €`;
};


const createUsername = function (accs) {
  accs.forEach(function (acc) {
    // hier wird gleich der username zum account dazu erstellt als parameter
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  });
}
createUsername(accounts);

const updateUI = function (acc) {
  displayMovements(currentAccount.movements);

  // display balance
  calcDisplayBalance(currentAccount);

  // display summary
  calcDisplaySummary(currentAccount);
}

// EventHandler
let currentAccount;
// Login
btnLogin.addEventListener('click', function (e) {
  // prevent form from submittig 
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Clear input Fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Display movements
    updateUI(currentAccount);
  }
});

// Transfer Button
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 && receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    updateUI(currentAccount);
  }

});

// Sort Button
let isSorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault;

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted
})


// Loan Button
btnLoan.addEventListener('click', function (e) {
  e.preventDefault;

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
    // add the movement
    currentAccount.movements.push(amount);

    // updateUI
    updateUI(currentAccount);
  }
  inputLoanAmount = '';
});



// Close Button
btnClose.addEventListener('click', function (e) {
  e.preventDefault;

  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

    // Delete Account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
});



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

/////////////////////////////////////////////////

// Simple Array Methods

let myArray = ['a', 'b', 'c', 'd', 'e'];

console.log(myArray.slice(2));
console.log(myArray.slice(2, 4));
console.log(myArray.slice(-2));
console.log(myArray.slice(-1));
console.log(myArray.slice(1, -2));
console.log(myArray.slice());
console.log(...myArray);

// splice (wie slice, aber mutated, also verändert das array)
// 2ter parameter ist aber wieviele elemente man deleten will
console.log(myArray.splice(2));
console.log(myArray)

// reverse (mutates)
const myOtherArray = ['j', 'i', 'h', 'g', 'f'];
console.log(myOtherArray.reverse());

// Concat
const letters = myArray.concat(myOtherArray);
console.log(letters);
console.log(...myArray, ...myOtherArray);

// Join
console.log(letters.join(' - '));

// Looping Arrays - ForEach
// looped immer durch alle entries, wenn mans nicht will --> for of: 

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// jeweils mit und ohne index. 
for (const movement of movements) {
  if (movement > 0) {
    console.log(`you deposited ${movement}`)
  } else {
    console.log(`you withdrew ${Math.abs(movement)}`)
  }
}

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: you deposited ${movement}`)
  } else {
    console.log(`Movement ${i + 1}: you withdrew ${Math.abs(movement)}`)
  }
}

movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`you deposited ${movement}`)
  } else {
    console.log(`you withdrew ${Math.abs(movement)}`)
  }
});

movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: you deposited ${mov}`)
  } else {
    console.log(`Movement ${i + 1}: you withdrew ${Math.abs(mov)}`)
  }
});

// forEach with Maps and Sets

// Maps
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
// Der Key ist unnötig, weil eh das selbe wie value
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR'])
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`)
});


// Data Transformation Methods - Map, Filter, Reduce
// Map: looped über array und kopiert  mit funktion dazwischen, in ein neues array.
// Filter: looped über array, und was dem filter true auswirft, kommt ins neue array
// Reduce: reduziert alles aus dem array zu einer variable (zb summieren).

// Map
const eurToUsd = 1.1;

const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});

const movementsUSDarrow = movements.map(mov => mov * eurToUsd);
console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map((mov, i) =>
  `Movement ${i + 1}: you ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
);
console.log(movementsDescriptions);

// Filter
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// Reduce
// accumulator: Wert der am schluss rauskommt - die 0 is der initial value des acc
const balance = movements.reduce((acc, cur) => acc += cur, 0);
console.log(balance);

// maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

// Chain them methods together
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);


// Find Method
// holt nur das erste element im array, im gegensatz zu filter, der alle holen würd
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);


// some and every
console.log(movements);
console.log(movements.includes(-130));

// SOME
// any positive movement in the array ? (if any of the values returns true, return true)
console.log(movements.some(mov => mov > 0));


// EVERY 
// if every value in array returns true, return true
console.log(movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit))
console.log(movements.every(deposit))
console.log(movements.filter(deposit))

// Flat & FlatMap
// FLAT: flattens nested array into single array
const arr = [[1, 2, 3], [4, 5, 6], 7, 8]
console.log(arr.flat());

// But only 1 level deep - but levels can be defined
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8]
console.log(arrDeep.flat(2));

// get all movements (and only these), from all accounts
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// in short with chaining
const overalBalanceShort = accounts
  .map(acc => acc.movement)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// or FlatMap:
const overalBalanceFlatMap = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// Sorting Arrays
// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha']
console.log(owners)
console.log(owners.sort());

// numbers (converts everything to string, then sorts... also kommt schaas raus)
console.log(movements)
console.log(movements.sort()); // doesnt work

// order muss angegeben werden, reihenfolge je nach > oder < 0. 
// return < 0 = A, B
// return > 0 = B, A
// ziemlich kuhle kürzung... je nachdem was größer/kleiner is, findet halt die sortierung statt
// verpackt in der arrow function ziemlich kurz. 
movements.sort((a, b) => a - b);
movements.sort((a, b) => b - a);
console.log(movements);
// bei mixed arrays macht sorten ned wirklich sinn...


// More ways of creating and filling arrays: 
console.log([1, 2, 3, 4, 5, 6, 7])
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// empty arrays + Fill Methods
// öffnet array mit 7 leeren elementen.
const myNewArray = new Array(7);
console.log(myNewArray);
console.log(myNewArray.map(() => 5));

// füllt alle
// myNewArray.fill(3);
// füllt per slice
myNewArray.fill(1, 3, 5)
console.log(myNewArray);

arr.fill(23, 4, 6)
console.log(arr);

// Array.from
console.log(Array.from({ length: 7 }, () => 1));

console.log(Array.from({ length: 7 }, (_, i) => i + 1));

// example (alle movements vom http-document holen)
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI);
}); 