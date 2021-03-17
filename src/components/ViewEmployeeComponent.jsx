import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ViewEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }
    componentDidMount(){
        EmployeeService.getEmployeeId(this.state.id).then(res => {
            this.setState({employee: res.data});
        });
    }
    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">Ver Detalles del Empleado</h3>
                    <div className="card-body">
                        <div className="row">
                            <label>Nombre del Empleado: </label>
                            <div>{ this.state.employee.firstName }</div>
                        </div>
                        <div className="row">
                            <label>Apellido del Empleado: </label>
                            <div>{ this.state.employee.lastName }</div>
                        </div>
                        <div className="row">
                            <label>Email del Empleado: </label>
                            <div>{ this.state.employee.emailId }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent;