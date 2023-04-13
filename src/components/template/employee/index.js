import { useState, useEffect } from "react";

import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "../../atom/button";
import axios from "axios";
import ModalView from "../../molecule";
import Swal from "sweetalert2";
import API from "../../../services";

// useEffect -> akan dijalankan ketika setiap component di panggil
// kurung siku yg berada di useEffect itu namanya depedencies (ketergantungan)
// atau pembatasan

// klo ada data useState di useEffect depedencies
// itu artinya useEffect akan dijalankan ketika data useState nya berubah

function Employee(props) {
	const [allDataEmployee, setAllDataEmployee] = useState(null);

	const [methodReq, setMethodReq] = useState("");
	const [empById, setEmployeeById] = useState(null);

	const [showModal, setShowModal] = useState(false);
	const handleClose = () => setShowModal(false);
	const handleShow = () => {
		setShowModal(true);
		setMethodReq("post");
	};

	let style = {
		borderRadius: "12px",
	};

	useEffect(() => {
		getAllEmployee();
	}, []);

	const getAllEmployee = async () => {
		const response = await API.getAllEmployee();
		setAllDataEmployee(response.data);
	};

	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You will not be able to recover this item!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "No, cancel",
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
		}).then((result) => {
			if (result.isConfirmed) {
				API.deleteEmployeeById(id).then((res) => {
					Swal.fire({
						icon: "success",
						title: "Berhasil!",
						text: "Data berhasil dihapus!",
					}).then((res) => {
						window.location.reload();
					});
				});
			}
		});
	};

	return (
		<div className="container">
			<h4 className="mt-5 mb-4">CRUD Spring dengan ReactJS</h4>
			<Button typeButton="success" {...style} onClick={handleShow}>
				Add new data
			</Button>
			<Table striped bordered hover id="myTable">
				<thead>
					<tr>
						<th className="text-center">#</th>
						<th>Id</th>
						<th>Name</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{allDataEmployee &&
						allDataEmployee.data.map((item, index) => {
							return (
								<tr key={index}>
									<td className="text-center">{index + 1}</td>
									<td>{item.fullname}</td>
									<td>{item.email}</td>
									<td>
										<Button
											typeButton="warning"
											onClick={() => {
												setShowModal(true);
												setMethodReq("put");
												axios
													.get(`http://localhost:8088/api/employee/${item.id}`, {
														responseType: "json",
													})
													.then((res) => {
														setEmployeeById(res.data);
													})
													.catch((err) => {
														console.log(err);
													});
											}}
										>
											Edit
										</Button>
										<Button typeButton="danger" onClick={() => handleDelete(item.id)}>
											Delete
										</Button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</Table>

			<ModalView
				show={showModal}
				hide={handleClose}
				empById={empById}
				methodReq={methodReq}
			/>
		</div>
	);
}

export default Employee;
