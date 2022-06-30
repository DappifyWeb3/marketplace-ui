import { memo } from "react";
import { useNavigate } from '@reach/router';
import UserAvatar from "components/UserAvatar";

const Content = ({ index, collection, t }) => {
  const navigate = useNavigate();

  const goToCollection = () => {
    navigate(`/${process.env.REACT_APP_TEMPLATE_NAME}/profile/${collection.author.id}`);
  };

  return (
    <div className='itm' index={index}>
      <div className="nft_coll">
          <div className="nft_wrap">
              <span><img src={collection.banner} className="lazy img-fluid" alt=""/></span>
          </div>
          <div className="nft_coll_pp">
              <UserAvatar user={collection.author} t={t} />
          </div>
          <div className="nft_coll_info">
              <span onClick={goToCollection}><h4>{ collection.name }</h4></span>
              <span>{ collection.symbol }</span>
          </div>
      </div>
    </div>
  )
}

export default memo(Content);