import { useEffect } from "react";

const useInfiniteScroll = (loading: boolean, loadMore: () => void, offset: number = 100) => {
  useEffect(() => {
    const handleScroll = () => {
      const bottomReached = window.innerHeight + window.scrollY >= document.body.offsetHeight - offset;

      if (bottomReached && !loading) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, offset, loadMore]);
};

export default useInfiniteScroll;
