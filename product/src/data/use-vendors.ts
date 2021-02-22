import Fuse from 'fuse.js';
import useSWR from 'swr';
import { useState } from 'react';

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

const fetcher = (url) => fetch(URL_ROOT + url).then((res) => res.json());

interface Props {
  type: string;
  text?: any;
  category?: any;
  offset?: number;
  limit?: number;
}

export default function useVendors(variables: Props) {

  const { type, text, category, offset = 0, limit = 10 } = variables ?? {};

  console.log(limit)

  const [nextLimit, setNextLimit] = useState(limit);
  const [nextOffset, setNextOffset] = useState(offset);

  let fields: any = {
    offset: nextOffset,
    limit: nextLimit,
    where: {}
  }

  const { data, mutate, error } = useSWR('/news?filter=' + JSON.stringify(fields), fetcher);

  const loading = !data && !error;

  const fetchMore = async (os, lmt) => {
    setNextLimit(os)
    setNextOffset(lmt)
  };
  
  // console.log('object');
  // data: [
  //   ...state.data,
  //   ...state.total.slice(
  //     state.data.length,
  //     state.data.length + state.limit
  //   ),
  // ],
  // need to implement fetchMore
  // const hasMore = vendors?.length > localOffset + localLimit;

  // console.log("thangtran.vender", vendors?.slice(offset, offset + limit))
  
  return {
    loading,
    error,
    data,
    offset: nextOffset, 
    limit: nextLimit,
    // hasMore,
    mutate,
    fetchMore,
  };
}
