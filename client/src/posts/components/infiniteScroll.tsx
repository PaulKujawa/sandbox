import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";

interface Props {
  canFetchMore: boolean;
  isFetching: boolean;
  fetchMore: () => void;
  children: React.ReactElement;
}

// TODO it works, but requests are often sent twice!
// `isIntersecting` is somehow triggered double.
export const InfiniteScroll = ({
  canFetchMore,
  isFetching,
  fetchMore,
  children,
}: Props) => {
  const targetRef = React.useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    target: targetRef,
    enabled: canFetchMore,
    onIntersect: fetchMore,
    rootMargin: "250px",
  });

  return (
    <>
      {children}

      {(isFetching || !canFetchMore) && (
        <Box mt={1} mx={2}>
          {isFetching && <LinearProgress variant="indeterminate" />}
          {!canFetchMore && (
            <Typography variant="body1" color="text.secondary">
              All items loaded.
            </Typography>
          )}
        </Box>
      )}

      <div ref={targetRef} />
    </>
  );
};

const useIntersectionObserver = ({
  target,
  enabled,
  onIntersect,
  root,
  rootMargin,
  threshold,
}: IntersectionObserverInit & {
  target: React.RefObject<Element>;
  enabled: boolean;
  onIntersect: () => void;
}) => {
  React.useEffect(() => {
    if (!target.current || !enabled) return;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { root, rootMargin, threshold }
    );

    const elem = target.current;
    intersectionObserver.observe(elem);

    return () => {
      intersectionObserver.unobserve(elem);
    };
  }, [target, enabled, onIntersect, root, rootMargin, threshold]);
};
