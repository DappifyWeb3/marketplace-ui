import React from 'react';
import { navigate } from '@reach/router';
import ImageFadeIn from "react-image-fade-in";

//react functional component
const Preview = ({ nft }) => {
 
    const backgroundColor = nft.metadata.background ? `#${nft.metadata.background}` : 'transparent';
    return (
        <span style={{ 
            background: backgroundColor,
            position: 'relative',
            width: '100%',
            height: '275px',
            overflow: 'hidden',
            cursor: 'pointer'
        }} onClick={() => navigate(`/${process.env.REACT_APP_TEMPLATE_NAME}/item/${nft?.collection?.address}/${nft?.tokenId}`)}>
            {!nft.metadata.image && 
                <div className="lazy nft__placeholder">
                    {nft.metadata.name}
                </div>
            }
            {nft.metadata.image && <ImageFadeIn height="275px" width="100%" src={nft.metadata.image} alt=""/>}
        </span>
    );
};

export default Preview;