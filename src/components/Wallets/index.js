import { useContext } from 'react';
import { useTheme } from "@mui/material/styles";
import { Grid, Chip, Typography, Paper } from '@mui/material';
import { DappifyContext } from 'react-dappify';
import { useNavigate } from '@reach/router';
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from 'store/actions/thunks';
import { useTranslation } from 'react-i18next';

const supportedWallets = [
    { id: 'metamask', image: './img/wallet/1.png', tag: 'Most popular', name: 'Metamask'},
    // { id: 'torus', image: './img/wallet/8.png', tag: 'Most Simple', name: 'Torus', description: 'Open source protocol for connecting decentralised applications to mobile wallets.' },
    // { id: 'bitski', image: './img/wallet/2.png', name: 'Bitski', description: 'Bitski connects communities, creators and brands through unique, ownable digital content.' },
    // { id: 'formatic', image: './img/wallet/3.png', name: 'Fortmatic', description: 'Let users access your Ethereum app from anywhere. No more browser extensions.' },
    // { id: 'walletconnect', image: './img/wallet/4.png', name: 'WalletConnect', description: 'Open source protocol for connecting decentralised applications to mobile wallets.' },
    // { id: 'coinbase', image: './img/wallet/5.png', name: 'Coinbase', description: 'The easiest and most secure crypto wallet. No Coinbase account required.' },
    // { id: 'arkane', image: './img/wallet/6.png', name: 'Arkane', description: 'Make it easy to create blockchain applications with secure wallets solutions.' },
    // { id: 'authereum', image: './img/wallet/7.png', name: 'Authereum', description: 'Your wallet where you want it. Log into your favorite dapps with Authereum.' }
];
  
const Wallet= () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const { configuration, authenticate } = useContext(DappifyContext);
    const loginUser = async (walletProvider) => {
        try {
            await authenticate({ provider: walletProvider, signingMessage: `${configuration.name} authentication`});
            dispatch(fetchCurrentUser());
            navigate('/');
        } catch (e) {
        }
    };

    const renderWallets = () => {
        const walletList = [];
        supportedWallets.forEach((supportedWallet) => {
            walletList.push(
                <Grid item xs={12} md={6} lg={4} id={supportedWallet.id} onClick={() => loginUser(supportedWallet.id)} key={supportedWallet.id}>
                    <Paper variant="outlined" className="wallet__card" sx={{
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                        },
                        }}>
                        { supportedWallet.tag && (<Chip color="primary" className="wallet__tag" variant="contained" label={t(supportedWallet.tag)} />)}
                        <img src={supportedWallet.image} alt={supportedWallet.name} className="mb20"/>
                        <Typography variant="h5" sx={{ mb: 2 }}>{supportedWallet.name}</Typography>
                        <Typography variant="body">{t(supportedWallet.name)}</Typography>
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