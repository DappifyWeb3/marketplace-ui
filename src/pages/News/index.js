import React, { memo, useEffect, useContext } from "react";
import { useDispatch } from 'react-redux';
import Footer from 'components/Segment/Footer';
import { createGlobalStyle } from 'styled-components';
import { getBlogPosts } from "store/actions/thunks";
import { DappifyContext } from 'react-dappify';
import News from 'components/Segment/News';


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

const NewsPage = ({t}) => {
  const { configuration } = useContext(DappifyContext);
  const { Moralis } = {};


  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getBlogPosts(Moralis, configuration));
  }, [Moralis, configuration, dispatch]);

return (
  <div className="theme-background">
  <GlobalStyles/>

    <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `var(--images-secondary)`}}>
      <div className='mainbreadcumb'>
        <div className='container'>
          <div className='row m-10-hor'>
            <div className='col-12 text-center'>
              <h1>News</h1>
              <p>News and Announcements</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className='container'>
      <div className="row">
        <News />

          <div className="spacer-single"></div>
                  
          <ul className="pagination">
              <li><span className='a'>Prev</span></li>
              <li className="active"><span className='a'>1</span></li>
              <li><span className='a'>2</span></li>
              <li><span className='a'>3</span></li>
              <li><span className='a'>4</span></li>
              <li><span className='a'>5</span></li>
              <li><span className='a'>Next</span></li>
          </ul>
          
      </div>
    </section>

    <Footer t={t}/>
  </div>
  )
};

export default memo(NewsPage);