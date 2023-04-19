import fs from 'fs';

const path = './files/products.json'


const productManager = new ProductManager();

 export default class ProductManager{
  
    
    getProducts = async ()=>{
        if (fs.existsSync(path)){
           const data = await fs.promises.readFile(path, 'utf-8');
           const products = JSON.parse(data);
           return products;
        }else{
           return[]
        }   

   }

   getProduct = async (id)=>{
     const products = await this.getProducts();
     const product = products.filter((product)=>{
        return product.id == id
     })
       return product
   }

   addProduct = async (product)=>{
     const products= await this.getProducts();

     let id = products[products.length-1].id;
     product.id = ++id;
     products.push(product)   
     
     try {
        await fs.promises.writeFile(path, JSON.stringify(products,null,'\t'))
        return 'Producto Creado'
     } catch (error) {
        return error
     }


   }

   deleteProduct = async (id)=>{
     const products = await this.getProducts();
     const productIndex = products.findIndex((product)=>{
        return product.id == id;
     })  
     products.splice(productIndex, 1)

     try {
        await fs.promises.writeFile(path, JSON.stringify(products,null,'\t'))
        return 'Producto eliminado';
     } catch (error) {
        return error
     }


   }

   getproductById = async (id) => {
      try {
          const products = await this.getProducts();
          const product = products.find((product) => product.id == id);
          if (product) {
              return console.log(product);
          } else {
              return "not found";
          }
      } catch (error) {
          console.log(error)
      }
  };

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

}
