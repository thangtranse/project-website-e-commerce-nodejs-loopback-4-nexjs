const url = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

export async function getAllProducts() {
  const products = await fetch(`${url}/products`);
  console.log("thangtran.se", products)
  return await products.json();
}

export async function getProductBySlug(slug) {

  let products = await fetch(`${url}/products/slug/${slug}`).then(response => response.json()).catch(error => error);

  if (products && products[0].type) {
    products[0].type = products[0].type[0] ? products[0].type[0].title : ""
  }

  return products;
}
