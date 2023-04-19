import express from 'express';
import productsRouter from './productos.js';
import carritoRouter from './carrito.js';

const PORT =  8080;

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.listen(PORT, ()=> {
    console.log('Servidor funcionando por el puerto: ' + PORT)
})

app.use("/api/products", productsRouter);
app.use("/api/carrito", carritoRouter);

