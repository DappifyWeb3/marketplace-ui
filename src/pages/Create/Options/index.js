import React, { Component } from "react";
import { navigate } from '@reach/router';
import Footer from 'components/Segment/Footer';
import { createGlobalStyle } from 'styled-components';
import { Grid, Paper, Chip } from '@mui/material';
import { useTheme } from "@mui/material/styles";

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
  .mainside{
    .connect-wal{
      display: none;
    }
    .logout{
      display: flex;
      align-items: center;
    }
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

const Createpage = ({t}) => {

    const theme = useTheme();

    return (
      <div>
      <GlobalStyles/>

        <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `var(--images-secondary)`}}>
          <div className='mainbreadcumb'>
            <div className='container'>
              <div className='row m-10-hor'>
                <div className='col-12'>
                  <h1 className='text-center'>Create Collectible</h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='container'>
          <Grid container spacing={3} textAlign="center">
            <Grid item xs={12}>
              <p>Choose "Single" if you want your collectible to be one of a kind or "Multiple" if you want to sell one collectible times</p>
            </Grid>
            <Grid container className="option-container" spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" className="wallet__card" sx={{
                    pt: 6,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                }} onClick={() => navigate('/create')}>
                    <img src="./img/misc/coll-single.png" alt="single"/>
                    <h3 style={{ marginTop: '10px' }}>Single</h3>
                    <Chip color="primary" label="ERC-721" />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" className="wallet__card" sx={{
                      pt: 6,
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                  }}>
                    <img src="./img/misc/coll-multiple.png" alt=""/>
                    <h3 style={{ marginTop: '10px' }}>Multiple</h3>
                    <Chip color="primary" label="ERC-1155 Coming Soon" />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </section>

       

        <Footer t={t}/>
      </div>
   );
}

export default Createpage;