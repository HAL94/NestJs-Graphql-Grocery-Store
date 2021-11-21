import * as path from "path";
import { Category } from "src/categories/models/category.entity";
import { Product } from "src/products/product.entity";
import { Seller } from "src/sellers/models/seller.entity";
import { Subcategory } from "src/subcategories/subcategory.entity";
import { getConnection } from "typeorm";
import * as fs from 'fs';

export async function readProducts() {
    let errorLine = 1;
    let productLog = null;
    let producedProd = null;
    let subCatLog = null;
    
    try {
      const cats = await getConnection().manager.find(Category, {});
      const subcats = await getConnection().manager.find(Subcategory, {});
      const sellers = await getConnection().manager.find(Seller, {});
      const productCounts = await getConnection().manager.count(Product, {});
  
      if (productCounts > 0) {
        return;
      }
      
      if (cats.length <= 0 || subcats.length <= 0 || sellers.length <= 0) {
        return;
      }
      // Aljazera_Stores_Products
      const products = fs.readFileSync(path.join(__dirname, '../../../src/_utils/read_products_from_aljazeera_store/Aljazera_Stores_Products.csv'), 'utf-8');
      const lines = products.trim().split(/\r?\n/);
      const regexSplitter = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
      for (let i = 1; i < lines.length; i++) {
        errorLine = i;
  
        let productInfo = lines[i].split(regexSplitter);;
        productLog = productInfo;
        const product = new Product();
        product.productTitle = productInfo[0];
        product.productImage = productInfo[1];
        product.productPrice = +productInfo[2];
        product.productOfferPrice = productInfo[3] === '' ? null : +productInfo[3];    
        product.productCategory = cats.find(cat => cat.categoryName === productInfo[4]);
        
        let subCat = productInfo[5];
        let sellerName = productInfo[6];
         
        subCatLog = subCat;
        product.productSeller = sellers.find(seller => seller.name === sellerName);
        product.productSubcategory = subcats.find(subcat => subcat.subCategoryName === subCat);
  
        producedProd = product;
        await getConnection().manager.save(product); 
      }
  
    } catch (error) {
      console.log('ErrorLine', errorLine, productLog, subCatLog);
    }
  }