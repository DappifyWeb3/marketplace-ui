import React, { useState, useContext} from 'react';
import { DappifyContext } from 'react-dappify';
import Logo from 'components/Logo';
import { Box } from '@mui/material';
import { useTheme } from "@mui/material/styles";

const Footer = ({t}) => {
    const theme = useTheme();
    const { configuration } = useContext(DappifyContext);
    const [year] = useState(new Date().getFullYear());
    const [footerColor] = useState(theme.palette.secondary.main);

    const getHeader = (column) => 'test';//configuration.footer[column]['title'];

    const renderItems = (column) => {
        const list = [];
        configuration.footer[column].items.forEach((item, index) => {
            list.push(
                <li key={index}><a href={item.link}>{t(item.title)}</a></li>
            );
        });
        return list;
    };

    return (
        <footer className="footer-light theme-background">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-3 col-xs-1">
                        <div className="widget">
                            <h5>{getHeader('left')}</h5>
                            <ul>
                                {renderItems('left')}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-3 col-xs-1">
                        <div className="widget">
                            <h5>{getHeader('center')}</h5>
                            <ul>
                                {renderItems('center')}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-3 col-xs-1">
                        <div className="widget">
                            <h5>{getHeader('right')}</h5>
                            <ul>
                                {renderItems('right')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="subfooter">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="de-flex">
                                <div className="de-flex-col">
                                    <Box onClick={()=> window.open("", "_self")} sx={{ display: 'contents' }}>
                                        <Logo />
                                        <span className="copy">&copy; Copyright {year} - {configuration.name}</span>
                                    </Box>
                                </div>
                                <div className="de-flex-col">
                                    {configuration &&(
                                        <div className="social-icons">
                                            {configuration?.social?.facebook && <span onClick={()=> window.open(configuration?.social?.facebook, "_self")}><i className="fa fa-facebook fa-lg" style={{ background: footerColor }} ></i></span> }
                                            {configuration?.social?.twitter && <span onClick={()=> window.open(configuration?.social?.twitter, "_self")}><i className="fa fa-twitter fa-lg" style={{ background: footerColor }} ></i></span> }
                                            {configuration?.social?.instagram && <span onClick={()=> window.open(configuration?.social?.instagram, "_self")}><i className="fa fa-instagram fa-lg" style={{ background: footerColor }} ></i></span> }
                                            {configuration?.social?.pinterest && <span onClick={()=> window.open(configuration?.social?.pinterest, "_self")}><i className="fa fa-pinterest fa-lg" style={{ background: footerColor }} ></i></span> }
                                            {configuration?.social?.email && <span><a href={`mailto: ${configuration?.social?.email}`}><i className="fa fa-envelope fa-lg" style={{ background: footerColor }} ></i></a></span> }
                                            {configuration?.social?.telegram && <span onClick={()=> window.open(configuration?.social?.telegram, "_self")}><i className="fa fa-paper-plane fa-lg" style={{ background: footerColor }} ></i></span> }
                                        </div>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;