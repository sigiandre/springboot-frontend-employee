import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }
    
    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }

    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }

    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    render() {
        return (
            <div>
               <h2 className="text-center">Lista de Empleados</h2>
               <div className="row">
                   <button className="btn btn-primary" onClick={this.addEmployee}>Agregar Empleado</button>
               </div>
               <div className="row">
                   <table className="table table-striped table-bordered">
                       <thead>
                           <tr>
                               <th>Nombre de los empleados</th>
                               <th>Apellido de los empleados</th>
                               <th>Email de los empleados</th>
                               <th>Acciones</th>
                           </tr>
                       </thead>
                       <tbody>
                           {
                               this.state.employees.map(employee =>
                                <tr key={employee.id}>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.emailId}</td>
                                    <td>
                                        <button onClick={() => this.editEmployee(employee.id)} className="btn btn-info">Actualizar</button>
                                        <button style={{marginLeft: "10px"}} onClick={() => this.deleteEmployee(employee.id)} className="btn btn-danger">Eliminar</button>
                                        <button style={{marginLeft: "10px"}} onClick={() => this.viewEmployee(employee.id)} className="btn btn-info">Ver</button>
                                    </td>
                                </tr>
                               )
                           }
                       </tbody>
                   </table>
               </div>
            </div>
        )
    }
}

export default ListEmployeeComponent;