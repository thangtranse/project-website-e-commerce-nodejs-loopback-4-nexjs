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
  const [formattedData, setFormattedData] = useState(true);

  const [nextLimit, setNextLimit] = useState(limit);
  const [nextOffset, setNextOffset] = useState(offset);

  // type là category cha
  // category là category con

  let fields: any = {
    offset: nextOffset,
    limit: nextLimit,
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

  const fetchMore = async (limit, offset) => {
    setNextLimit(limit)
    setNextOffset(offset)
  };

  const { data, mutate, error } = useSWR('/products?filter=' + JSON.stringify(fields), productFetcher);

  const { data: dataCount } = useSWR('/products/count', productFetcher);

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
    mutate,
    formattedData,
    fetchMore,
    offset: nextOffset,
    limit: nextLimit,
    dataCount
  };
}
