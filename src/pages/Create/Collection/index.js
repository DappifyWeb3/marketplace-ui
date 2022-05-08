import React, { forwardRef, useState } from "react";
import { Typography, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide } from '@mui/material';
import Collection from 'react-dappify/model/Collection';
import { useDispatch } from "react-redux";

import { saveCollection } from 'store/actions/thunks';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CollectionCreate = ({ open=false, onClose }) => {
    const dispatch = useDispatch();
    const [collection] = useState(new Collection());
    const [image, setImage] = useState('https://cloudflare-ipfs.com/ipfs/Qmeun57y3rreQpuxX2wawkfxzPr5udnhx2zaP331tnMyNX');
    const [imageFile, setImageFile] = useState();

    const handleClose = () => {
        // Local logic

        // Foreign logic
        onClose();
    }


    const handleFileUpload = async (e) => {
        const selectedFile = e.target.files[0];
        setImageFile(selectedFile);
        let reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result)
        };
        reader.readAsDataURL(selectedFile);
    }

    const handleChange = async (e) => collection[e.target.name] = e.target.value;

    const handleSubmit = async (e) => {
        dispatch(saveCollection(collection, imageFile));
        onClose();
    }
    
    return (
        <Dialog
            PaperProps={{className:'collection__body'}}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="collection_dialog"
            onBackdropClick={handleClose}
        >
        <DialogTitle className="collection__title dialog__title" textAlign="left">Collection ERC-721</DialogTitle>
        <DialogContent className="collection__content">
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <img 
                        src={image} 
                        id="click_profile_img" 
                        className="d-profile-img-edit img-fluid" 
                        alt=""
                        style={{width: '120px', height: '120px', objectFit: 'cover'}}
                    />
                </Grid>
                <Grid item xs={8} textAlign="left">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="body" className="collection__content">We recommend an image of at least 300x300.<br />Gifs work too. Max 5mb.</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                <input hidden type="file" id="banner-button" onChange={handleFileUpload}/>
                                <label className="upload__file" htmlFor="banner-button">Upload</label>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className="text__field"
                        label="Display name (required)"
                        defaultValue="Enter collection name"
                        helperText="Token name cannot be changed in the future"
                        variant="standard"
                        name="name"
                        fullWidth
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className="text__field"
                        label="Symbol (required)"
                        defaultValue="Enter token symbol"
                        variant="standard"
                        name="symbol"
                        fullWidth
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className="text__field"
                        label="Description (optional)"
                        defaultValue="Spread some words about your token collection"
                        variant="standard"
                        name="description"
                        fullWidth
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className="text__field"
                        label="Short url"
                        defaultValue="Enter collection name"
                        helperText="Will be used as public URL"
                        variant="standard"
                        name="shortUrl"
                        fullWidth
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit} variant="contained" className="collection__button" fullWidth>Create collection</Button>
            </DialogActions>
        </Dialog>
   );
};

export default CollectionCreate;