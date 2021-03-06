console.log("Signup");
const lookup = document.querySelector("#lookup_supervisor");
// const results = document.querySelector("#supervisor_results");
const supervisor_value = document.querySelector("#supervisor");

lookup.addEventListener("click", async (e) => {
	e.preventDefault();
	if (supervisor_value.value === "")
		return alert("Enter supervisor id or name");
	if (!isNaN(parseInt(supervisor_value.value))) {
		console.info("Its a number");
		const response = await fetch("/users/byempid?id=" + supervisor_value.value);
		const data = await response.json();
		populateResults(data, anchorWrap);
	} else {
		console.info("Its a string");
		const response = await fetch(
			"/users/byname?name=" + supervisor_value.value
		);
		const data = await response.json();
		populateResults(data, anchorWrap);
	}
});

function populateResults(data, callback) {
	// var rawTemplate = $("supvisor-results-template").innerHTML;
	// var compiledTemplate = Handlebars.compile(rawTemplate);
	// var d = { id: "144726", firstname: "Vinodh", lastname: "Manoharan" };
	// var generatedHTML = compiledTemplate(d);
	// results.innerHTML = generatedHTML;

	var table = document.getElementById("myTable");

	while (table.rows.length > 0) {
		table.deleteRow(0);
	}

	for (let j = 0; j < data.length; j++) {
		var row = table.insertRow(j);
		row.id = `row-${j}`;
		row.insertCell(0);
		row.insertCell(1);
		row.insertCell(2);
		row.insertCell(3);
	}

	for (let k = 0; k < data.length; k++) {
		table.rows[k].cells[0].innerHTML = data[k].id;
		table.rows[k].cells[1].id = `empMongoId-${k}`
		table.rows[k].cells[1].innerHTML = data[k]._id;
		table.rows[k].cells[2].innerHTML = data[k].firstname;
		table.rows[k].cells[3].innerHTML = data[k].lastname;
	}
	callback(data);
}

async function anchorWrap(data){
	for(let j=0; j<data.length; j++){
		let el = document.getElementById(`empMongoId-${j}`).innerHTML;
		newel = `<a href='#'>${el}</a>`;
		document.getElementById(`empMongoId-${j}`).innerHTML = newel;
	}
	linkrow = await document.querySelectorAll('[id^=row-] [id^=empMongoId]');
	if(linkrow){
		for(let i=0; i<data.length; i++){
			linkrow[i].addEventListener("click", (e) => {
				supervisor_value.value === "";
				supervisor_value.value=linkrow[i].textContent;
			});
		}
	}
}