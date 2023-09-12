let sumar =(a,b)=>{
    return a+b;
}

let restar =(a,b)=>{
    return a-b;
}

let multiplicar =(a,b)=>{
    return a*b;
}

let dividir =(a,b)=>{
    return a/b;
}

let primerNumero = prompt(`Ingrese el primer número`);
let segundoNumero = prompt(`Ingrese el segundo número`);
let operador = prompt(`Ingrese el operador`);
let confirmacion;

primerNumero = parseInt(primerNumero);
segundoNumero = parseInt(segundoNumero);
switch(operador) {
    case "+":
        console.log(sumar(primerNumero,segundoNumero));
           confirmacion=confirm(`¿Desea realizar otro cálculo?`)
           if(confirmacion === true){
               window.location.href = "../pages/calculadora.html";
           }else{
               window.location.href = "../index.html";
           }
    break;
    case "-":
        console.log(restar(primerNumero,segundoNumero));
        confirmacion=confirm(`¿Desea realizar otro cálculo?`)
           if(confirmacion === true){
               window.location.href = "../pages/calculadora.html";
           }else{
               window.location.href = "../index.html";
           }
    break;
    case "/":
        console.log(dividir(primerNumero,segundoNumero));
        confirmacion=confirm(`¿Desea realizar otro cálculo?`)
           if(confirmacion === true){
               window.location.href = "../pages/calculadora.html";
           }else{
               window.location.href = "../index.html";
           }
    break;
    case "*":
        console.log(multiplicar(primerNumero,segundoNumero));
        confirmacion=confirm(`¿Desea realizar otro cálculo?`)
           if(confirmacion === true){
               window.location.href = "../pages/calculadora.html";
           }else{
               window.location.href = "../index.html";
           }
    break;
    default:
    alert("No ha ingresado una opción correcta");
    confirmacion=confirm(`¿Desea realizar otro cálculo?`)
           if(confirmacion === true){
               window.location.href = "../pages/calculadora.html";
           }else{
               window.location.href = "../index.html";
           }
    break;
} 