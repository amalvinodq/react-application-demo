import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./App.css";
import * as cheerio from "cheerio";

function App() {
	const endPoint = "http://localhost:3200/api/g-drive/";
	const [user, setUser] = useState([]);
	const [fileId, setFileId] = useState(null);
	const [profile, setProfile] = useState(null);
	const [contnet, setContnet] = useState(null);

	const login = useGoogleLogin({
		onSuccess: (codeResponse) => setUser(codeResponse),
		onError: (error) => console.log("Login Failed:", error),
	});

	useEffect(() => {
		if (user) {
			axios
				.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
					headers: {
						Authorization: `Bearer ${user.access_token}`,
						Accept: "application/json",
					},
				})
				.then((res) => {
					console.log(res, "this is user login data responce form google", user);
					let postData = { newUser: true, name: res.data.name, provider: "google", email: res.data.email, provider_id: res.data.id, token: user.access_token, provider_pic: res.data.picture, first_name: res.data.given_name, last_name: res.data.family_name };
					localStorage.setItem("userData", postData);
					setLogin(postData);
					setProfile(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, [user]);

	const storeValues = ($event) => {
		console.log($event.target.value);
		setFileId($event.target.value);
	};
	const getText = async () => {
		const token = localStorage.getItem("google_token");
		console.log(token);
		axios
			.get(`https://www.w3schools.com/whatis/whatis_react.asp`)
			.then((response) => {
				const $data = cheerio.load(response.data);
				const isSnippetPresent = $data("body").text();
				console.log(isSnippetPresent);
				setContnet(isSnippetPresent);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const makeApiCall = () => {
		axios.post(
			"http://localhost:3200/api/questions/ask-google-document/0",
			{
				fileId: fileId,
				question: "this is the test cases",
				contnet: contnet,
			},
			{
				headers: {
					Authorizations: "barer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImVtYWlsIjoiYW1hbHZpbm9kcUBnbWFpbC5jb20iLCJyb2xlIjpudWxsLCJpYXQiOjE3MTU5MjI2MjUsImV4cCI6MTcxNjA5NTQyNX0.tYVOr7ByVcut0sMCqD_fwnDjwwFAYmjpRtgQ5yXXbkQ",
				},
			}
		);
	};
	// log out function to log the user out of google and set the profile array to null
	const logOut = () => {
		googleLogout();
		setProfile(null);
	};

	const setLogin = (profileData) => {
		console.log(profileData, "this is the profile data");
		localStorage.setItem("google_token", profileData.token);

		axios
			.post(endPoint + "login", profileData)
			.then((response) => {
				console.log(response, "this is the login result");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			<h2>React Google Login</h2>
			<br />
			<br />
			{profile ? (
				<div>
					<img src={profile.picture} alt="user image" />
					<h3>User Logged in</h3>
					<p>Name: {profile.name}</p>
					<p>Email Address: {profile.email}</p>
					<br />
					<br />
					<button onClick={logOut}>Log out</button>
					<br />
					<br />
					<br />

					<input type="text" onChange={storeValues} />
					<br />
					<button onClick={getText}>get text</button>

					<button onClick={makeApiCall}>ask</button>
				</div>
			) : (
				<button onClick={login}>Sign in with Google 🚀 </button>
			)}
		</div>
	);
}

export default App;
