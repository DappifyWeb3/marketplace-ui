import React, { useEffect, useContext } from 'react';
import Footer from 'components/Segment/Footer';
import { createGlobalStyle } from 'styled-components';
import { Grid, Button, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../store/selectors';
import { fetchNfts } from 'store/actions/thunks';
import moment from 'moment';
import { DappifyContext } from 'react-dappify';
import ActivityItem from 'components/ActivityItem';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: var(--palette-secondary);
    border-bottom: solid 1px var(--palette-secondary);
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: var(--palette-secondary);
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const Activity = ({t}) => {
  const dispatch = useDispatch();
  const { configuration } = useContext(DappifyContext);
  const nftItems = useSelector(selectors.nftsState);
  const nfts = nftItems?.data ? nftItems.data : [];

  useEffect(() => {
    // console.log("fetch witrh ");
    dispatch(fetchNfts({}));
}, [dispatch]);

const renderActivity = () => {
  const list = [];
  nfts.forEach((nft, index) => {
    // console.log(nft);
    list.push(<ActivityItem nft={nft} index={index} />);
  });
  return list;
}

return (
<div className="theme-background">
<GlobalStyles/>

  <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `var(--images-secondary)`}}>
    <div className='mainbreadcumb'>
      <div className='container'>
        <div className='row m-10-hor'>
          <div className='col-12'>
            <h1 className='text-center'>Activity</h1>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className='container'>
    <Grid container spacing={2} justifyContent="center">
      {renderActivity()}
    </Grid>
   </section>

  <Footer t={t}/>
</div>

);
}

export default Activity;