// let users = [
// 	{
// 		email: "randy@example.com",
// 		password: "3456"
// 	},
// 	{
// 		email: "uthman@example.com",
// 		password: "6789",
// 	}
// ];

let users = JSON.parse(localStorage.getItem("users")) || [];

function getInfo() {
	var email = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	for(let i = 0; i < users.length; i++) {
		if(email === users[i].email && password === users[i].password) {
			document.location.href = "./index.html", true;
			return;
		} else {
			window.alert("Incorrect login details");
			document.location.href = "./login.html", true;
		}
	}
}

let signup = () => {
	var email = document.getElementById("signup-email").value;
	var password = document.getElementById("signup-password").value;

	let search = users.find((user) => user.email === email);
	if(search === undefined){
		users.push({
			email: email,
			password: password
		});
		localStorage.setItem("users", JSON.stringify(users));
		window.location.href = "./index.html", true;
	} else {
		window.alert("Email is associated to an existing account. Try a different email or login.")
		return;
	}
	console.log("Email: " + email + " Password: " + password);
} 