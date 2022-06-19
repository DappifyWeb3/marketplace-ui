import { useState, useEffect, useContext } from 'react';
import { OutlinedInput, MenuItem, Grid, Dialog, DialogContent, Select, DialogTitle, DialogContentText, Typography, Input, FormControl, InputLabel, InputAdornment } from '@mui/material';
import { DappifyContext, constants, Property } from 'react-dappify';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from 'store/selectors';
import { sellNft } from "store/actions/thunks";
import ConfirmationWarning from 'components/ConfirmationWarning';
import OperationResult from 'components/OperationResult';
import { modalReset } from 'store/actions/thunks';
import ModalActions from 'components/ModalActions';
import isEmpty from 'lodash/isEmpty';
import { fetchNftDetail, fetchHotAuctions, fetchNftsBreakdown } from 'store/actions/thunks/nfts';
import { fetchCurrentUser } from 'store/actions/thunks/users';

const ModalSale = ({ isOpen=false, onClose, isBid, nft, t }) => {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState();
    const nftSellState = useSelector(selectors.nftSellState);
    const isSelling = nftSellState.loading;
    const { configuration, loadBalances } = useContext(DappifyContext);
    const network = constants.NETWORKS[configuration.chainId];
    const priceOver = configuration?.feature?.bids?.priceOver;
    const maxBid = nft?.maxBid || 0;
    const [categories] = useState(Property.findAllWithType({type:'category'}));

    const [amount, setAmount] = useState();
    const [quantity, setQuantity] = useState(1);

    const getToken = () => `${nft?.metadata?.name} #${nft.tokenId}`;

    useEffect(() => {
        const initialAmount = isBid ? (maxBid + priceOver) : nft.price;
        setAmount(initialAmount);
    // eslint-disable-next-line no-use-before-define
    }, [isBid, maxBid, nft, priceOver]);

    useEffect(() => {
        return async () => {
            await dispatch(modalReset());
        };
    },[dispatch, isOpen])

    const handleAction = async() => {
        await dispatch(sellNft(nft, amount, selectedCategory, quantity));
    }

    const handleClose = async() => {
        dispatch(fetchNftDetail(nft.collection.address, nft.tokenId));
        dispatch(fetchHotAuctions());
        dispatch(fetchNftsBreakdown());
        dispatch(fetchCurrentUser());
        loadBalances();
        onClose();
    }

    const handleAmountChange = (e) => setAmount(parseFloat(e.target.value));

    const handleSelectCategory = (e) => {
        setSelectedCategory(e.target.value);
    }

    return (

        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
        <DialogTitle>
            Add to marketplace
        </DialogTitle>
        <DialogContent className="content__modal">
            <DialogContentText>
                <Grid container direction="column" spacing={1}>
                    <Grid item xs={12}>
                        Please list my item ({nft.type}) <Typography variant="body" fontWeight={900}>{getToken()}</Typography> in the marketplace for a sale price <i><u><strong>per unit</strong></u></i> of:
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="standard" justifyContent="center" fullWidth sx={{ mt: 3 }}>
                            <Input
                            id="standard-adornment-weight"
                            value={amount}
                            onChange={handleAmountChange}
                            endAdornment={<InputAdornment position="end">
                                <Typography sx={{ opacity: 0.75 }}>
                                    {network.nativeCurrency.symbol}
                                </Typography>
                            </InputAdornment>}
                            aria-describedby="standard-amount-helper-text"
                            type="number"
                            sx={{
                                '& input[type=number]': {
                                    '-moz-appearance': 'textfield'
                                },
                                '& input[type=number]::-webkit-outer-spin-button': {
                                    '-webkit-appearance': 'none',
                                    margin: 0
                                },
                                '& input[type=number]::-webkit-inner-spin-button': {
                                    '-webkit-appearance': 'none',
                                    margin: 0
                                }
                            }}
                            />

                        </FormControl>
                    </Grid>


                    <Grid item xs={12}>
                        <FormControl variant="standard" justifyContent="center" fullWidth sx={{ mt: 3 }}>
                            <Input
                            id="quantity-adornment-weight"
                            value={quantity}
                            disabled={nft.quantity <= 1}
                            InputProps={{ inputProps: { min: 1, max: nft.quantity } }}
                            onChange={(e) => {
                                let val = parseInt(e.target.value);
                                if (val > nft.quantity)
                                    val = nft.quantity;
                                setQuantity(val);
                            }}
                            endAdornment={<InputAdornment position="end">
                                <Typography sx={{ opacity: 0.75 }}>
                                    Qty (Max {nft.quantity})
                                </Typography>
                            </InputAdornment>}
                            aria-describedby="quantity-amount-helper-text"
                            type="number"
                            sx={{
                                '& input[type=number]': {
                                    '-moz-appearance': 'textfield'
                                },
                                '& input[type=number]::-webkit-outer-spin-button': {
                                    '-webkit-appearance': 'none',
                                    margin: 0
                                },
                                '& input[type=number]::-webkit-inner-spin-button': {
                                    '-webkit-appearance': 'none',
                                    margin: 0
                                }
                            }}
                            />

                        </FormControl>
                    </Grid>


                    {!isEmpty(categories) && (<Grid item xs={12} sx={{ mt: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-name-label">Select a category</InputLabel>
                            <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={selectedCategory}
                            onChange={handleSelectCategory}
                            input={<OutlinedInput label={t('Select a category')} />}
                            >
                            {categories.map((category) => (
                                <MenuItem
                                key={category.key}
                                value={category.key}
                                >
                                {category.key}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Grid> )}
                    {isSelling && (<ConfirmationWarning t={t} />)}
                    <OperationResult state={nftSellState} t={t} />
                </Grid>
            </DialogContentText>
                 <ModalActions  state={nftSellState} 
                                onClose={handleClose} 
                                handleAction={handleAction} 
                                t={t} 
                                confirmLabel="Confirm" 
                                loading={isSelling} 
                 />
        </DialogContent>
    </Dialog>
    );
  };
  
  export default ModalSale;
