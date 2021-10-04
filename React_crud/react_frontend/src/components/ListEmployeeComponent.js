import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

export default class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state={
            employees : []
        }
        this.addEmployee=this.addEmployee.bind(this);
        this.editEmployee=this.editEmployee.bind(this);
        this.deleteEmployee=this.deleteEmployee.bind(this);
    }

    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);   
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({employees:res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then((res)=>{
            this.setState({employees:this.state.employees.filter(employee => employee.id!== id)});
        });
    }

    render() {
        return (
            <div>
                <h2 style={{marginTop:"20px"}} className="text-center">IAS-Employees</h2>
                <div className="row">
                    <button style={{marginBottom:"10px", }} className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email-Id</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.firstname}</td>
                                        <td>{employee.lastname}</td>
                                        <td>{employee.email}</td>
                                        <td>
                                        <button style={{marginLeft:"20px",backgroundColor:"green"}} onClick={()=> this.viewEmployee(employee.id)} className="btn btn-info">View</button>
                                            <button style={{marginLeft:"20px"}} onClick={()=> this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                            <button style={{marginLeft:"20px"}} onClick={()=> this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                            ))
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }
}
