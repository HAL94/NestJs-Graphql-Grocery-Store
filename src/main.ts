import { NestFactory } from '@nestjs/core';
import { getConnection, getConnectionManager } from 'typeorm';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';
import { Seller } from './sellers/models/seller.entity';
import { Category } from './categories/models/category.entity';
import { Subcategory } from './subcategories/subcategory.entity';
import { Product } from './products/product.entity';

async function readSellers() {
  try {
    const sellersAreThere = await getConnection().manager.find(Seller, {});
    if (sellersAreThere.length <= 0) { 
      const data = fs.readFileSync(path.join(__dirname, '../src/Sellers_List.csv'), 'utf-8');
      
      const lines = data.trim().split(/\r?\n/);
  
      for (let i = 1; i < lines.length; i++) {
        const sellerName = lines[i].trim().split(',')[0];
        const seller = new Seller();
        seller.name = sellerName;
  
        await getConnection().manager.save(seller);      
      }      
    }
  } catch (error) {
    console.log(error);
  }
}

async function readCats() {
  try {
    const catsCount = await getConnection().manager.count(Category);

    if (catsCount <= 0) {
      const cats = fs.readFileSync(path.join(__dirname, '../src/cats.csv'), 'utf-8');
      const lines = cats.trim().split(/\r?\n/);

      for (let i = 1; i < lines.length; i++) {
        const categoryName = lines[i].trim().split(',')[0];
        const category = new Category();
        category.categoryName = categoryName;
  
        await getConnection().manager.save(category);      
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function readSubcats() {
  try {
    const cats = await getConnection().manager.find(Category, {});
    const subCatsCount = await getConnection().manager.count(Subcategory, {});

    if (subCatsCount > 0) {
      return;
    }

    if (cats.length > 0) {
      const subcats = fs.readFileSync(path.join(__dirname, '../src/subcats.csv'), 'utf-8');
      const lines = subcats.trim().split(/\r?\n/);
      const regexSplitter = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

      for (let i = 1; i < lines.length; i++) {
        const subCatInfo = lines[i].trim().split(regexSplitter);
        // const subCatInfo = CSVtoArray(lines[i].trim());
        const subcateogry = new Subcategory();
        // console.log(lines[i].trim());
        let subCategoryName = subCatInfo[0]; 
        let parent = subCatInfo[1];
        // if (subCategoryName.startsWith("\"")) {
        //   subCategoryName = (subCategoryName.trim().toLowerCase() + subCatInfo[1]).trim().toLowerCase();
        //   parent = subCatInfo[2];           
        // }
          
        subcateogry.subCategoryName = subCategoryName;
        subcateogry.parent = cats.find(cat => cat.categoryName === parent);
        await getConnection().manager.save(subcateogry);       
      }
    }
  } catch (error) {
    console.log(error);
  } 
}
 
async function readProducts() {
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
    const products = fs.readFileSync(path.join(__dirname, '../src/Aljazera_Stores_Products.csv'), 'utf-8');
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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  console.log('Fetching Data');
  await readSellers();
  await readCats();
  await readSubcats();  
  await readProducts();
  console.log('Fetching Finished');

  await app.listen(3000);
}
bootstrap();
