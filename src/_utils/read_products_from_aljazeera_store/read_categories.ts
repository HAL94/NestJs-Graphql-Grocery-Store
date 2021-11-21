import * as path from "path";
import { Category } from "src/categories/models/category.entity";
import { getConnection } from "typeorm";
import * as fs from 'fs';

export async function readCats() {
    try {
      const catsCount = await getConnection().manager.count(Category);
  
      if (catsCount <= 0) {
        const cats = fs.readFileSync(path.join(__dirname, '../../../src/_utils/read_products_from_aljazeera_store/cats.csv'), 'utf-8');
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
  