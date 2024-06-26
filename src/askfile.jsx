import axios from "axios";
import { useState } from "react";

function AskFile() {
	const [auth, setAuth] = useState();
	const [fileId, setfileId] = useState([]);
	const [question, setQuestion] = useState();

	const storeToken = ($event) => {
		setAuth($event.target.value);
	};
	const storeFileIds = ($event) => {
		const newIds = [...fileId, $event.target.value];
		setfileId(newIds);
	};
	const storeQuestion = ($event) => {
		setQuestion($event.target.value);
	};

	const getAnswers = async () => {
		const response = await axios.post(
			"https://backend-dev.sokrateque.ai/api/questions/ask-files/0",

			{
				filesList: fileId,
				question: question,
			},
			{
				headers: {
					Authorizations: auth,
				},
				responseType: "stream",
			}
		);
		console.log("Axios got a response");
		const stream = response.data;
		console.log(response);

		// Consume the response data
		const reader = stream.pipeThrough(new TextDecoderStream()).getReader();
		while (true) {
			const { value, done } = await reader.read();
			if (done) break;
			console.log(value);
		}
	};
	return (
		<div>
			<p>this is something</p>
			<input onChange={storeToken} />
			<input onChange={storeFileIds} type="text" />
			<input onChange={storeQuestion} type="text" />

			<button onClick={getAnswers}>ask</button>
			{/* <button onClick={generateToken}>token</button> */}
		</div>
	);
}
export default AskFile;
