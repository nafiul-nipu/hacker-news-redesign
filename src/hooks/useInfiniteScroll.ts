import { useEffect, useRef } from "react";

type UseInfiniteScrollOptions = {
  enabled: boolean;
  onLoadMore: () => void;
};

// when the user reaches near the bottom
// automatically load more stories
export function useInfiniteScroll({
  enabled,
  onLoadMore,
}: UseInfiniteScrollOptions) {
  // reference to the element near the bottom of the news list
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  // always use the latest load-more function
  const onLoadMoreRef = useRef(onLoadMore);

  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target || !enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        // load more stories when the bottom div becomes visible
        if (firstEntry.isIntersecting) {
          onLoadMoreRef.current();
        }
      },
      {
        // start loading slightly before the user fully reaches the bottom
        rootMargin: "200px",
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [enabled]);

  return loadMoreRef;
}
