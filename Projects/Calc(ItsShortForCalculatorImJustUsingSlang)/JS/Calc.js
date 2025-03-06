const input = document.getElementById("input");

//get buttons
const buttonAdd = document.getElementById("Add");
const buttonSubtract = document.getElementById("Subtract");
const buttonMultiply = document.getElementById("Multiply");
const buttonDivide = document.getElementById("Divide");
const buttonClear = document.getElementById("Clear");
const buttonEqual = document.getElementById("Equal");

//button inputs
buttonAdd.addEventListener("click", add)
buttonSubtract.addEventListener("click", subtract)
buttonMultiply.addEventListener("click", multiply)
buttonDivide.addEventListener("click", divide)
buttonClear.addEventListener("click", clear)
buttonEqual.addEventListener("click", equal)

//keyboard inputs
document.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        equal()
    }
    if(event.key === "Escape"){
        clear()
    }
    if(event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/"){
        input.value += event.key
    }
})

//button functions
function add(){
    input.value += "+";
}
function subtract(){
    input.value += "-";
}
function multiply(){
    input.value += "*";
}
function divide(){
    input.value += "/";
}
function clear(){
    input.value = "";
}