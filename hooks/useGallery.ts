import { useEffect, useCallback } from 'react';
import { useGalleryStore } from '../stores/galleryStore';

export const useGallery = () => {
  const {
    allAlbums,
    visibleAlbumsCount,
    loadAllAlbums,
    loadMoreAlbums,
    resetVisibleAlbums,
    getVisibleAlbums
  } = useGalleryStore();
  
  const visibleAlbums = getVisibleAlbums();
  const hasMoreAlbums = visibleAlbumsCount < allAlbums.length;
  
  useEffect(() => {
    if (allAlbums.length === 0) {
      loadAllAlbums();
    }
  }, [allAlbums.length, loadAllAlbums]);
  
  const handleLoadMore = useCallback(() => {
    if (hasMoreAlbums) {
      loadMoreAlbums();
    }
  }, [hasMoreAlbums, loadMoreAlbums]);
  
  return {
    allAlbums,
    visibleAlbums,
    hasMoreAlbums,
    visibleAlbumsCount,
    totalAlbums: allAlbums.length,
    loadMore: handleLoadMore,
    resetVisibleAlbums
  };
};