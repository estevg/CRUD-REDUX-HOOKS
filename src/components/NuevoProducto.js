import React, {useState} from 'react'


// Redux
import {crearNuevoProductoActions} from '../actions/productosActions'
import {validarFromularioActions, validacionExito, validarError} from '../actions/validacionActions';
import { useDispatch, useSelector } from 'react-redux'


const NuevoProducto = ({history}) => {

    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState('');

    // Crear nuevo Producto
    const dispatch = useDispatch();
    const agregarProducto = (producto) => dispatch( crearNuevoProductoActions(producto) ) 
    const validarFormulario = () => dispatch( validarFromularioActions() )
    const exitoValidacion = () => dispatch ( validacionExito() )
    const errorValidacion = () => dispatch ( validarError() )

    // Obtener los datos del State
    const error = useSelector((state) => state.error.error)
    
    // Agregar Nuevo Producto
    const submitNuevoProducto = e => {
        e.preventDefault();
        validarFormulario();

        // Validar el formulario
        if(nombre.trim === '' || precio.trim() === ''){
            errorValidacion();
            return;
        }
        // si pasa la validacion
        exitoValidacion();
        // Crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        })
        // Redireccionar
        history.push('/');
    }


    return ( 
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold ">Agregar Nuevo Libro</h2>
                        <form onSubmit={submitNuevoProducto}>
                            <div className="form-group">
                                <label>Nombre Libro</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre Libro"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Libro</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Precio Libro"
                                    value={precio} 
                                    onChange={e => guardarPrecio(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Agregar</button>
                        </form>
                        {error ? <div className="font-weight-bold alert alert-danger text-center mt-4">Todos los datos son obligatorios</div> : null}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;


