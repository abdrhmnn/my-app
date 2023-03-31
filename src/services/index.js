import axios from "axios";

axios.defaults.baseURL = "http://localhost:8088/api";

const API = {
	getAllEmployee: () => {
		return axios.get("/employee");
	},
	getEmployeeById: (id) => {
		return axios.get("/employee/" + id);
	},
	saveEmployee: (fullname, email) => {
		return axios.post("/employee", {
			fullname,
			email,
		});
	},
	updateEmployee: (id, data) => {
		return axios.put("/employee/" + id, data);
	},
	deleteEmployeeById: (id) => {
		return axios.delete("/employee/" + id);
	},
};

export default API;
