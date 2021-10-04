import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

export default class CreateEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state={

            //step 2
            id:this.props.match.params.id,
            firstname:'',
            lastname:'',
            email:''
        }
        this.changeFirstNameHandler=this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler=this.changeLastNameHandler.bind(this);
        this.changeEmailHandler=this.changeEmailHandler.bind(this);
        this.saveOrUpdateEmployee=this.saveOrUpdateEmployee.bind(this);
    }

    //step 3
    componentDidMount(){
        //step 4
        if(this.state.id === '_add')
        {
            return 
        }
        else{
            EmployeeService.getEmployeeById(this.state.id).then((res)=>{
                let employee=res.data;
                this.setState(
                    {firstname : employee.firstname,
                    lastname : employee.lastname,
                    email : employee.email
                });
            });
        } 
    }

    saveOrUpdateEmployee=(e)=>{
        e.preventDefault();
        let employee=
            {firstname:this.state.firstname,
            lastname:this.state.lastname,
            email:this.state.email,};
        console.log("Employee =>"+JSON.stringify(employee));

        //step 5
        if(this.state.id === '_add')
        {
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            EmployeeService.updateEmployee(employee,this.state.id).then(res => {
                this.props.history.push('/employees');
            });
        }

        

    }

    changeFirstNameHandler=(event)=>{
        this.setState({firstname:event.target.value});
    }

    changeLastNameHandler=(event)=>{
        this.setState({lastname:event.target.value});
    }

    changeEmailHandler=(event)=>{
        this.setState({email:event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }
        else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input placeholder="First Name" name="firstname" className="form-control"
                                        value={this.state.firstname} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input placeholder="Last Name" name="lastname" className="form-control"
                                        value={this.state.lastname} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email-id:</label>
                                        <input placeholder="Email Address" name="email" className="form-control"
                                        value={this.state.email} onChange={this.changeEmailHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
