// Acciones
import {
    AGREGAR_PRODUCTOS,
    AGREGAR_PRODUCTOS_EXITO,
    AGREGAR_PRODUCTOS_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITOSA,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR,
    COMENZAR_EDICION_PRODUCTOS,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types'

// Cada reducer tiene su state inicial
const iniatialState = {
    productos: [],
    error: null,
    loading: false,
    producto: {}
}

// Funcion del Reducer
export default function(state = iniatialState, action){
    switch (action.type) {
        case AGREGAR_PRODUCTOS:
            return {
                ...state,
                error: null,
            }
        case AGREGAR_PRODUCTOS_EXITO:
            return {
                ...state,
                error: null,
                productos: [...state.productos, action.payload]
            }
        case AGREGAR_PRODUCTOS_ERROR:
            return {
                ...state,
                error: true,
            }
        
        
        case COMENZAR_DESCARGA_PRODUCTOS:
            return {
                ...state,
                loading: true,
                producto: {}
            }
        case DESCARGA_PRODUCTOS_EXITOSA:
            return {
                ...state,
                productos: action.payload,
                loading: false,
                error: false,
                producto: {}
            } 
        case DESCARGA_PRODUCTOS_ERROR: 
            return {
                ...state,
                productos: [],
                error: true,
                loading: false,
                producto: {}
            }

        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                error: null
            }
        case PRODUCTO_ELIMINADO_EXITO:
            return {
                ...state,
                productos: state.productos.filter( producto => producto._id !== action.payload )
            }
        case PRODUCTO_ELIMINADO_ERROR: 
            return {
                ...state,
                error: true
            }

        case OBTENER_PRODUCTO_EDITAR: 
            return {
                ...state,
                error: null
            }
        case PRODUCTO_EDITAR_EXITO: 
            return {
                ...state,
                error: null,
                producto: action.payload
            }
        case PRODUCTO_EDITAR_ERROR:
            return {
                ...state,
                error: true
            }
        case COMENZAR_EDICION_PRODUCTOS:
            return {
                ...state,
                error: null
            }
        case PRODUCTO_EDITADO_EXITO:
            return {
                ...state,
                error: null,
                productos: state.productos.map(
                    producto => producto._id === action.payload._id ? producto = action.payload : producto
                )
            }
        case PRODUCTO_EDITADO_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

