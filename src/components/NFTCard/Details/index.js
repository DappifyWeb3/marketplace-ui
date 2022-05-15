import React, { useContext, useState } from 'react';
import { DappifyContext } from 'react-dappify';
import {  Grid, Typography, Tooltip, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from 'store/selectors';
import ModalSale from 'components/ModalSale';
import ModalPurchase from 'components/ModalPurchase';
import ModalWithdraw from 'components/ModalWithdraw';
import ModalEdit from 'components/ModalEdit';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { fetchCurrentUser, fetchNftsBreakdown, fetchUserRanking, fetchHotAuctions, fetchNftShowcase } from 'store/actions/thunks';

//react functional component
const Details = ({ nft, t }) => {
    const { project } = useContext(DappifyContext);
    const network = project?.getNetworkContext('marketplace');
    const dispatch = useDispatch();
    const [isOpenSale, setOpenSale] = useState();
    const [isOpenWithdraw, setOpenWithdraw] = useState();
    const [isOpenPurchase, setOpenPurchase] = useState();
    const [isOpenEdit, setOpenEdit] = useState();

    const currentUserState = useSelector(selectors.currentUserState);
    const currentUser = currentUserState.data || {};

    const isOwner = currentUser.wallet && currentUser.wallet === nft.owner.wallet;
    const canEdit = isOwner && nft.status === 'OfferingPlaced';
    const canSell = isOwner && nft.status !== 'OfferingPlaced';
    const canWithdraw = isOwner && nft.status === 'OfferingPlaced';
    const canPurchase = !isOwner && nft.status === 'OfferingPlaced';

    const handlePurchase = async() => {
        setOpenPurchase(false);
        dispatch(fetchNftsBreakdown());
        dispatch(fetchUserRanking());
        dispatch(fetchHotAuctions());
        dispatch(fetchNftShowcase());
    }

    const handleSell = async() => {
        setOpenSale(false);
        dispatch(fetchCurrentUser());
        dispatch(fetchNftsBreakdown());
        dispatch(fetchUserRanking());
        dispatch(fetchHotAuctions());
        dispatch(fetchNftShowcase());
    }

    const handleWithdraw = async() => {
        setOpenWithdraw(false);
        dispatch(fetchCurrentUser());
        dispatch(fetchNftsBreakdown());
        dispatch(fetchUserRanking());
        dispatch(fetchHotAuctions());
        dispatch(fetchNftShowcase());
    }

    const handleEdit = async() => {
        setOpenEdit(false);
        dispatch(fetchCurrentUser());
        dispatch(fetchNftsBreakdown());
        dispatch(fetchUserRanking());
        dispatch(fetchHotAuctions());
        dispatch(fetchNftShowcase());
    }

    return (
        <Grid container spacing={1} sx={{ px: 1, m: 0 }}>
            <Grid item xs={12}>
                <Typography fontSize="0.85em" fontWeight="bold" color="text.secondary">{`${nft?.collection?.name} #${nft.tokenId}`}</Typography>
                <Typography fontSize="1.15em" fontWeight="400">{nft.metadata?.name}</Typography>
            </Grid>
            <Grid container spacing={1} sx={{ px: 1, pt: 1 }}>
                <Grid item xs={6}>
                    <Grid container spacing={1}>
                        {canSell && (
                            <Grid item>
                                <Tooltip title="Add to marketplace">
                                    <Button variant="outlined" color="success" className="circular__button" onClick={() => setOpenSale(true)}>
                                        <AddBusinessIcon />
                                    </Button>
                                </Tooltip>
                            </Grid>)}
                        {canPurchase && (
                            <Grid item>
                                <Tooltip title="Purchase">
                                    <Button variant="outlined" color="success" className="circular__button" onClick={() => setOpenPurchase(true)}>
                                        <ShoppingCartIcon />
                                    </Button>
                                </Tooltip>
                            </Grid>)}
                        {canWithdraw && (
                            <Grid item>
                                <Tooltip title="Withdraw from marketplace">
                                    <Button variant="outlined" color="info" className="circular__button"  onClick={() => setOpenWithdraw(true)}>
                                        <PlaylistRemoveIcon />
                                    </Button>
                                </Tooltip>
                            </Grid>)}
                        {canEdit && (
                            <Grid item>
                                <Tooltip title="Edit pricing">
                                    <Button variant="outlined" color="info" className="circular__button" onClick={() => setOpenEdit(true)}>
                                        <EditIcon />
                                    </Button>
                                </Tooltip>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container justifyContent="right">
                        <Grid item>
                            {nft.offeringId && (<Tooltip title="Pricing">
                                <Button variant="outlined" color="success" onClick={() => canPurchase && setOpenPurchase(true)}>
                                    <Typography fontWeight="bold">
                                        {nft.price.toFixed(3)} {network.nativeCurrency.symbol}
                                    </Typography>
                                </Button>
                            </Tooltip>)}
                        </Grid>
                    </Grid>
                </Grid>

                <ModalSale nft={nft} isOpen={isOpenSale} onClose={handleSell} t={t} />
                <ModalPurchase nft={nft} isOpen={isOpenPurchase} onClose={handlePurchase} t={t} />
                <ModalWithdraw nft={nft} isOpen={isOpenWithdraw} onClose={handleWithdraw} t={t} />
                <ModalEdit nft={nft} isOpen={isOpenEdit} onClose={handleEdit} t={t} />
            </Grid>
            {/*<Grid item xs={6} sx={{ pb: 2 }} textAlign="right">
                <span style={{opacity:0.5}}>{likes}</span>
                <IconButton onClick={handleLike} sx={{opacity: 0.5}}>
                    {liked ? <FavoriteIcon />: <FavoriteBorderIcon /> }
                </IconButton>
                </Grid> */}
                     
        </Grid>          
    );
};

export default Details;