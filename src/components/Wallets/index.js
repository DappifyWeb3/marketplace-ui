import { useContext } from 'react';
import { useTheme } from "@mui/material/styles";
import { Grid, Chip, Typography, Paper } from '@mui/material';
import { DappifyContext } from 'react-dappify';
import { useNavigate } from '@reach/router';
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from 'store/actions/thunks';
import { useTranslation } from 'react-i18next';
import { supportedWallets } from 'react-dappify/wallets';
  
const Wallet= () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const { authenticate } = useContext(DappifyContext);

    const loginUser = async (walletProvider) => {
        try {
            const loggedInUser = await authenticate(walletProvider.payload);
            if (loggedInUser) {
                dispatch(fetchCurrentUser());
                navigate('/');
            }
        } catch (e) {
        }
    };

    const renderWallets = () => {
        const walletList = [];
        supportedWallets.forEach((supportedWallet) => {
            walletList.push(
                <Grid item xs={12} md={6} lg={4} id={supportedWallet.id} onClick={() => loginUser(supportedWallet)} key={supportedWallet.id}>
                    <Paper variant="outlined" className="wallet__card" sx={{
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                        },
                        }}>
                        { supportedWallet.tag && (<Chip color="primary" className="wallet__tag" variant="contained" label={t(supportedWallet.tag)} />)}
                        <img src={supportedWallet.image} alt={supportedWallet.name} className="mb20"/>
                        <Typography variant="h5" sx={{ mb: 2 }}>{supportedWallet.name}</Typography>
                        <Typography variant="body">{t(supportedWallet.name, supportedWallet.description)}</Typography>
                    </Paper>
                </Grid>
            );
        });
        return walletList;
    };

    return (
        <Grid container spacing={3} alignItems="center" justifyContent="center">
            {renderWallets()} 
        </Grid>
    )
};

export default Wallet;