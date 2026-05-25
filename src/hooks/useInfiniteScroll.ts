import { useEffect, useRef } from "react";

type UseInfiniteScrollOptions = {
  enabled: boolean;
  onLoadMore: () => void;
};

export function useInfiniteScroll({
  enabled,
  onLoadMore,
}: UseInfiniteScrollOptions) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
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

        if (firstEntry.isIntersecting) {
          onLoadMoreRef.current();
        }
      },
      {
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
