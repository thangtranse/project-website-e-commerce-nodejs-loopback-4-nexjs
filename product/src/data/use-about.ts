import useSWR from 'swr';

const URL_ROOT = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
const fetcher = (url) => fetch(URL_ROOT + url).then((res) => res.json());

export default function useUser() {
  let { data, mutate, error } = useSWR('/page-homes?filter={"where": {"key": "about-us"}}', fetcher);
  if(data){
    data = data[0]
  }
  return {
    data,
    mutate,
    error
  };
}
