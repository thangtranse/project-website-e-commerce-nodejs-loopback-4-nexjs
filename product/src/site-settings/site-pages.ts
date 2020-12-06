import groceryImage from 'assets/images/banner/grocery.png';
import makeupImage from 'assets/images/banner/makeup.png';
import bagsImage from 'assets/images/banner/bags.png';
import clothingImage from 'assets/images/banner/cloths.png';
import booksImage from 'assets/images/banner/books.png';
import furnitureImage from 'assets/images/banner/furniture.png';
import medicineImage from 'assets/images/banner/medicine.png';
import bakeryImage from 'assets/images/banner/bakery.jpg';

import { SHOP_NAME } from "../environment";

export const sitePages = {
  grocery: {
    page_title: 'Grocery - ' + SHOP_NAME,
    page_description: 'Grocery Details',
    banner_title_id: 'groceriesTitle',
    banner_description_id: 'groceriesSubTitle',
    banner_image_url: groceryImage,
  },
  bakery: {
    page_title: 'Bakery - ' + SHOP_NAME,
    page_description: 'Bakery Details',
    banner_title_id: 'bakeryTitle',
    banner_description_id: 'bakerySubTitle',
    banner_image_url: bakeryImage,
  },
  makeup: {
    page_title: 'Makeup - ' + SHOP_NAME,
    page_description: 'Makeup Details',
    banner_title_id: 'makeupTitle',
    banner_description_id: 'makeupSubTitle',
    banner_image_url: makeupImage,
  },
  bags: {
    page_title: 'Bags - ' + SHOP_NAME,
    page_description: 'Bags Details',
    banner_title_id: 'bagsTitle',
    banner_description_id: 'bagsSubTitle',
    banner_image_url: bagsImage,
  },
  clothing: {
    page_title: 'Clothing - ' + SHOP_NAME,
    page_description: 'Clothing Details',
    banner_title_id: 'womenClothsTitle',
    banner_description_id: 'womenClothsSubTitle',
    banner_image_url: clothingImage,
  },
  furniture: {
    page_title: 'Furniture - ' + SHOP_NAME,
    page_description: 'Furniture Details',
    banner_title_id: 'furnitureTitle',
    banner_description_id: 'furnitureSubTitle',
    banner_image_url: furnitureImage,
  },
  book: {
    page_title: 'Book - ' + SHOP_NAME,
    page_description: 'Book Details',
    banner_title_id: 'booksTitle',
    banner_description_id: 'booksSubTitle',
    banner_image_url: booksImage,
  },
  medicine: {
    page_title: 'Medicine - ' + SHOP_NAME,
    page_description: 'Medicine Details',
    banner_title_id: 'medicineTitle',
    banner_description_id: 'medicineSubTitle',
    banner_image_url: medicineImage,
  },
};
