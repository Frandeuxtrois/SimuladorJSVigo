let autos = ["uno", "corsa", "punto"];
let colores = ["azul", "rojo", "negro"];
const ValorUno = 1300;
const ValorCorsa = 1500;
const ValorPunto = 2000;

let cliente = prompt("¿Cómo es tu nombre?");
alert("Bienvenido " + cliente + " a nuestra concesionaria.");

let auto = prompt("¿Qué auto querés comprar? (uno / corsa / punto)");
let precio = 0;

if (auto === "uno") {
  precio = ValorUno;
} else if (auto === "corsa") {
  precio = ValorCorsa;
} else if (auto === "punto") {
  precio = ValorPunto;
} else {
  alert("Auto no válido. Se asigna 'uno'.");
  auto = "uno";
  precio = ValorUno;
}

let color = prompt("¿Qué color querés? (azul / rojo / negro)");
if (color !== "azul" && color !== "rojo" && color !== "negro") {
  alert("Color no válido. Se asigna 'negro'.");
  color = "negro";
}

alert("Felicitaciones " + cliente + ". Compraste un " + auto + " de color " + color + " por $" + precio);
console.log("Cliente: " + cliente);
console.log("Auto: " + auto);
console.log("Color: " + color);
console.log("Precio final: $" + precio);

confirm("¿Confirmás la compra?");