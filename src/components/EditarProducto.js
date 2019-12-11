import React, {useEffect, useRef} from 'react'

// Redux 
import { useDispatch, useSelector } from 'react-redux'
import {obtenerProductoEditarAction, editarProductoAction} from '../actions/productosActions'
import {validarFromularioActions, validacionExito, validarError} from '../actions/validacionActions';
import Spinner from './Spinner'
import Swal from 'sweetalert2';

const EditarProducto = ({match, history}) => {
    
    
    const nombreRef = useRef('');
    const precioRef = useRef('');
    
    // Dispatch para ejecutar la accion principal
    const dispatch = useDispatch();
    const editarProducto = (producto) => dispatch( editarProductoAction(producto) )
    const validarFormulario = () => dispatch( validarFromularioActions() )
    const exitoValidacion = () => dispatch ( validacionExito() )
    const errorValidacion = () => dispatch ( validarError() )

    // Obtener el ID a editar
    const { id } = match.params;


    useEffect( () => {
        dispatch( obtenerProductoEditarAction(id)  )
    }, [dispatch, id])

    const producto = useSelector((state => state.productos.producto))
    const error = useSelector((state => state.productos.error))
    const errorFormulario = useSelector((state => state.error.error))

    const submitEditarProducto = e => {
        e.preventDefault();

        // Validar el formulario
        validarFormulario();
        if(nombreRef.current.value.trim() === '' || precioRef.current.value === ''){
            errorValidacion();
            return;
        }

        // no hay error
        exitoValidacion();

        // guardar los cambios
        // console.log(nombreRef.current.value);
        editarProducto({
            id,
            nombre: nombreRef.current.value,
            precio: precioRef.current.value
        }) 

        Swal.fire(
            'Almacenado',
            'El producto fue actualizado correctamente',
            'success'
        )


        // Redireccionar
        history.push('/');

    }

    if(!producto) return <Spinner />

    return ( 
        <React.Fragment>
            {error ? <div className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error intenta de nuevo</div> : 
        
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center">Editar Producto</h2>
                        <form onSubmit={submitEditarProducto}>
                            <div className="form-group">
                                <label>Titulo</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Titulo"
                                    ref={nombreRef}
                                    defaultValue={producto.nombre}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio del Producto</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Precio"
                                    ref={precioRef} 
                                    defaultValue={producto.precio}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar Cambios</button>
                        </form>
                        {errorFormulario ? <div className="font-weight-bold alert alert-danger text-center mt-4">Todos los datos son obligatorios</div> : null}
                    </div>
                </div>
            </div>
        </div>
        }
        </React.Fragment>
     );
}
 
export default EditarProducto;