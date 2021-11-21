import * as path from 'path';
import { Seller } from "src/sellers/models/seller.entity";
import { getConnection } from "typeorm";
import * as fs from 'fs';


export async function readSellers() {
    try {
      const sellersAreThere = await getConnection().manager.find(Seller, {});

      if (sellersAreThere.length <= 0) { 
        const data = fs.readFileSync(path.join(__dirname, '../../../src/_utils/read_products_from_aljazeera_store/Sellers_List.csv'), 'utf-8');
        
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