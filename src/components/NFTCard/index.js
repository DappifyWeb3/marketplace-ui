import React, { memo, useState, useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import Preview from 'components/NFTCard/Preview';
import Details from 'components/NFTCard/Details';
import Metadata from 'react-dappify/model/Metadata';

//react functional component
const NFTCard = ({ nft, t }) => {
    const [audio, setAudio] = useState(new Audio(nft.metadata.animation_url));
    const [previewedNft, setPreviewedNft] = useState(nft);

    useEffect(() => {

        const loadMetadata = async() => {
            // Has no metadata and only uri? we need to load it
            if (!nft.metadata.name && nft.metadata.uri) {
                try{
                const meta = await fetch(nft.metadata.uri, {cache: "force-cache"});
                const data = await meta.json(); 
                nft.metadata = new Metadata(data);
                setPreviewedNft({...nft});
                }catch (e) {
                    console.log(e);
                }
            }
        }

        if (nft.metadata.animation_url) {
            setAudio(new Audio(nft.metadata.animation_url))
        }

        loadMetadata();
    }, [nft, nft.metadata.animation_url, previewedNft]);

    const useAudio = () => {
        const [playing, setPlaying] = useState(false);
      
        const toggle = () => setPlaying(!playing);
      
        useEffect(() => {
            playing ? audio.play() : audio.pause();
          },
          [playing]
        );
      
        useEffect(() => {
          audio.addEventListener('ended', () => setPlaying(false));
          return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
            audio.pause();
          };
        }, []);
      
        return [playing, toggle];
    };

    const [playing, toggle] = useAudio();

    const audioPlayer = previewedNft.metadata.animation_url && (
        <Grid className="nft_type_wrap">
            <Grid onClick={toggle} className="player-container">
                <Grid className={`play-pause ${playing ? 'pause' : 'play'}`}></Grid>
            </Grid>
            <Grid className={`circle-ripple ${playing ? 'play' : 'init'}`}></Grid>
        </Grid>
    );

    return (
        <Paper className="onStep fadeIn nft__card" elevation={3}>
            <div className="nft__item m-0">
                <Grid className="item__wrap">
                    <Preview nft={previewedNft} />
                    {audioPlayer}
                </Grid>
                <Details nft={previewedNft} t={t} />
            </div>
        </Paper>         
    );
};

export default memo(NFTCard);