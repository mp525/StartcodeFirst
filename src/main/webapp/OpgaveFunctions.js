//Observe: no return type, no type on parameters
function add(n1, n2) {
    return n1 + n2;
}
;

var sub = function (n1, n2) {
    return n1 - n2;
};

var cb = function (n1, n2, callback) {
    return "Result from the two numbers: " + n1 + " and " + n2 + " = " + callback(n1, n2);
};

console.log(add(1, 2));     // What will this print? = 3
console.log(add);          // What will it print and what does add represent? Det er referencen til funktionen add
console.log(add(1, 2, 3)); // What will it print = 3, fordi den kun læser de første 2.
console.log(add(1));	  // What will it print = NaN
console.log(cb(3, 3, add)); // What will it print = 3 and 3 gave 6
console.log(cb(4, 3, sub)); // What will it print = 4 and 3 gave 1
//console.log(cb(3,3,add())); // What will it print (and what was the problem) = add() er ikke referencen til funktionen, men et kald med ingen værdier som ville returne undefined + undefined, og det ville fejle
console.log(cb(3, "hh", add));// What will it print = 3hh

var cb2 = function (n1, n2, callback) {
    try {
        if (typeof n1 !== "number" || typeof n2 !== "number" || typeof callback !== "function") {
            throw new Error("Error!");
        }
        return "Result from the two numbers: " + n1 + " and " + n2 + " = " + callback(n1, n2);
    } catch (e) {
        console.log("One of the parameters did not match the required type!");
    }

};

console.log(cb2(1, 2, add)); //Virker
console.log(cb2(1, 2, 2)); //Virker ikke
console.log(cb2("hej", 3, add)); //Virker heller ikke

var mul = function (n1, n2) {
    return n1 * n2;
};

console.log(cb(2, 2, mul));
console.log(cb(4, 3, function (n1, n2) {
    return n1 / n2;
}));

//Callbacks with map/filter/foreach

var arr = ["Lars", "Jan", "Peter", "Bo", "Frederik"];
var arr2 = arr.filter(function (name) {
    if (name.length <= 3) {
        return name;
    }
});

arr.forEach(function (name) {
    console.log(name);
});
console.log("");
arr2.forEach(function (name) {
    console.log(name);
});

var upArr = arr.map(function (name) {
    return name.toUpperCase();
});

console.log(upArr);

var htmlNames = arr.map(function (name) {
    return "<li>" + name + "</li>";
}, arr);

var htmlString = htmlNames.join("");
console.log(htmlString);

var cars = [
    {id: 1, year: 1997, make: 'Ford', model: 'E350', price: 3000},
    {id: 2, year: 1999, make: 'Chevy', model: 'Venture', price: 4900},
    {id: 3, year: 2000, make: 'Chevy', model: 'Venture', price: 5000},
    {id: 4, year: 1996, make: 'Jeep', model: 'Grand Cherokee', price: 4799},
    {id: 5, year: 2005, make: 'Volvo', model: 'V70', price: 44799}
];

var filteredCarsYear = cars.filter(function (car) {
    if (car.year > 1999) {
        return car;
    }
});
console.log(filteredCarsYear);

var filteredCarsVolvo = cars.filter(function (car) {
    if (car.make === 'Volvo') {
        return car;
    }
});
console.log(filteredCarsVolvo);

var filteredCarsPrice = cars.filter(function (car) {
    if (car.price < 5000) {
        return car;
    }
});
console.log(filteredCarsPrice);

var sql = cars.map(function () {
    for (let i = 0; i <= cars.length; i++) {
        return "INSERT INTO cars (id,year,make,model,price) VALUES "
                + "(" + cars[i].id + "," + cars[i].year + ",\"" + cars[i].make + "\",\"" + cars[i].model + "\"," + cars[i].price + ");";


    }
}).join("\n");
console.log(sql);

//Asynchronous Callbacks
//Expected order: "aaaaaaaaaa", "dddddddddd", "ffffffffff", "eeeeeeeeee", "bbbbbbbbbb".

var msgPrinter = function (msg, delay) {
    setTimeout(function () {
        console.log(msg);
    }, delay);
};
console.log("aaaaaaaaaa");
msgPrinter("bbbbbbbbbb", 2000);
console.log("dddddddddd");
msgPrinter("eeeeeeeeee", 1000);
console.log("ffffffffff");
//I was right (yes!)


