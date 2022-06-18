import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as selectors from '../../store/selectors';
import { fetchNftsBreakdown } from "../../store/actions/thunks";
import NFTCard from "components/NFTCard";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: false,
        infinite: true,
      }
    },
    {
      breakpoint: 1016,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: false,
        infinite: true,
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
      }
    }
  ]
};

const NFTSlider = ({t}) => {
    const dispatch = useDispatch();
    const nftsState = useSelector(selectors.nftBreakdownState);
    const nfts = nftsState.data ? nftsState.data : [];
    const [height, setHeight] = useState(0);

    const onImgLoad = ({target:img}) => {
        let currentHeight = height;
        if(currentHeight < img.offsetHeight) {
            setHeight(img.offsetHeight);
        }
    }
    
    useEffect(() => {
        dispatch(fetchNftsBreakdown());
    }, [dispatch]);

    return (
        <div className='nft' id="nftslider">
          <Slider {...settings}>
          {nfts && nfts.map( (nft, index) => (
            <div index={index + 1} key={index} className="slider-item">
              <div>
                <NFTCard nft={nft} key={nft.id} onImgLoad={onImgLoad} t={t} />
              </div>
            </div>
          ))}
          </Slider>
        </div>
    );
}

export default memo(NFTSlider);
