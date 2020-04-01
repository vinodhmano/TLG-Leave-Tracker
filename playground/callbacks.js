var raw = document.getElementById("template").innerHTML;
var compiled = Handlebars.compile(raw);
var data = { name: "Vinodh" };
var generated = compiled(data);
var e = document.getElementById("container");
e.innerHTML = generated;
