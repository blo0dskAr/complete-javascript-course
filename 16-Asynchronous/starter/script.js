'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// nicht alle functions sind asynchronous, zB. setTimeout, 

const renderCountry = function (data, className = '') {
    const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html)
    countriesContainer.style.opacity = 1;
}

// most oldschool one: xmlhttprequest

// const getCountryData = function (country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', 'https://restcountries.eu/rest/v2/name/' + country);
//     // Der request ist async
//     request.send('');
//     // und hier noch leer
//     console.log(request.responseText);

//     // und sobalds geladen ist (der event load), kanns geparsed werden.
//     request.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data)

//         // render country 1
//         renderCountry(data);
//     });
// };


// const getCountryAndNeighbour = function (country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', 'https://restcountries.eu/rest/v2/name/' + country);
//     // Der request ist async
//     request.send('');
//     // und hier noch leer
//     console.log(request.responseText);

//     // und sobalds geladen ist (der event load), kanns geparsed werden.
//     request.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data)
//         renderCountry(data);

//         const [neighbour] = data.borders;

//         if (!neighbour) return;

//         // ajax call 2
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', 'https://restcountries.eu/rest/v2/alpha/' + neighbour);
//         request2.send('');
//         request2.addEventListener('load', function () {
//             const data2 = JSON.parse(this.responseText)
//             console.log(data2);

//             renderCountry(data2, 'neighbour');
//         });
//     });
// }

// die reihenfolge in ders angezeigt wird, ist dennoch immmer anders (je nach antwortDauer)
// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');

// 
// getCountryAndNeighbour('austria');


// Moderner Weg für Asyncs - Promises & Fetch API
// v.a. um callback hell zu verhindern, falls abhängige ajax requests gechained werden. 

const request3 = fetch('https://restcountries.eu/rest/v2/name/portugal');
console.log(request3);

// promise lifecycle: pending -> settled(fullfilled/rejected) ->  
// const getcountryDataPromise = function (country) {
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(function (responsFromAjaxCall) {
//         console.log(responsFromAjaxCall);
//         return responsFromAjaxCall.json();
//     }).then(function (data2) {
//         console.log(data2);
//         renderCountry(data2[0])
//     });
// };

// das selbe wie oben, nur code optimiert. 
const getcountryDataPromise = function (country) {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        .then(responsFromAjaxCall => responsFromAjaxCall.json())
        .then(data2 => renderCountry(data2[0])
        );
};
// getcountryDataPromise('portugal');

// chaining promises

// const getcountryDataPromiseChain = function (country) {
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//         .then(responsFromAjaxCall => responsFromAjaxCall.json())
//         .then(data2 => {
//             renderCountry(data2[0]);
//             const neighbour2 = data2[0].borders[0]

//             if (!neighbour2) return;

//             return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour2}`);
//         })
//         .then(response => response.json())
//         .then(data => renderCountry(data));
// };

// getcountryDataPromiseChain('portugal');





// Handling Errors: 

const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
}

const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
        if (!response.ok)
            throw new Error(`${errorMsg} (${response.status})`);

        return response.json();
    });
};

const getcountryDataPromiseChainError = function (country) {
    getJSON(`https://restcountries.eu/rest/v2/name/${country}`, 'Country not found')
        .then(data2 => {
            renderCountry(data2[0]);
            const neighbour2 = data2[0].borders[0]

            if (!neighbour2)
                throw new Error('No neighbour found');

            return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour2}`, 'Country not found')
                .then(data2 => renderCountry(data2, 'neighbour2'))
                .catch(err => {
                    console.error(`------------ ERROR: ${err} ----------`);
                    renderError(`Something went wrong ${err.message}. Try Again!`);
                })
                .finally(() => {
                    countriesContainer.style.opacity = 1;
                });
        });
};
btn.addEventListener('click', function () { getcountryDataPromiseChainError('portugal'); });



// const getcountryDataPromiseChainError = function (country) {
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//         .then(responsFromAjaxCall => {

//             if (!responsFromAjaxCall.ok)
//                 throw new Error(`Country not found ${responsFromAjaxCall.status}`)

//             return responsFromAjaxCall.json()
//         })
//         .then(data2 => {
//             renderCountry(data2[0]);
//             const neighbour2 = data2[0].borders[0]

//             if (!neighbour2) return;

//             return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour2}`);
//         })
//         .then(response => response.json())
//         .then(data => renderCountry(data, 'neighbour2'))
//         .catch(err => {
//             console.error(`------------ ERROR: ${err} ----------`);
//             renderError(`Something went wrong ${err.message}. Try Again!`);
//         })
//         .finally(() => {
//             countriesContainer.style.opacity = 1;
//         });
// };
// btn.addEventListener('click', function () { getcountryDataPromiseChainError('portugal'); });

getcountryDataPromiseChainError('portugal')


// Event Loop in sample (extremely simple)
console.log('Test start');

setTimeout(() => console.log('0 sec timer'), 0);

// Create a promise (simple, later more)
// res =>  runs later, because callback-stack & microcall-stack Priorization.
Promise.resolve('Resolved promise 1').then(res => console.log(res));
// console.log(res);

Promise.resolve('Resolved Promise 2').then(res => {
    for (let i = 0; i < 10; i++) {
        console.log(res);
    }
});


console.log('Test end');

// Building Simple Promises
const lotteryPromise = new Promise(function (resolve, reject) {
    console.log('Lottery draw is happening')
    setTimeout(function () {

        if (Math.random() >= 0.5) {
            resolve('you WIN');
        } else {
            reject('you LOOSE');
        }
    }, 2000)
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err))

// Promisifying ( so sollte mans normalerweise machen, schoenes kapseln von promises)
const wait = function (seconds) {

    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000)
    });
};

wait(2).then(() => {
    console.log('1 Second passed');
    return wait(1);
}).then(() => {
    console.log('2 Second passed');
    return wait(1);
}).then(() => {
    console.log('3 Second passed');
    return wait(1);
}).then(() => {
    console.log('4 Second passed');
    return wait(1);
})
    .then(() => console.log('I waited for 1 second'));


// noch ein beispiel (immediately solved, with static function)
// wird auch gleich am anfang ausgeführt lt. console. 
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('An error occured')).catch(err => console.error(err));


// 
const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}


// Consuming Promises with Async/Await (ES2017)

// const whereAmI = async function (country) {
//     // klassisch
//     // fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res => console.log(res));


//     const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
//     const data = await res.json();
//     renderCountry(data[0]);
// }

const whereAmI = async function (country) {

    try {
        const pos = await getPosition();

        const { latitude: lat, longitude: lng } = pos.coords;

        // reverse geocoding
        const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        const dataGeo = await resGeo.json();
        console.log(dataGeo)

        const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
        const data = await res.json();
        console.log(data)
        renderCountry(data[0]);
        return `You are in ${dataGeo.city}, ${dataGeo.country}`;
    } catch (err) {
        console.error(err);
        renderError(`Something went wrong ${err.message}`)
    }
};

// whereAmI('portugal')
whereAmI();
console.log('FIRST')


// try catch simple example 
try {
    let y = 1;
    const x = 2;
    x = 3;
} catch (err) {
    console.error(alert(err.message));
};


// Returning values from async functions
