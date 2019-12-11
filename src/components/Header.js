import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
            <div className="container">

                <Link to={'/'} className="text-light">
                    CRUD - React, Redux Hooks, REST API y Axios
                </Link>

                <Link to={'/productos/nuevo'} className="btn btn-danger d-block d-md-inline-block"> Agregar Producto &#43;</Link>
            
            </div>
        </nav>
     );
}
 
export default Header;