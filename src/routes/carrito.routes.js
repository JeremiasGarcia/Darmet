import { Router } from 'express';
import { ContenedorArchivo } from '../container/ContenedorArchivos.js';


const routerCarrito = Router();
const carritosApi = new ContenedorArchivo('dbCarritos.json');
const productosApi = new ContenedorArchivo('dbProductos.json');

routerCarrito.get('/', async (req, res)=>{
    res.json(await carritosApi.listarTodos());
});

routerCarrito.get('/:id/productos', async (req, res)=>{
    res.json(await carritosApi.listar(req.params.id));
});

routerCarrito.post('/', async (req, res)=>{
    console.log(req.body);
    res.json({id: await carritosApi.guardar({productos: []})});
});

routerCarrito.post('/:id/productos', async (req, res)=>{
    const carrito = await carritosApi.listar(req.params.id);
    const producto = await productosApi.listar(req.params.id);
    carrito.productos.push(producto);
    await carritosApi.actualizar(carrito, req.params.id);
    res.end();
});


routerCarrito.delete('/:id', async (req, res)=>{
    res.json(await carritosApi.borrar(req.params.id));
});

routerCarrito.delete('/:id/productos/:idProducto', async (req, res)=>{
    const carrito = await carritosApi.listar(req.params.id);
    const index = carrito.productos.findIndex(p => p.id == req.params.idProducto);
    if(index != -1){
        carrito.productos.splice(index, 1);
        await carritosApi.actualizar(carrito, req.params.id);
    }
    res.end();
});

export default routerCarrito;
