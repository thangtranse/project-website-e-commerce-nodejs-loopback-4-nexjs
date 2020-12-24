import useSWR from 'swr';
import Fuse from 'fuse.js';
import { useState } from 'react';
import getUrlParams from '../utils/getUrlParams';

const URL_ROOT = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.3,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  minMatchCharLength: 2,
  keys: ['title'],
};

function search(list, pattern) {
  const fuse = new Fuse(list, options);
  return fuse.search(pattern).map((current) => current.item);
}
// import productFetcher from 'utils/api/product';
const productFetcher = (url) => fetch(URL_ROOT + url).then((res) => res.json());

interface Props {
  type: string;
  text?: any;
  category?: any;
  offset?: number;
  limit?: number;
}
export default function useProducts(variables: Props) {
  const { type, text, category, offset = 0, limit = 20 } = variables ?? {};

  // type là category cha
  // category là category con

  let fields: any = {
    offset: offset,
    limit: limit,
    where: {}
  }

  if (text) {
    fields.where = {
      ...fields.where,
      name: {
        regexp: text
      }
    }
  }

  if (category) {
    fields.where = {
      ...fields.where,
      'type.key': category
    }
  }

  const { data, mutate, error } = useSWR('/products?filter=' + JSON.stringify(fields), productFetcher);

  let products = []
  if (data) {
    products = data.map(da => {
      let temp = da
      if (da.type) {
        temp.categories = [...da.type]
      }
      if (da.album) {
        temp.gallery = da.album.map(img => ({ url: img }))
      }
      return temp
    })
  }

  const loading = !data && !error;

  return {
    loading,
    error,
    data: products,
    // hasMore,
    mutate,
    // fetchMore,
  };

  // need to remove when you using real API integration
  // const [formattedData, setFormattedData] = useState(false);

  // let products = data?.filter((current) => current.type === type);
  // if (category) {
  //   products = products?.filter((product) =>
  //     product.categories.find(
  //       (category_item) => category_item.slug === category
  //     )
  //   );
  // }
  // if (text) {
  //   products = search(products, text);
  // }

  // let localOffset = offset;
  // let localLimit = limit;
  // const fetchMore = async (os, lmt) => {
  //   localOffset = os;
  //   localLimit = lmt;
  //   setFormattedData(true);
  // };
  // console.log('object');
  // data: [
  //   ...state.data,
  //   ...state.total.slice(
  //     state.data.length,
  //     state.data.length + state.limit
  //   ),
  // ],
  // need to implement fetchMore
  // const hasMore = products?.length > localOffset + localLimit;
  // return {
  //   loading,
  //   error,
  //   data: products?.slice(offset, offset + limit),
  //   // hasMore,
  //   mutate,
  //   // fetchMore,
  // };
}
