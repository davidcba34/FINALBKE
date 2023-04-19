import {Router} from "express";

import ProductManager from "../managers/productManager.js";

const router = Router();
const productManager = new ProductManager();

router.post ("/", async (req,res)=>{

    let productoNuevo = await productManager.addProduct();
    res.send({productoNuevo});

})

router.get ("/:pid", async (req,res)=>{

    const id = parseInt(req.params.pid);
    let product = await manager.getProduct(id);
    
    res.send({product});

})

router.post ("/:pid/carrito/:cid", async (req,res)=>{

    try {
        const idCart = req.params.cid;
        const idProd = req.params.pid;
        const resultado = await manager.addProductInCart(idCart, idProd);

        res.send(resultado);



    }catch (error){
        res.status(500).send({error : "error interno"});
    }
    
})

export default router;
