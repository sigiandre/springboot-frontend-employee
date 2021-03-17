import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeCompenent extends Component {
    constructor(props){
        super(props)
        this.state = {
            //step 2
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);

        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    //step 3
    componentDidMount(){
        //step4
        if(this.state.id === '_add'){
            return
        }
        else{
            EmployeeService.getEmployeeId(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({firstName: employee.firstName, lastName: employee.lastName, emailId: employee.emailId});
            });
        }
    }

    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log('employee => ' + JSON.stringify(employee));

        //step5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res => {
                this.props.history.push('/employees');
            });
        }
        else{
            EmployeeService.updateEmployee(employee, this.state.id).then(res => {
                this.props.history.push('/employees');
            });
        }
    }

    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({emailId: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees')
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Agregar Empleado</h3>
        }
        else{
            return <h3 className="text-center">Actualizar Empleado</h3>
        }
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Nombre Completo: </label>
                                        <input placeholder="Nombre Completo" name="firstName" className="form-control" value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Apellido Completo: </label>
                                        <input placeholder="Apellido Completo" name="lastName" className="form-control" value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Direccion de Email: </label>
                                        <input placeholder="Direccion de Email" name="emailId" className="form-control" value={this.state.emailId} onChange={this.changeEmailHandler} />
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Guardar</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                                </form>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateEmployeeCompenent;