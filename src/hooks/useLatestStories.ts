import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchLatestStories } from "../api/algoliaHnAPI";

export function useLatestStories() {
  return useInfiniteQuery({
    queryKey: ["latest-stories"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchLatestStories(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;

      if (nextPage >= lastPage.totalPages) {
        return undefined;
      }

      return nextPage;
    },
  });
}
