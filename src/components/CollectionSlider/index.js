import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settingsnew } from "components/Constants";
import Content from "components/CollectionSlider/Content";
import * as selectors from 'store/selectors';
import { fetchHotCollections } from "store/actions/thunks";

const CarouselCollectionRedux = ({t}) => {

  const dispatch = useDispatch();
  const hotCollectionsState = useSelector(selectors.hotCollectionsState);
  const hotCollections = hotCollectionsState.data ? hotCollectionsState.data : [];

  useEffect(() => {
    dispatch(fetchHotCollections());
}, [dispatch]);

  return (
      <div className='nft theme-background'>
        <Slider {...settingsnew}>
          { hotCollections && hotCollections.map((collection, index) => (
            <Content
              key={index}
              index={index + 1}
              collection={collection}
              t={t}
            />
          ))}
        </Slider>
      </div>
  );
}

export default memo(CarouselCollectionRedux);
