import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { readSellers } from './_utils/read_products_from_aljazeera_store/read_sellers';
import { readCats } from './_utils/read_products_from_aljazeera_store/read_categories';
import { readSubcats } from './_utils/read_products_from_aljazeera_store/read_subcategories';
import { readProducts } from './_utils/read_products_from_aljazeera_store/read_products';


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
