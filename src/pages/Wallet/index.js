import React from 'react';
import Wallets from 'components/Wallets';
import Footer from 'components/Segment/Footer';
import { Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

const WalletPage= () => {
  const { t } = useTranslation();
  return (
    <div className="theme-background">
      <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `var(--images-secondary)`}}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <Grid container>
                <Grid item xs={12} textAlign="center">
                  <Typography variant="h3">{t('Connect your wallet')}</Typography>
                </Grid>
            </Grid>
          </div>
        </div>
      </section>

      <section className='container'>
        <Wallets/>
      </section>

      <Footer t={t}/>
    </div>
  )
};
export default WalletPage;