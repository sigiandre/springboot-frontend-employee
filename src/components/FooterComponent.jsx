import React, { Component } from 'react'

class FooterComponent extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <footer className="footer">
                    <span className="text-muted">Todos los Derechos Reservados 2021 @Cibernet</span>
                </footer>
            </div>
        )
    }
}

export default FooterComponent;