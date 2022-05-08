import { navigate } from '@reach/router';

//react functional component
const Avatar = ({ nft }) => {
    // const { configuration, Provider } = useContext(DappifyContext);
    // // const [userImage, setUserImage] = useState();
    // // const colors = [configuration.palette.primary];
    // const navigateTo = (link) => {
    //     navigate(link);
    // }

    // useEffect(() => {
    //     if (nft.attributes) {
    //         // Is moralis object
    //         loadUserImage(nft.attributes.from);
    //     } else {
    //         // Not moralis object
    //         setUserImage(api.baseUrl + nft?.author?.avatar?.url);
    //     }
    // },[]);

    // const loadUserImage = async (address) => {
    //     const User = Provider.Object.extend("User");
    //     const query = new Provider.Query(User);
    //     query.equalTo("ethAddress", address.toLowerCase());
    //     const user = await query.first();
    //     const imageUrl = user?.attributes?.imageUrl;
    //     setUserImage(imageUrl);
    // };
    // // // console.log(nft);
    return (
        <div className="author_list_pp">
            <span onClick={()=> navigate(`/profile/${nft.owner.id}`)}>                                    
                <img className="lazy" src={nft.owner.image} alt=""/>
                <i className="fa fa-check"></i>
            </span>
        </div>  
    );
};

export default Avatar;