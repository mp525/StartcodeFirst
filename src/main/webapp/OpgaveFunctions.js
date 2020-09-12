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
//console.log("aaaaaaaaaa");
//msgPrinter("bbbbbbbbbb", 2000);
//console.log("dddddddddd");
//msgPrinter("eeeeeeeeee", 1000);
//console.log("ffffffffff");
//I was right (yes!) Har lige udkommenteret det da det kommer i vejen for resten

function Person(name){
  this.name = name;
  console.log("Name: "+ this.name);
  setTimeout(function(){
    console.log("Hi  "+this.name);  //Explain this
  },2000);
}
//call it like this (do it, even if you know it’s silly ;-)
Person("Kurt Wonnegut");  //This calls the function
console.log("I'm global: "+ name);  //Explain this

//Fordi at Person er et objekt, da det er en constructor, og får attributten name med parametren name. Det objekt bliver globalt og dets attributter.
//Mens den sidste console.log i setTimeout ikke kan kalde this i denne kontext er ingenting og name derfor ikke findes

var p = new Person("Kurt Wonnegut");  //Create an instance using the constructor function
console.log("I'm global: "+ name);  //What’s different ?

//Den eneste forskel her er, at denne gang er dette person objects name attribut ikke global da den er sat på et variabel.

//Store a reference to the outer this
function Person(name){
  this.name = name;
  var self = this;
  console.log("Name: "+ this.name);
  setTimeout(function(){
    console.log("Hi  "+self.name);  
  }.bind(this),2000);
}

var greeter = function(){
  console.log(this.message);
};
var comp1 = { message: "Hello World" };
var comp2 = { message: "Hi" };

var g1 = greeter.bind(comp1 );//We can store a reference, with a specific “this” to use
var g2 = greeter.bind(comp2 );//And here another “this”
setTimeout(g1,500);
setTimeout(g2,1000);



