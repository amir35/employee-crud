import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Table } from 'reactstrap';
import EmployeeDetails from "./EmployeeDetails";

const EmployeesList = () => {
    const [empdata, empdatachange] = useState(null);
    const navigate = useNavigate();

    const [empid, setEmpId] = useState();
    const LoadDetail = (id) => {
        setEmpId(id);
        toggle();
    }
    const LoadEdit = (id) => {
        navigate("/employee/edit/" + id);
    }

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
      }

    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:8000/employee/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    useEffect(() => {
        fetch("http://localhost:8000/employee").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Employee Data</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="employee/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <Table striped>
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {empdata &&
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td><Button onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</Button>
                                            <Button onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</Button>
                                            <Button onClick={() => { LoadDetail(item.id)}} className="btn btn-primary">Details</Button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </Table>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <EmployeeDetails empid={empid} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Ok</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default EmployeesList;