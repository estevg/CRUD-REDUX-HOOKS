import React, {useEffect} from 'react'
import Producto from './Producto'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { obtenerProductosActions } from '../actions/productosActions';

// Componente Spinner 
import Spinner from './Spinner'



const Productos = () => {

    // Mandar llamar la accion principal para retornar los productos
    const dispatch = useDispatch();
    
    useEffect( () => {
        // Productos cuando el componente este listo
        const cargarProductos = () => dispatch( obtenerProductosActions() )
        cargarProductos();
        ;
    }, [dispatch])

    // Accerder al state
    const loading = useSelector((state => state.productos.loading));
    const error = useSelector((state => state.productos.error ));
    const productos = useSelector((state => state.productos.productos));
    console.log(productos)

   

    return ( 
        <React.Fragment>
            {error ? <div className="font-weight-bold alert alert-danger text-center mt-5">Hubo un error</div> : null }            
            
                <h2 className="text-center my-5">Listado de Productos</h2>
                    <table className="table table-striped text-center">
                        <thead className="bg-primary table-dark">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Acciones</th>
                            </tr>   
                        </thead>
                        <tbody>
                            {productos.map( producto => (
                                <Producto 
                                key={producto._id}
                                producto={producto}
                                />
                            ))}
                    </tbody>
                    </table> 
            {loading ? <Spinner /> : null}
        </React.Fragment>
     );
}
 
export default Productos;