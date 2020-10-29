import Skeleton from 'react-loading-skeleton';
import React from 'react';

// Used to display skeleton preview of cards or components loading on the web browser
const SkeletonCard = () => {
  return (
    <Skeleton duration={1} count={5} height={100} width={1000} />
  )
}

export default SkeletonCard;