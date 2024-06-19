import axios from "axios";
import { useState } from "react";

function DriveAccess() {
	const [auth, setAuth] = useState();
	const [code, setCode] = useState();

	const storeAuth = ($event) => {
		setAuth($event.target.value);
	};
	const storeCode = ($event) => {
		setCode($event.target.value);
	};
	const generateLink = async () => {
		console.log(auth, "auth");
		// const response = await fetch("http://[::1]:3200/api/g-drive/permission-url", {
		// 	method: "GET",
		// headers: {
		// 	"Content-Type": "application/json",
		// 	Authorizations: "barer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTIsImVtYWlsIjoiYW1hbHZpbm9kcUBnbWFpbC5jb20iLCJyb2xlIjpudWxsLCJpYXQiOjE3MTg3NzIwOTIsImV4cCI6MTcxODk0NDg5Mn0.8He22ephNC5ZEe9HnFhAqoJsgOoZQKyJ7uKF_5ActcI",
		// },
		// 	// body: JSON.stringify({
		// 	//     fileId: "1556767374921",
		// 	//     prompt: "what is the level of humans?",
		// 	// }),
		// });
		// console.log(response);
		axios
			.get(`https://backend-dev.sokrateque.ai/api/g-drive/permission-url`, {
				headers: {
					"Content-Type": "application/json",
					Authorizations: auth,
				},
			})
			.then((response) => {
				console.log(response.data.data, "this is reponse");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const generateToken = () => {
		console.log(decodeURIComponent(code), "code");
		axios
			.post(
				"https://backend-dev.sokrateque.ai/api/g-drive/generate-token",
				{
					code: decodeURIComponent(code),
				},
				{
					headers: {
						Authorizations: auth,
					},
				}
			)
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<p>this is something</p>
			<input onChange={storeAuth} />
			<input onChange={storeCode} type="text" />

			<button onClick={generateLink}>link</button>
			<button onClick={generateToken}>token</button>
		</div>
	);
}

export default DriveAccess;
