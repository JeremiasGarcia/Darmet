import { Router } from 'express';
import { ContenedorArchivo } from '../container/ContenedorArchivos.js';

const routerProductos = Router();
const productosApi = new ContenedorArchivo('dbProductos.json');

const esAdmin = true;

function permisoAdmin(req, res, next){
    if (!esAdmin) {
        res.status(403).json({code: 403, msg: 'Acceso denegado'})
    }else{
        next();
    }
}

routerProductos.get('/', async (req, res)=>{
    res.json(await productosApi.listarTodos());
});

routerProductos.get('/:id', async (req, res)=>{
    res.json(await productosApi.listar(req.params.id));
});

routerProductos.post('/', permisoAdmin, async (req, res)=>{
    console.log(req.body);
    res.json({id: await productosApi.guardar(req.body)});
});

routerProductos.put('/:id', permisoAdmin, async (req, res)=>{
    res.json({id: await productosApi.actualizar(req.body, req.params.id)});
});

routerProductos.delete('/:id', permisoAdmin, async (req, res)=>{
    res.json(await productosApi.borrar(req.params.id));
});

export default routerProductos;