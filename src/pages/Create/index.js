import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Footer from 'components/Segment/Footer';
import { createGlobalStyle } from 'styled-components';
import { DappifyContext } from 'react-dappify';
import {Tooltip } from '@mui/material';
import Status from 'react-dappify/model/Status';
import NFTCard from 'components/NFTCard';
import Nft from 'react-dappify/model/NFT';
import * as selectors from 'store/selectors';
import { fetchMyCollections, saveNft } from "store/actions/thunks";
import CollectionDialog from 'pages/Create/Collection';
import Collection from "react-dappify/model/Collection";
import constants from 'react-dappify/constants';

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

const CreatePage = ({t}) => {
  const dispatch = useDispatch();
  const { configuration } = useContext(DappifyContext);
  
  // Nft
  const [nft, setNft] = useState(new Nft());
  const [selectedCollection, setSelectedCollection] = useState(new Collection());

  // const bootstrap = async() => {
  //   const bootstrapped = await nft.bootstrap();
  //   setNft(bootstrapped);
  // };

  // useEffect(() => {
  //   bootstrap();
  // }, [user]);

  // Put on market
  const [putOnMarket, setPutOnMarket] = useState(true);
  const togglePutOnMarket = () => {
    const onMarket = !putOnMarket;
    setPutOnMarket(onMarket);
    setOption(onMarket ? Status.ON_SALE : Status.PUBLISHED)
  }

  // Pricing options
  const [sellOption, setSellOption] = useState(Status.ON_SALE);

  const isFixedPricing = sellOption === Status.ON_SALE;

  const setOption = async (option) => {
    await setSellOption(option);
    nft.status = option;
    await setNft(new Nft(nft));
  }

  const handleSellOption = (e) => {
    const target = e.target.id;
    setOption(target);
  }

  // Unlockable Content
  const [hasUnlockableContent, setHasUnlockableContent] = useState(false);
  const toggleHasUnlockableContent = () => setHasUnlockableContent(!hasUnlockableContent);
  
  // Collection dialog
  const [isOpenCollectionDialog, setOpenCollectionDialog] = useState();

  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedAudio, setSelectedAudio] = useState();

  const myCollectionsState = useSelector(selectors.myCollectionsState);
  const myCollections = myCollectionsState.data || [];

  useEffect(() =>{
    dispatch(fetchMyCollections());
  },[dispatch]);

  const onFileUpload = async (e) => {
    const selectedFiles = e.target.files;
    var filesArr = Array.prototype.slice.call(selectedFiles);
    document.getElementById("file_name").style.display = "none";
    setFiles([...files, ...filesArr]);

    Array.from(selectedFiles).forEach((f) =>{

      setNft(new Nft(nft));
      if (f.type.includes('audio')) {
        setSelectedAudio(f);
        let reader = new FileReader();
        reader.onloadend = () => {
          nft.metadata.animation_url = reader.result;
          setNft(new Nft(nft));
        };
        reader.readAsDataURL(f);
      } else if (f.type.includes('image')) {
        setSelectedFile(f);

        let reader = new FileReader();
        reader.onloadend = () => {
          
          nft.metadata.image = reader.result;
          setNft(new Nft(nft));
        };
        reader.readAsDataURL(f);
      } else {

      }
    })

  }

  const handleChange = async (e) => {
    switch (e.target.name) {
      case 'title': nft.metadata.name = e.target.value; break;
      case 'description': nft.metadata.description = e.target.value; break;
      case 'price': nft.price = parseFloat(e.target.value); break;
      default:
    }
    setNft(new Nft(nft));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(saveNft(nft, selectedCollection, selectedFile, selectedAudio));
    return;
  };

  const spacer = <div className="spacer-10"></div>;

  const titleAndDescription = (
    <div>
      <h5>Title</h5>
      <input type="text" name="title" id="title" className="form-control" placeholder="e.g. 'Crypto Funk" />
      {spacer}
      <h5>Description</h5>
      <textarea data-autoresize name="description" id="description" className="form-control" placeholder="e.g. 'This is very limited item'"></textarea>
      {spacer}
    </div>
  );

  const handleCollection = async (selected) => {
    setSelectedCollection(selected);
  }

  const isSelectedCollection = (collection) => selectedCollection?.id === collection?.id;

  const renderMyCollections = () => {
    const collections = [];
    myCollections.forEach((item) => {
      collections.push(
        <li className={`${isSelectedCollection(item) && 'active'}`} key={item.id}>
          <span id={item.id}  onClick={() => handleCollection(item)}>
            <i className="fa fa-user-circle"></i>
            {item.name}
            <br />
            <p className="collection__subtype">{item.symbol}</p>
          </span>
        </li>
      );
    })
    return collections;
  };

  const collection = (
    <div>
      <h5>Collection</h5>
      <p className="p-info">This is the collection where your item will appear.</p>
      <div className="de_tab tab_methods">
        <ul className="de_nav">
            <li className={`${isSelectedCollection() && 'active'}`} onClick={() => setOpenCollectionDialog(true)}>
              <span>
                <i className="fa fa-plus-circle"></i>
                Create
                <br />
                <p className="collection__subtype">ERC-721</p>
              </span>
            </li>
            {renderMyCollections()}
        </ul>
      </div>
    </div>
  );

  const unlockableContent = (
    <div className="switch-with-title">
      <h5><i className="fa fa- fa-unlock-alt id-color-2 mr10"></i>Unlock once purchased</h5>
      <div className="de-switch">
        <input type="checkbox" id="switch-unlock" className="checkbox"/>
        <label htmlFor="switch-unlock" onClick={toggleHasUnlockableContent}></label>
      </div>
      <div className="clearfix"></div>
      <p className="p-info pb-3">Unlock content after successful transaction.</p>

      {hasUnlockableContent ?
      <div id="unlockCtn" className="hide-content">
          <input type="text" name="item_unlock" id="item_unlock" className="form-control" placeholder="Access key, code to redeem or link to a file..." />             
      </div>
      : null }
    </div>
  );

  const dropzone = (
    <div>
      <h5>Upload file</h5>
      <div className="d-create-file">
        <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Recommended 1000 x 1000.</p>
        {files.map((x, i) => 
        <p key={i}>PNG, JPG, GIF, WEBP or MP4. Max 200mb.{x.name}</p>
        )}
        <div className='browse'>
          <input type="button" id="get_file" className="btn-main" value="Browse"/>
          <input id='upload_file' name="file" type="file" multiple onChange={onFileUpload} />
        </div>
      </div>
    </div>
  );

  const submitButton = (
    <div>
      <button type="submit" id="submit" className="btn-main">Create Item</button>
    </div>
  );

  const saleType = (
    <div>
      <h5>Select method</h5>
      {spacer}
      <div className="de_tab tab_methods">
        <ul className="de_nav">
            <li className={`${isFixedPricing && 'active'}`} onClick={handleSellOption}>
              <span id={Status.ON_SALE}><i className="fa fa-tag"></i>Fixed price</span>
            </li>
            <li className={`${!isFixedPricing && 'active'}`} onClick={handleSellOption}>
              <span id={Status.ON_AUCTION}><i className="fa fa-users"></i>Open for bids</span>
            </li>
            <li className="option__disabled">
              <Tooltip title="Coming Soon" placement="top">
                <span id="timed"><i className="fa fa-hourglass-1"></i>Timed auction</span>
              </Tooltip>
            </li>
        </ul>
        <div className="de_tab_content pt-3">
          { isFixedPricing && (
            <div id="tab_opt_1">
              <h5>Price</h5>
              <input type="text" name="price" id="price" className="form-control" placeholder={`enter price for one item (${constants.NETWORKS[configuration.chainId].nativeCurrency.symbol})`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const forSale = (
    <div className="switch-with-title">
      <h5><i className="fa fa-money id-color-2 mr10"></i>Put on market</h5>
      <div className="de-switch">
        <input type="checkbox" id="forSale" className="checkbox" defaultChecked />
        <label htmlFor="forSale" onClick={togglePutOnMarket}></label>
      </div>
      <div className="clearfix"></div>
      <p className="p-info pb-3">Enter price to allow users instantly purchase your NFT.</p>

      {putOnMarket && saleType }
    </div>
  );

  const onCollectionDialogClose = () => {
    setOpenCollectionDialog(false);
  }

  return (
    <div className="theme-background">
    <GlobalStyles/>

      <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `var(--images-secondary)`}}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className='text-center'>Create single item on {constants.NETWORKS[configuration.chainId].chainName}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CollectionDialog open={isOpenCollectionDialog} onClose={onCollectionDialogClose} />

      <section className='container'>
        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5">
            <form id="form-create-item" 
                  className="form-border" 
                  onSubmit={handleSubmit} 
                  onChange={handleChange}
            >
              {dropzone}
              {spacer}
              {spacer}
              {spacer}
              {forSale}
              {spacer}
              {titleAndDescription}
              {collection}
              {spacer}
              {spacer}
              {spacer}
              {unlockableContent}
              {spacer}
              {submitButton}
            </form>
          </div>
          <div className="col-lg-3 col-sm-6 col-xs-12">
            <h5>Preview item</h5>
            <NFTCard nft={nft}  t={t}/>
          </div>
        </div>                                         
      </section>
      <Footer t={t}/>
    </div>
  );
}

export default CreatePage;