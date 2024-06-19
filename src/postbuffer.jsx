/* eslint-disable no-constant-condition */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";

function Postbuffer() {
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://backend-dev.sokrateque.ai/api/analyze/try-yourself/0", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorizations: "barer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTIsImVtYWlsIjoiYW1hbHZpbm9kcUBnbWFpbC5jb20iLCJyb2xlIjpudWxsLCJpYXQiOjE3MTg2ODUxOTQsImV4cCI6MTcxODg1Nzk5NH0.K4w6stmfVdc98h6i3bVzCrAB3GBHdB6A1TXayyPrb3w",
					},
					body: JSON.stringify({
						fileId: "1556767374921",
						prompt: "what is the level of humans?",
					}),
				});

				const reader = response.body.getReader();
				let receivedLength = 0; // length at the moment
				let chunks = []; // array of received binary chunks (comprises the body)
				while (true) {
					const { done, value } = await reader.read();

					if (done) {
						break;
					}

					chunks.push(value);
					receivedLength += value.length;

					// console.log(reader);
					// Here you can process the chunk as text if needed:
					const chunkText = new TextDecoder("utf-8").decode(value);
					console.log(chunkText);
				}

				// Concatenate chunks into single Uint8Array
				let chunksAll = new Uint8Array(receivedLength);
				let position = 0;
				for (let chunk of chunks) {
					chunksAll.set(chunk, position);
					position += chunk.length;
				}

				// Decode into a text string
				const resultText = new TextDecoder("utf-8").decode(chunksAll);

				// This is your final text result
				console.log(resultText);
			} catch (error) {
				console.error("Fetch error:", error);
			}
		};

		fetchData();
	}, []);
	const openSomeNew = () => {
		const newWindow = window.open("", "_blank", "width=400,height=300,top=100,left=100");

		// Render your custom content inside the new window
		newWindow.document.write("<h1>Hello from Custom Pop-up Window!</h1>");
	};
	return (
		<div className="App">
			<h1>Check the console for progress updates</h1>
			{/* <button onClick={openSomeNew()}>click me</button> */}
			{/* <img src="https://box.sokrateque.ai/cloud/retrieve/file/preview?fileId=1516703553254&userId=amr1313mk@gmail.com" alt="fail..." /> */}
			<iframe src="https://box.sokrateque.ai/cloud/retrieve/file/preview?fileId=1516703553254&userId=amr1313mk@gmail.com" style={{ height: "500px" }}></iframe>
		</div>
	);
}

export default Postbuffer;
