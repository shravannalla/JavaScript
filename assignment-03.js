const printName = (name) => "Hi " + name;
        
const printBill = (name, bill) => {
    return `Hi ${name}, please pay: ${bill}`;
}
        
const person = {
    name: "Noam Chomsky",
    age: 92
}
           
let {name,age} = person;
let msg=printBill('shravan', 1000);
console.log(name);
console.log(age);
console.log(printName('shravan'));
console.log(msg);