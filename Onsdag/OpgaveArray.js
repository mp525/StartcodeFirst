var boys = ["Peter", "lars", "Ole"];
var girls = ["Janne", "hanne", "Sanne"];
console.log(boys);
console.log(girls);

var all = boys.concat(girls);
console.log(all);

var allString = all.join(",");
console.log(allString);
var allHy = all.join("-");
console.log(allHy);

all.push("Lone", "Gitte");
all.unshift("Hans", "Kurt");
console.log(all);

all.shift("Hans");
all.pop("Gitte");
console.log(all);

all.splice(3,2);
console.log(all);

all.reverse();
console.log(all);

all.sort();
console.log(all);

//With callbacks:

var allUC = all.map(function(name) { 
    return name.toUpperCase() ;
});
console.log(allUC);

var allLI = allUC.filter(function(name){
    if(name.toString().substring(0,1) === "L" || name.toString().substring(0,1) === "I"){
        return name;
    }
});
console.log(allLI);