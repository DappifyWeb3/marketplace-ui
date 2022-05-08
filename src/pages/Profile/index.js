import React, { memo, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Footer from 'components/Segment/Footer';
import { saveCurrentUser } from "store/actions/thunks";
import * as selectors from 'store/selectors';
import { DappifyContext } from 'react-dappify';
import Identicon from 'react-identicons';
import { Button } from '@mui/material';

const Profile = ({t}) => {
    const { configuration, user } = useContext(DappifyContext);
    const dispatch = useDispatch();
    const currentUserState = useSelector(selectors.currentUserState);
    const currentUser = currentUserState.data || {};
    const [imageFile, setImageFile] = useState();
    const [imagePreview, setImagePreview] = useState();
    const [bannerFile, setBannerFile] = useState();
    const [bannerPreview, setBannerPreview] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const profileImage = imageFile;
        const bannerImage = bannerFile;
        dispatch(saveCurrentUser({ currentUser, profileImage, bannerImage}));
    }
    
    const handleProfilePicture = async (e) => {
        let file = e.target.files[0];
        setImageFile(file)
        let reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result)
        };
        reader.readAsDataURL(file);
    }
    
    const handleProfileBanner = async (e) => {
        let file = e.target.files[0];
        setBannerFile(file)
        let reader = new FileReader();
        reader.onloadend = () => {
            setBannerPreview(reader.result)
        };
        reader.readAsDataURL(file);
    }
    
    const getUserImage = () => {
        if (!user) return;
        const userImage = currentUser.image;
        if (userImage || imagePreview) {
            const displayImage = imagePreview ? imagePreview : userImage;
            return (
                <img 
                    src={displayImage} 
                    id="click_profile_img" 
                    className="d-profile-img-edit img-fluid" 
                    alt=""
                    style={{width: '150px', height: '150px', objectFit: 'cover'}}
                />
            );
        }
        return  <Identicon className="d-profile-img-edit img-fluid"  string={currentUser.wallet} size="150" bg="white" />;
    };

    const getBanner = () => {
        if (bannerPreview) return bannerPreview;
        if (currentUser && currentUser.banner) return currentUser.banner;
        return configuration.images.profile;
    };

    const handleChange = (e) => currentUser[e.target.id] = e.target.value;

    return  (
        <div>
            <section id='profile_banner' className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${getBanner()})`}}>
                <div className='mainbreadcumb'>
                </div>
            </section>
            
            <section id="section-main" aria-label="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 d-flex">
                            
                                <div className="form-border w-100">
                                <form onSubmit={handleSubmit}>
                                    <div className="de_tab tab_simple">
                                    
                                    <ul className="de_nav text-left m-0 mb-3">
                                        <li className="active" style={{opacity: 1}}><span><i className="fa fa-user"></i>{t('Profile')}</span></li>
                                    </ul>
                                    
                                    <div className="de_tab_content">                            
                                        <div className="tab-1">
                                            <div className="row wow fadeIn animated" style={{backgroundSize: 'cover', visibility: 'visible', animationName: 'fadeIn'}}>
                                                <div className="col-lg-8 mb-sm-20">
                                                    <div className="field-set">
                                                        <h5>{t('Username')}</h5>
                                                        <input defaultValue={currentUser.username} onChange={handleChange} type="text" name="username" id="username" className="form-control" placeholder={t('Username placeholder')}/>                                    
                                                        <div className="spacer-20"></div>

                                                        <h5>{t('Bio')}</h5>
                                                        <input defaultValue={currentUser.bio}  onChange={handleChange} component="textarea" name="bio" id="bio" className="form-control" placeholder={t('Bio placeholder')}/>
                                                        <div className="spacer-20"></div>

                                                        <h5>{t('Twitter')}</h5>
                                                        <input defaultValue={currentUser.twitter} onChange={handleChange} type="text" name="twitter" id="twitter" className="form-control" placeholder={t('Twitter placeholder')}/>
                                                        <div className="spacer-20"></div>

                                                        <h5>{t('Wallet')}</h5>
                                                        <input defaultValue={currentUser.wallet} disabled type="text" name="wallet" id="wallet" className="form-control" placeholder={t('Wallet placeholder')}/>
                                                        <div className="spacer-20"></div>
                                                    </div>
                                                </div>                                         
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button size="large" type="submit" id="submit" value="Update profile" variant="contained">{t('Update profile')}</Button>
                            </form>
                            </div>
                            <div id="sidebar" className="col-lg-4">

                                            <h5>{t('Profile image')} <i className="fa fa-info-circle id-color-2" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Recommend 400 x 400. Max size: 50MB. Click the image to upload." aria-label="Recommend 400 x 400. Max size: 50MB. Click the image to upload."></i></h5>
                                            {getUserImage()}
                                        
                                            <div>
                                                <input hidden type="file" id="profile-button" onChange={handleProfilePicture}/>
                                                <label className="upload__file" htmlFor="profile-button">{t('Upload')}</label>
                                            </div>


                                <div className="spacer-30"></div>

                                <h5>{t('Profile banner')} <i className="fa fa-info-circle id-color-2" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Recommend 1500 x 500. Max size: 50MB. Click the image to upload." aria-label="Recommend 1500 x 500. Max size: 50MB. Click the image to upload."></i></h5>
                                <img 
                                    src={getBanner()} 
                                    id="click_banner_img" 
                                    className="d-banner-img-edit img-fluid" 
                                    alt=""
                                />
                                <div>
                                    <input hidden type="file" id="banner-button" onChange={handleProfileBanner}/>
                                    <label className="upload__file" htmlFor="banner-button">{t('Upload')}</label>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer t={t}/>
        </div>
    )
}

export default memo(Profile);