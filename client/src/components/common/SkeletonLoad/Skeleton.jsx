import Skeleton from 'react-loading-skeleton';
import React from 'react';

const SkeletonCard = () => {
  return (
    <Skeleton duration={1} count={5} height={100} width={1000} />
  )
}

export default SkeletonCard;