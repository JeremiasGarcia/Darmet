/* ---------------------- Modulos ----------------------*/
import express from 'express';
import path from 'path';
import routerProductos from './src/routes/producto.routes.js';
import routerCarrito from './src/routes/carrito.routes.js';

/* ---------------------- Instancia Server ----------------------*/
const app = express();

/* ---------------------- Middlewares ----------------------*/
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

/* ---------------------- Rutas ----------------------*/

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

/* ---------------------- Servidor ----------------------*/
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})
//Servidor escuchando en el puerto ${server.address().port}
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});
