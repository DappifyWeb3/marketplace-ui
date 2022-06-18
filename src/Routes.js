import { useEffect, useContext } from 'react';
import { Router } from '@reach/router';
import { useNavigate } from '@reach/router';
import Create from 'pages/Create';
import CreateOption from 'pages/Create/Options';
import Explore from 'pages/Explore';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import News from 'pages/News';
import Author from 'pages/Author';
import NewsItem from 'pages/News/Item';
import Ranking from 'pages/Ranking';
import Auction from 'pages/Auction';
import HelpCenter from 'pages/HelpCenter';
import Collection from 'pages/Collection';
import Item from 'pages/Item';
import Wallet from 'pages/Wallet';
import Activity from 'pages/Activity';
import { DappifyContext } from 'react-dappify';
import { useTranslation } from "react-i18next";
import Header from 'components/AppBar';
import ScrollToTopBtn from 'components/ScrollToTop';
import { CssBaseline } from '@mui/material';

export const ScrollTop = ({ children, location }) => {
  useEffect(() => window.scrollTo(0,0), [location])
  return children
}

const Routes = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useContext(DappifyContext);

  const GuardedRoute = ({ component: Component, t }) => {
    const navigate = useNavigate();
    if (!isAuthenticated)  navigate('/');
    return <Component t={t}/>;
  }

  return (
    <><CssBaseline />
        <Header t={t} />
            <Router>
            <ScrollTop exact path="/">
                <Home exact path="/" t={t} />
                <Explore exact path="/explore" t={t} />
                <Collection exact path="/collection/:shortUrl" />
                <Item exact path="/item/:contractAddress/:tokenId" t={t} />
                <Auction exact path="/auction" />
                <HelpCenter exact path="/help" />
                <Activity exact path="/activity" t={t} />
                <Ranking exact path="/ranking" />
                <News exact path="/news" />
                <NewsItem exact path="/news/:postId" />
                <Create exact path="/create" />
                <CreateOption exact path="/options" />
                <Wallet exact path="/wallet" t={t} />
                <Author exact path='/profile/:address' t={t} />
                <GuardedRoute path='/profile/:address/manage' component={Profile} t={t} />
            </ScrollTop>
        </Router>
      <ScrollToTopBtn /></>

  )
};

export default Routes;
