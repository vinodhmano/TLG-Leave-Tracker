const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
	e.preventDefault();
	const url = "http://localhost:4444/users/logout";
	fetch(url, {
		method: "POST"
	})
		.then(() => {})
		.catch((error) => {
			console.log(error);
		});
});
