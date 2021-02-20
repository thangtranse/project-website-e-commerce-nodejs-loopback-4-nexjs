import useSWR from 'swr';

const URL_ROOT = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

// import productFetcher from 'utils/api/product';
const fetcher = (url) => fetch(URL_ROOT + url).then((res) => res.json());

interface CategoryProps {
  type: string;
}

export default function useCategory({ type }: CategoryProps) {

  const { data, mutate, error } = useSWR('/ctg?field={"where": {"type": "Products"}}', fetcher);

  const loading = !data && !error;

  // const categories = data?.filter((current) => current.type === type);
  const categories = data

  // const paginatedData = data?.slice(offset, limit);
  // const loggedOut = error && error.status === 403;
  return {
    loading,
    error,
    data: categories,
    // loggedOut,
    // user: data,
    mutate,
  };
}
