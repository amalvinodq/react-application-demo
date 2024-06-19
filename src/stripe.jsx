import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

function Stripe() {
	const endPoint = "http://localhost:3200/api/payment/making-payment";
	const makePayment = async () => {
		axios
			.post(
				endPoint,
				{ productId: "price_1PH3QQSBMavAylzXo90nerjG" },
				{
					headers: {
						Authorizations: "barer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTIsImVtYWlsIjoiYW1hbHZpbm9kcUBnbWFpbC5jb20iLCJyb2xlIjpudWxsLCJpYXQiOjE3MTgzNTE0MDYsImV4cCI6MTcxODUyNDIwNn0.JKRxMotz8bloU5d_aVKvHKcI3QyUGDsDd_F1v6bd3HM",
					},
				}
			)
			.then((response) => {
				console.log(response.data.url, "this is the login result");
				window.location = response.data.url;
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div>
			<button onClick={makePayment}>Make Payment</button>
		</div>
	);
}

export default Stripe;
