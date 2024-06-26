import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { AskFileService } from "./AskFileService.jsx";
// import Postbuffer from "./postbuffer.jsx";
// import Stripe from "./stripe.jsx";
// import DriveAccess from "./driveAccess.jsx";
import AskFile from "./askfile.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<GoogleOAuthProvider clientId="697100858787-c71kga3ppfqrrmmuon915iaasbfmujc6.apps.googleusercontent.com">
		<React.StrictMode>
			{/* <App /> */}
			{/* <Stripe /> */}
			{/* <DriveAccess /> */}
			<AskFile />
			{/* <Postbuffer /> */}
		</React.StrictMode>
	</GoogleOAuthProvider>
);
