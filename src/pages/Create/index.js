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
    // // console.log(option);
    await setSellOption(option);
    nft.status = option;
    await setNft(new Nft(nft));
    // // console.log(nft);
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



  // // // console.log(configuration);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  // const [isActive, setActive] = useState();
  // const [previewImage, setPreviewImage] = useState();
 

  const [selectedAudio, setSelectedAudio] = useState();
  // const [previewAudio, setPreviewAudio] = useState();

  // const [fileUrl, setFileUrl] = useState(null)

  // const { store } = useContext(ReactReduxContext)
  // // // console.log(store);
  // const state = store.getState();
  // // // console.log(state);
  // // // console.log(selectors.myCollectionsState);
  const myCollectionsState = useSelector(selectors.myCollectionsState);
  const myCollections = myCollectionsState.data || [];
  // // // console.log(myCollectionsState);
  // const hotCollections = myCollectionsState.data ? myCollectionsState.data : [];

  useEffect(() =>{
    dispatch(fetchMyCollections());
  },[dispatch]);

  // const loadNfts = async () => {
  //   const options = { chain: configuration.network.chain };
  //   const myNfts = await Moralis.Web3API.account.getNFTs(options);
  //   // // console.log(myNfts);
  // };

  // useEffect(() => {
  //   loadNfts();
  // },[]);

  // useEffect(() => {
  //   // // console.log(nft);
  // }, [nftPreview]);

  const onFileUpload = async (e) => {
    const selectedFiles = e.target.files;
    var filesArr = Array.prototype.slice.call(selectedFiles);
    document.getElementById("file_name").style.display = "none";
    setFiles([...files, ...filesArr]);

    Array.from(selectedFiles).forEach((f) =>{
      // const imageFile = new Provider.File(f.name, f);
      // const ipfsFile = await imageFile.saveIPFS();
      // if (f.type === 'audio/mpeg') {
      //   nftPreview.metadata.animation_url = ipfsFile.ipfs();
      // } else if (f.type === 'image/png') {
      //   nftPreview.metadata.image = ipfsFile.ipfs();
      // }
      // // console.log(f.type);
      setNft(new Nft(nft));
      if (f.type.includes('audio')) {
        setSelectedAudio(f);
        // setPreviewAudio(f)
        let reader = new FileReader();
        reader.onloadend = () => {
          // setPreviewAudio(reader.result)
          nft.metadata.animation_url = reader.result;
          // // console.log("audio loaded!!! "+reader.result);
          setNft(new Nft(nft));
        };
        reader.readAsDataURL(f);
      } else if (f.type.includes('image')) {
        setSelectedFile(f);
        // setPreviewImage(f)
        let reader = new FileReader();
        reader.onloadend = () => {
          // setPreviewImage(reader.result)
          
          nft.metadata.image = reader.result;
          setNft(new Nft(nft));
        };
        reader.readAsDataURL(f);
      } else {
        // // console.log(f);
        // // console.log('not supported');
      }
    })

  }


  // const handleShow = ()=>{
  //     document.getElementById("tab_opt_1").classList.add("show");
  //     document.getElementById("tab_opt_1").classList.remove("hide");
  //     document.getElementById("tab_opt_2").classList.remove("show");
  //     document.getElementById("btn1").classList.add("active");
  //     document.getElementById("btn2").classList.remove("active");
  //     document.getElementById("btn3").classList.remove("active");
  // }
  //  const handleShow1 = ()=>{
  //     document.getElementById("tab_opt_1").classList.add("hide");
  //     document.getElementById("tab_opt_1").classList.remove("show");
  //     document.getElementById("tab_opt_2").classList.add("show");
  //     document.getElementById("btn1").classList.remove("active");
  //     document.getElementById("btn2").classList.add("active");
  //     document.getElementById("btn3").classList.remove("active");
  // }
  // const handleShow2 = ()=>{
  //     document.getElementById("tab_opt_1").classList.add("show");
  //     document.getElementById("btn1").classList.remove("active");
  //     document.getElementById("btn2").classList.remove("active");
  //     document.getElementById("btn3").classList.add("active");
  // }

  // const unlockClick = ()=>{
  //     setActive(true);
  // }
  // const unlockHide = () => {
  //     setActive(false);
  // };

  // const [putOnMarket, setPutOnMarket] = useState(true);
  // const togglePutOnMarket = () => setPutOnMarket(!putOnMarket);

  // const mintNft = async (metadataUri, data) => {
    // const web3Provider = await Moralis.enableWeb3({chain: configuration.network.chain});
    // const options = {
    //   contractAddress: configuration.network.nftContractAddress,
    //   chain: configuration.network.chain,
    //   address: user.get('ethAddress'),
    //   functionName: "createItem",
    //   abi: configuration.network.nftContractAbi,
    //   params: { uri: metadataUri },
    // };
    // const transaction = await Moralis.executeFunction(options);
    // // const receipt = await tokenContract.methods.createItem(metadataUri).send({from: user.get('ethAddress')});
    // // // console.log(transaction);
    // const result = await transaction.wait();
    // const event = result.events.find(event => event.event === 'Transfer');
    // return event.args.tokenId.toNumber();

    // const providerOptions = {
    //   walletconnect: {
    //     package: WalletConnectProvider, // required
    //     options: {
    //       infuraId: "a0ede36076304e45b9de0c82c9d3deef" // required
    //     }
    //   },
    //   binancechainwallet: {
    //     package: true
    //   },
    //   metamask: {
    //     package: true
    //   },
    //   torus: {
    //     package: Torus // required
    //   }
    //   // fortmatic: {
    //   //   package: Fortmatic, // required
    //   //   options: {
    //   //     key: "FORTMATIC_KEY", // required,
    //   //     network: {
    //   //       rpcUrl: 'https://rpc-mainnet.maticvigil.com',
    //   //       chainId: 137
    //   //     } // if we don't pass it, it will default to localhost:8454
    //   //   }
    //   // }
    // };
  
    // const web3Modal = new Web3Modal({
    //   cacheProvider: true,
    //   providerOptions, // required
    //   theme: {
    //     background: "var(--card-color)",
    //     main: "var(--card-title)",
    //     secondary: "var(--card-text)",
    //     border: "var(--card-border)",
    //     hover: "var(--palette-primary)"
    //   }
    // })

    // if(localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER')!==''){ 
    //   // // console.log(localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER'));
    // }

    // await web3Modal.clearCachedProvider()
    // const instance = await web3Modal.connect();
    // // // console.log(instance);
    // const provider = new ethers.providers.Web3Provider(instance);

    // // // console.log("???");
    // const user = await authenticate();
    // const provider = user.provider;
  //   const provider = await getProvider();
  //   // // console.log(provider);
  //   const signer = provider.getSigner();
  //   // // // console.log(signer);
  //   /* create the NFT */
  //   // // // console.log(provider);
  //   const price = ethers.utils.parseUnits("1.0", 'ether')
  //   // // // console.log(price);
  //   // // // console.log("price?");
  //   const c = await provider.getCode(marketplaceAddress)
  //   // // // console.log(c);
  //   // // // console.log(marketplaceAddress);
  //   let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
  //   contract.getListingPrice().then((data)=>{ // // console.log(data)},(err)=>{// // console.log(err)})
  //   let listingPrice = await contract.getListingPrice()
  //   listingPrice = listingPrice.toString()
  //   // // // console.log(listingPrice);
  //   // // // console.log("PRICE");
  //   let transaction = await contract.createToken(metadataUri, price, { value: listingPrice })
  //   const tx = await transaction.wait()
  //   const tokenId = tx.events[0].args.tokenId.toNumber();
  //   // // // console.log(tx);
  //   // // // console.log("TX");
  //   // // // console.log(tokenId);

  //   const Item = Provider.Object.extend('Item');
  //   const item = new Item();
  //   item.set('name', data.name);
  //   item.set('description', data.description);
  //   item.set('image', data.image);
  //   item.set('audio', data.audio);
  //   item.set('metadata', metadataUri);
  //   item.set('tokenId', tokenId);
  //   item.set('contract', marketplaceAddress);
  //   item.set('creator', user.get('ethAddress'));
  //   await item.save();
  //   // // // console.log("????");


  //   const event = tx.events.find(event => event.event === 'MarketItemCreated');
  //   // // // console.log(event);
  //   const ItemForSale = Provider.Object.extend('ItemsForSale');
  //   const itemForSale = new ItemForSale();
  //   itemForSale.set('askingPrice', ethers.utils.formatUnits(event.args.price.toString(), 'ether'));
  //   itemForSale.set('blockcHash', event.blockHash);
  //   itemForSale.set('blockNumber', event.blockHash);
  //   itemForSale.set('timestamp', new Date());
  //   itemForSale.set('address', marketplaceAddress);
  //   itemForSale.set('tokenId', event.args.tokenId.toNumber());
  //   itemForSale.set('from', event.args[1]);
  //   itemForSale.set('to', event.args[2]);
  //   itemForSale.set('chain', configuration.network.chain);
  //   itemForSale.set('marketplace', marketplaceAddress);
  //   itemForSale.set('isSold', false);
  //   await itemForSale.save();
  //   // // // console.log('yay');


  //   // Listed items
  //   const listed = await contract.fetchItemsListed()

  //   const listedItems = await Promise.all(listed.map(async i => {
  //     const tokenUri = await contract.tokenURI(i.tokenId)
  //     const meta = await axios.get(tokenUri)
  //     let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
  //     let item = {
  //       price,
  //       tokenId: i.tokenId.toNumber(),
  //       seller: i.seller,
  //       owner: i.owner,
  //       image: meta.data.image,
  //     }
  //     return item
  //   }))
  //   // // // console.log("Listed items");
  //   // // // console.log(listedItems);
  
  //   const myNfts = await contract.fetchMyNFTs()
  //   const myNftList = await Promise.all(myNfts.map(async i => {
  //     const tokenURI = await contract.tokenURI(i.tokenId)
  //     const meta = await axios.get(tokenURI)
  //     let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
  //     let item = {
  //       price,
  //       tokenId: i.tokenId.toNumber(),
  //       seller: i.seller,
  //       owner: i.owner,
  //       image: meta.data.image,
  //       tokenURI
  //     }
  //     return item
  //   }));
  //   // // // console.log("my nfts");
  //   // // // console.log(myNftList);


  //   /*
  //   *  map over items returned from smart contract and format 
  //   *  them as well as fetch their token metadata
  //   */
  //   const mitemsf = await contract.fetchMarketItems()

  //   const mitems = await Promise.all(mitemsf.map(async i => {
  //     const tokenUri = await contract.tokenURI(i.tokenId)
  //     const meta = await axios.get(tokenUri)
  //     let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
  //     let item = {
  //       price,
  //       tokenId: i.tokenId.toNumber(),
  //       seller: i.seller,
  //       owner: i.owner,
  //       image: meta.data.image,
  //       name: meta.data.name,
  //       description: meta.data.description,
  //     }
  //     return item
  //   }))
  //   // // // console.log("market items");
  //   // // // console.log(mitems);



  //   // Buy
  //   // // // console.log("BUY")
  //   // // // console.log(listedItems[0]);
  //   /* user will be prompted to pay the asking proces to complete the transaction */
  //   const p = ethers.utils.parseUnits(listedItems[0].price.toString(), 'ether')   
  //   const t = await contract.createMarketSale(listedItems[0].tokenId, {
  //     value: price
  //   })
  //   const x= await t.wait()
  //   // // // console.log("result buy0")
  //   // // // console.log(x)





  //   // Check my nfts again
  //   const myNftsa = await contract.fetchMyNFTs()
  //   const myNftLista = await Promise.all(myNfts.map(async i => {
  //     const tokenURI = await contract.tokenURI(i.tokenId)
  //     const meta = await axios.get(tokenURI)
  //     let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
  //     let item = {
  //       price,
  //       tokenId: i.tokenId.toNumber(),
  //       seller: i.seller,
  //       owner: i.owner,
  //       image: meta.data.image,
  //       tokenURI
  //     }
  //     return item
  //   }));
  //   // // // console.log("my nfts2");
  //   // // // console.log(myNftLista);

  // };

  // const addItemToMarket = async (tokenId, price) => {
  //   await Moralis.enableWeb3({chain: configuration.network.chain});
  //   const options = {
  //     contractAddress: configuration.network.marketplaceContractAddress,
  //     chain: configuration.network.chain,
  //     address: user.get('ethAddress'),
  //     functionName: "addItemToMarket",
  //     abi: configuration.network.marketplaceContractAbi,
  //     params: { 
  //       tokenId: tokenId, 
  //       tokenAddress: configuration.network.nftContractAddress,
  //       askingPrice: Moralis.Units.ETH(price) // Moralis.Units.FromWei("2000000000000000000")
  //     }
  //   };
  //   const transaction = await Moralis.executeFunction(options);
  //   const result = await transaction.wait();
  //   // // console.log(result);
  //   const event = result.events.find(event => event.event === 'itemAdded');
  //   const ItemForSale = Moralis.Object.extend('ItemsForSale');
  //   const itemForSale = new ItemForSale();
  //   itemForSale.set('askingPrice', Moralis.Units.FromWei(event.args.askingPrice));
  //   itemForSale.set('blockcHash', event.args.blockHash);
  //   itemForSale.set('blockNumber', event.args.blockHash);
  //   itemForSale.set('timestamp', new Date());
  //   itemForSale.set('id', event.args.id.toNumber());
  //   itemForSale.set('address', event.args.tokenAddress);
  //   itemForSale.set('tokenId', event.args.tokenId.toNumber());
  //   itemForSale.set('from', result.from);
  //   itemForSale.set('to', result.to);
  //   itemForSale.set('chain', configuration.network.chain);
  //   itemForSale.set('marketplace', configuration.network.marketplaceContractAddress);
  //   itemForSale.set('isSold', false);
  //   await itemForSale.save();
  // };

  // const ensureMarketplaceIsApproved = async (tokenId) => {
  //   await Moralis.enableWeb3({chain: configuration.network.chain});
  //   const readOptions = {
  //     contractAddress: configuration.network.nftContractAddress,
  //     functionName: "getApproved",
  //     abi: configuration.network.nftContractAbi,
  //     params: { tokenId: tokenId }
  //   };
  //   const message = await Moralis.executeFunction(readOptions);
  //   // // console.log(message);
  //   if (message !== configuration.network.marketplaceContractAddress) {
  //     const options = {
  //       contractAddress: configuration.network.nftContractAddress,
  //       chain: configuration.network.chain,
  //       address: user.get('ethAddress'),
  //       functionName: "approve",
  //       abi: configuration.network.nftContractAbi,
  //       params: { to: configuration.network.marketplaceContractAddress, tokenId: tokenId },
  //     };
  //     const transaction = await Moralis.executeFunction(options);
  //     await transaction.wait();
  //   }
  // };

  // const addToMarket = async (tokenId, price) => {
  //   await ensureMarketplaceIsApproved(tokenId);
  //   await addItemToMarket(tokenId, price);
  // };

  // const updateNft = async (e) => {

  // }

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
    // // // console.log('saving ');
    // // // console.log(nft);
    // // // console.log(nft);
    // await nft.save();
    dispatch(saveNft(nft, selectedCollection, selectedFile, selectedAudio));
    return;
    // e.preventDefault();

    // try {
    //   setProcessing(true);
    //   // // // console.log(e);
    //   const title = e.target.elements?.item_title.value;
    //   const description = e.target.elements?.item_desc.value;
    //   const price = e.target.elements?.item_price.value;
    //   const priceBid = e.target.elements?.item_price_bid.value;
    //   const royalties = e.target.elements?.item_royalties.value;
    //   const bidStartDate = e.target.elements?.bid_starting_date.value;
    //   const bidExpirationDate = e.target.elements?.bid_expiration_date.value;
    //   const unlockValue = e.target.elements?.item_unlock?.value;

    //   const data = {
    //     name: title,
    //     description: description,
    //   }
    
    //   //Audio??
    //   let audioUrl;
    //   if (selectedAudio) {
    //     const nftAudio = new Provider.File(selectedAudio.name, selectedAudio);
    //     const nftFileResultAudio = await nftAudio.saveIPFS();
    //     audioUrl = nftFileResultAudio.ipfs();
    //     data.audio = audioUrl;
    //   }

    //   let imageUrl;
    //   if (selectedFile) {
    //     const nftFile = new Provider.File(selectedFile.name, selectedFile);
    //     const nftFileResult = await nftFile.saveIPFS();
    //     imageUrl = nftFileResult.ipfs();
    //     data.image = imageUrl;
    //   }






    //   const fileMetadata = new Provider.File('metadata.json', {base64: btoa(JSON.stringify(data))});
    //   const fileMetadataResult = await fileMetadata.saveIPFS();
    
    //   const fileMetadataPath = fileMetadataResult.ipfs();

    //   // await upload();
    //   // // // console.log(fileUrl);
    //   // const data = {
    //   //   name:title, description, image: fileUrl
    //   // };
    //   // // // console.log(data);
    //   // const added = await client.add(JSON.stringify(data))
    //   // const url = `https://ipfs.infura.io/ipfs/${added.path}`
    //   //   // // console.log(url);
    //   const tokenId = await mintNft(fileMetadataPath, data);
    //   // // console.log(tokenId);
    


    //   // addToMarket(tokenId, parseFloat(price));
    // } catch(e) {

    // } finally {
    //   setProcessing(false);
    // }
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
    // // // console.log(hotCollections);
    myCollections.forEach((item) => {
      // // // console.log(item);
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

  // const royalties = (
  //   <div>
  //     <h5>Royalties</h5>
  //     <input type="text" name="item_royalties" id="item_royalties" className="form-control" placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%" />
  //   </div>
  // );

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
              <input type="text" name="price" id="price" className="form-control" placeholder={`enter price for one item (${configuration.network.symbol})`} />
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
                <h1 className='text-center'>Create single item on {configuration.network.name}</h1>
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
              {/* royalties */}
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