import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select'
import Footer from 'components/Segment/Footer';
import { createGlobalStyle } from 'styled-components';
import * as selectors from 'store/selectors';
import { fetchUserRanking } from "store/actions/thunks";
const api = {};

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
    color: rgba(255, 255, 255, .5);;
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


const customStyles = {
  option: (base, state) => ({
    ...base,
    background: "var(--filterbar-color)",
    color: "var(--filterbar-text)",
    borderRadius: state.isFocused ? "0" : 0,
    "&:hover": {
      background: "var(--palette-primary)",
    }
  }),
  menu: base => ({
    ...base,
    background: "var(--filterbar-color)",
    border: "1px solid var(--filterbar-border)",
    color: "var(--filterbar-text)",
    borderRadius: 0,
    marginTop: 0
  }),
  menuList: base => ({
    ...base,
    padding: 0
  }),
  control: (base, state) => ({
    ...base,
    padding: 2,
    background: "var(--filterbar-color)",
    border: "1px solid var(--filterbar-border)",
    color: "var(--filterbar-text)"
  })
};


const options = [
  { value: 'Last 7 days', label: 'Last 7 days' },
  { value: 'Last 24 hours', label: 'Last 24 hours' },
  { value: 'Last 30 days', label: 'Last 30 days' },
  { value: 'All time', label: 'All time' }
]
const options1 = [
  { value: 'All categories', label: 'All categories' },
  { value: 'Art', label: 'Art' },
  { value: 'Music', label: 'Music' },
  { value: 'Domain Names', label: 'Domain Names' },
  { value: 'Virtual World', label: 'Virtual World' },
  { value: 'Trading Cards', label: 'Trading Cards' },
  { value: 'Collectibles', label: 'Collectibles' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Utility', label: 'Utility' }
]


const RankingRedux = ({t}) => {

  const dispatch = useDispatch();
  const authorState = useSelector(selectors.authorRankingsState);
  const authors = authorState.data ? authorState.data : [];

  useEffect(() => {
      dispatch(fetchUserRanking());
  }, [dispatch]);

  return (
    <div className="theme-background">
      <GlobalStyles/>
      <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `var(--images-secondary)`}}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className='text-center'>Top NFTs</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className="items_filter centerEl">
            <div className='dropdownSelect one'><Select className='select1' styles={customStyles} menuContainerStyle={{'zIndex': 999}} defaultValue={options[0]} options={options} /></div>
            <div className='dropdownSelect two'><Select className='select1' styles={customStyles} defaultValue={options1[0]} options={options1} /></div>
            </div>
            <table className="table de-table table-rank">
              <thead>
                <tr>
                  <th scope="col">Collection</th>
                  <th scope="col">Volume</th>
                  <th scope="col">24h %</th>
                  <th scope="col">7d %</th>
                  <th scope="col">Floor Price</th>
                  <th scope="col">Owners</th>
                  <th scope="col">Assets</th>
                </tr>
                <tr></tr>
              </thead>
              <tbody>
                {
                  authors && authors.map((author, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <div className="coll_list_pp">
                          { author.avatar &&
                            <img className="lazy" src={api.baseUrl + author.avatar.url} alt=""/>
                          }
                          <i className="fa fa-check"></i>
                        </div>  
                        {author.username}
                      </th>
                      <td>{author.author_sale.volume}</td>
                      <td className={author.author_sale.daily_sales < 0 ? "d-min" : "d-plus"}>{`${author.author_sale.daily_sales < 0 ? '' : '+'}${author.author_sale.daily_sales}%`}</td>
                      <td className={author.author_sale.weekly_sales < 0 ? "d-min" : "d-plus"}>{`${author.author_sale.weekly_sales < 0 ? '' : '+'}${author.author_sale.weekly_sales}%`}</td>
                      <td>{author.author_sale.floor_price}</td>
                      <td>{author.author_sale.owners}k</td>
                      <td>{author.author_sale.assets}k</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <div className="spacer-double"></div>
            <ul className="pagination justify-content-center">
              <li className="active"><span>1 - 20</span></li>
              <li><span>21 - 40</span></li>
              <li><span>41 - 60</span></li>
            </ul> 
          </div>
        </div>
      </section>
      <Footer t={t}/>
    </div>
)};

export default memo(RankingRedux);