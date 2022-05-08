import React, { useEffect } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { createGlobalStyle } from 'styled-components';
import * as selectors from 'store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotAuctions } from "store/actions/thunks";
import BidSlide from 'components/BidSlide';

const GlobalStyles = createGlobalStyle`
  .nft-big .slick-prev::before{
    left: 0;
    line-height: 40px;
  }
  .nft-big .slick-next::before {
    right: 0;
    line-height: 40px;
  }
  .nft-big .slick-prev, .nft-big .slick-next{
    border: 1px solid var(--palette-text);
    box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.2);
    width: 50px;
    height: 50px;
  }
`;

const SliderCarousel = () => {

    const dispatch = useDispatch();
    const nftAuctionsState = useSelector(selectors.nftAuctions);
    const nftAuctions = nftAuctionsState.data ? nftAuctionsState.data : [];
    const tokenPriceState = useSelector(selectors.projectPriceState);
    const tokenPrice = tokenPriceState.data ? tokenPriceState.data : {};
    
    useEffect(() => {
      dispatch(fetchHotAuctions());
    }, [dispatch]);

    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      adaptiveHeight: 300,
      responsive: [
        {
          breakpoint: 1900,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
        }
      ]
    };

    const renderSlides = () => {
      const slides = []
      if (nftAuctions) {
        nftAuctions.forEach((auctionNft) => {
          slides.push(<BidSlide nft={auctionNft} usdPrice={tokenPrice?.usdPrice} key={auctionNft.id} />);
        });
      }
      return slides;
    }

    return (
        <div className='nft-big'>
          <GlobalStyles />
          <Slider {...settings}>
            {renderSlides()}
          </Slider>
        </div>
    );
}

export default SliderCarousel;
