import { navigate } from '@reach/router';

//react functional component
const Avatar = ({ nft }) => {
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