import NavLink from 'components/NavLink';
import { DappifyContext } from 'react-dappify';
import { useContext } from 'react';
import { Box } from '@mui/material';

const Logo = () => {
    const { configuration } = useContext(DappifyContext);
    // // // console.log(configuration);
    return (
        <div className='logo px-0'>
            <div className='navbar-title navbar-item'>
                <NavLink to="/">
                    <Box sx={{
                        backgroundImage: `url(${configuration.logo})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        width: '250px',
                        height: '40px',
                    }} fullWidth/>
                </NavLink>
            </div>
        </div>
    );
}
export default Logo;