import { useEffect, useState } from "react";

const EmployeeDetails = (id) => {
    console.log("Employee Id: ", id);
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + id.empid).then((res) => {
            return res.json();
        }).then((resp) => {
            setEmployee(resp);
        }).catch((err) => {
            console.log(err.message);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className="container">
                <div className="card row" style={{ "textAlign": "left" }}>
                    <div className="card-title">
                        <h2>Employee Details</h2>
                    </div>
                    <div className="card-body"></div>
                        <div>
                            <h4>Employee Id: {employee.id}</h4>
                            <h5>Name : <b>{employee.name}</b></h5>
                            <h5>Email : {employee.email}</h5>
                            <h5>Phone : {employee.phone}</h5>
                        </div>
                </div>
            </div>
        </div >
    );
}

export default EmployeeDetails;