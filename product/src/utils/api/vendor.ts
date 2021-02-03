const url = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

export async function getAllVendors() {
  const vendors = await fetch(`${url}/news`);
  console.log("thangtran.vendors", vendors)
  return await vendors.json();
}

export async function getVendorBySlug(slug) {
  let products = await fetch(`${url}/news/slug/${slug}`).then(response => response.json()).catch(error => error);

  if (products && products[0].type) {
    products[0].type = products[0].type[0] ? products[0].type[0].title : ""
  }

  return products;
}
