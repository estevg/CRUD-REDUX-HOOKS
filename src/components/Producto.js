import React from 'react'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2';
// Redux
import { useDispatch } from 'react-redux'
import { borrarProductoAction } from '../actions/productosActions'



const Producto = ({producto}) => {
    const {_id, nombre, precio} = producto

    const dispatch = useDispatch();

    const confirmarEliminarProducto = id => {

        // Confirmacion de SweeALert
        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Producto eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Cancelar',
                'Your file has been deleted.',
                'success'
              )
              dispatch( borrarProductoAction(id) )
              console.log(id)
            }
          })

        
        

    }

    return ( 
        <tr>
            <td>{nombre}</td>
            <td> <span className="font-weight-bold">$ {precio} </span></td>
            <td className="acciones">
                <Link to={`/productos/editar/${_id}`} className="btn btn-primary mr-2">
                    Editar
                </Link>
                <button  
                className="btn btn-danger"
                onClick={  () => confirmarEliminarProducto(_id) }
                >
                    Eliminar
                </button>
            </td>
        </tr>
     );
}
 
export default Producto;