// import { useContext } from 'react';
import { useTheme } from "@mui/material/styles";
import {  Button} from '@mui/material';
// import { DappifyContext } from 'react-dappify';
import { Link } from '@reach/router';

export default function NavButton({ link, label }) {
    const theme = useTheme();
    // const { configuration } = useContext(DappifyContext);

    const isLocalLink = !link.startsWith('http');

    return (
        <Button
            key={link}
            component="span"
            className="menu__link"
            disableRipple
            sx={{ 
                fontSize:'1.1em',
                p: 1,
                mx: 1,
                textAlign: 'center',
                color: theme.palette.text.primary, 
                display: 'block', 
                '&::after': {
                    backgroundColor: theme.palette.primary.main,
                },
                '&:hover': {
                    background: 'transparent'
                },
                'a':{
                    color: theme.palette.text.primary, 
                }
            }}
        >
            {isLocalLink && (<Link to={`/${link}`}>{label}</Link>)}
            {!isLocalLink && (<a href={link} target="_blank" rel="noreferrer">{label}</a>)}
        </Button>
    );
}