import * as path from "path";
import { Category } from "src/categories/models/category.entity";
import { Subcategory } from "src/subcategories/subcategory.entity";
import { getConnection } from "typeorm";
import * as fs from 'fs';

export async function readSubcats() {
    try {
      const cats = await getConnection().manager.find(Category, {});
      const subCatsCount = await getConnection().manager.count(Subcategory, {});
  
      if (subCatsCount > 0) {
        return;
      }
  
      if (cats.length > 0) {
        const subcats = fs.readFileSync(path.join(__dirname, '../../../src/_utils/read_products_from_aljazeera_store/subcats.csv'), 'utf-8');
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