console.log("Signup");
const lookup = document.querySelector("#lookup_supervisor");
const results = document.querySelector("#supervisor_results");
const supervisor_value = document.querySelector("#supervisor");

lookup.addEventListener("click", async (e) => {
	e.preventDefault();
	if (supervisor_value.value === "")
		return alert("Enter supervisor id or name");
	if (!isNaN(parseInt(supervisor_value.value))) {
		console.info("Its a number");
		const response = await fetch("/users/byempid?id=" + supervisor_value.value);
		const data = await response.json();
		console.log(data);
	} else {
		console.info("Its a string");
		const response = await fetch(
			"/users/byname?name=" + supervisor_value.value
		);
		const data = await response.json();
		console.log(data);
		populateResults(data[0]);
	}
});

function populateResults(data) {
	var rawTemplate = $("supvisor-results-template").innerHTML;
	var compiledTemplate = Handlebars.compile(rawTemplate);
	var d = { id: "144726", firstname: "Vinodh", lastname: "Manoharan" };
	var generatedHTML = compiledTemplate(d);
	results.innerHTML = generatedHTML;
}
