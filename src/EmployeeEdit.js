import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmployeeEdit = () => {
    const { empid } = useParams();

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp);
            setEmployee(resp)
        }).catch((err) => {
            console.log(err.message);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputChange = ( event ) => {

        const name = event.target.name;
        const value = event.target.value;
        setEmployee( { ...employee, [name] : value } );
    }

    const [ employee, setEmployee ] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
    })

    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();

      fetch("http://localhost:8000/employee/"+empid,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(employee)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }
    return ( 
        <div>

        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>

                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Employee Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>ID</label>
                                        <input name="id" value={employee.id} disabled="disabled" className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input required name="name" value={employee.name} onChange={handleInputChange} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input name="email" value={employee.email} onChange={handleInputChange} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input name="phone" value={employee.phone} onChange={handleInputChange} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                       <button className="btn btn-success" type="submit">Save</button>
                                       <Link to="/" className="btn btn-danger">Back</Link>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </form>

            </div>
        </div>
    </div>
     );
}
 
export default EmployeeEdit;