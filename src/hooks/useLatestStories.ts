import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchLatestStories } from "../api/algoliaHnAPI";

export function useLatestStories() {
  return useInfiniteQuery({
    // unique cache key for the latest Hacker News feed
    queryKey: ["latest-stories"],

    // start loading from the first API page
    initialPageParam: 0,

    // fetch one page of stories from the API.
    queryFn: ({ pageParam }) => fetchLatestStories(pageParam),

    // tell react query which page to load next
    getNextPageParam: (lastPage) => {
      // next page id (e.g. 0+1)
      const nextPage = lastPage.page + 1;

      // stop loading if no more pages to load
      if (nextPage >= lastPage.totalPages) {
        return undefined;
      }

      return nextPage;
    },
  });
}
