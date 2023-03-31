import { useState, useEffect } from "react";

import Employee from "../../template/employee";
import axios from "axios";
import { Button } from "../../atom/button";

function StarWars() {
	const [data, setData] = useState([{}]);
	const [prev, setPrev] = useState("");
	const [next, setNext] = useState("");
	const [url, setUrl] = useState("https://swapi.dev/api/people");

	useEffect(() => {
		axios({
			method: "get",
			url: url,
		})
			.then((res) => {
				setData(res.data.results);
				setNext(res.data.next);
				setPrev(res.data.previous);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [url]);

	return (
		<div>
			<Employee data={data} />
			<Button onClick={() => setUrl(prev)} typeButton="danger">
				Previous
			</Button>
			<Button onClick={() => setUrl(next)} typeButton="success">
				Next
			</Button>
		</div>
	);
}

export default StarWars;
