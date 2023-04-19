import fs from 'fs';
import ProductManager from './productManager.js';

const productManager = new ProductManager();
const path = './files/carritos.json'

 export default class CarritosManager{

    addProductInCart = async (idCart, idProd)=>{
      const carritos= await this. getCarritos();

      const carritosFiltrados = carritos.find((cart)=> cart.id === idCart);
      
      let productsInCart = carritosFiltrados.products;

      const productosIndex = productsInCart[0].findIndex((u)=> u.id === idProd);

      if (productosIndex !== -1){
         productsInCart[productosIndex].quantity =
         productsInCart[productosIndex].quantity + 1;
         
      }else{
         let producto = {
            id: idProd,
            quantity: 1,
         }
         productsInCart.push(producto);
      }
      await fs.promises.whiteFile(path, JSON.stringify(carritos,null, "\t"));
      return carritosFiltrados;
    }
    
    getCarritos = async ()=>{
        if (fs.existsSync(path)){
           const data = await fs.promises.readFile(path, 'utf-8');
           const carritos = JSON.parse(data);
           return carritos;
        }else{
           return[]
        }   

   }
   getCarrito = async (idCart)=>{
      const carritos= await this.getCarritos();
      const carrito = carritos.find((cart)=> cart.id === idCart);

      return (carrito);
      
   }

   }

   getCarById = async (idCart) => {
      const carritos = await this.getCarritos();
      try {
         const carrito = carritos.find((cart)=> cart.id === idCart);
          if (carrito) {
         
              return console.log(carrito);
          } else {
              return "not found";
          }
      } catch (error) {
          console.log(error)
      }
  };

   deleteCart = async (idCart)=>{
     const carritos = await this.getCarritos();
     const carritoIndex = carritos.findIndex((carrito)=>{
        return carrito.id == idCart;
     })  
     carritos.splice(carritoIndex, 1)

     try {
        await fs.promises.writeFile(path, JSON.stringify(carritos,null,'\t'))
        return 'Producto eliminado';
     } catch (error) {
        return error
     }

   }

     modifyProducts = async (id, name, description, price, code, stock, category)=>{

      const products= await this.getProducts();
 
      const productIndex = products.findIndex((product)=>{
         return product.id == id;
      })  
      
      products[productIndex].name = name;
      products[productIndex].description = description;
      products[productIndex].price = price;
      products[productIndex].code = code;
      products[productIndex].stock = stock;
      products[productIndex].category = category;
 
      try {
         await fs.promises.writeFile(path, JSON.stringify(products,null,'\t'))
         return 'Producto Modificado';
      } catch (error) {
         return error
      }
    }
   

    



