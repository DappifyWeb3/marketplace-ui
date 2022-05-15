import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Footer from 'components/Segment/Footer';
import { createGlobalStyle } from 'styled-components';
import NFTGrid from "components/NFTGrid";
import * as selectors from 'store/selectors';
import { fetchCollection, fetchNftsFromCollection } from "store/actions/thunks";
import { Grid } from "@mui/material";
const api = {};
const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: var(--palette-secondary);
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const Collection = function({ shortUrl, t }) {
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
  };

  const dispatch = useDispatch();
  const collectionState = useSelector(selectors.collectionState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const collection = collectionState.data || {};

  const nftItems = useSelector(selectors.nftsFromCollection);
  const nfts = nftItems.data || [];

  useEffect(() => {
      dispatch(fetchCollection(shortUrl));
  }, [dispatch, shortUrl]);

  useEffect(() => {
    dispatch(fetchNftsFromCollection(collection));
  }, [collection, dispatch])

    const onLoadMore = () => {
        dispatch(fetchNftsFromCollection(collection));
    }

  return (
    <div className="theme-background">
    <GlobalStyles/>
      { collection.banner &&
        <section id='profile_banner' className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${collection.banner})`}}>
          <div className='mainbreadcumb'>
          </div>
        </section>
      }

      <section className='container d_coll no-top no-bottom'>
        <div className='row'>
          <div className="col-md-12">
            <div className="d_profile">
              <div className="profile_avatar">
                  { collection.author &&  collection.author.avatar &&
                    <div className="d_profile_img">
                      <img src={api.baseUrl + collection.author.avatar.url} alt=""/>
                      <i className="fa fa-check"></i>
                    </div>
                  }
                  <div className="profile_name">
                    <h4>
                        { collection.name }                                                
                        <div className="clearfix"></div>
                        { collection.author &&  collection.author.wallet &&
                          <span id="wallet" className="profile_wallet">{ collection.author.wallet }</span>
                        }
                        <button id="btn_copy" title="Copy Text">Copy</button>
                    </h4>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      <section className='container no-top'>
            <div className='row'>
              <div className='col-lg-12'>
                  <div className="items_filter">
                    <ul className="de_nav">
                        <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>On Sale</span></li>
                        <li id='Mainbtn1' className=""><span onClick={handleBtnClick1}>Owned</span></li>
                    </ul>
                </div>
              </div>
            </div>
          <Grid container spacing={2}>
            { nfts && (<NFTGrid shuffle nfts={nfts} onLoadMore={onLoadMore}  t={t} />) }
          </Grid>
          </section>
      <Footer t={t}/>
    </div>
  );
}
export default memo(Collection);