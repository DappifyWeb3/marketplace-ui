import React, { memo, useEffect, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from '@reach/router';
import * as selectors from 'store/selectors';
import { getBlogPosts } from "store/actions/thunks";
import moment from "moment";
import { DappifyContext } from 'react-dappify';

const News = () => {
    const { configuration } = useContext(DappifyContext);
    const { Moralis } = {};
    const navigateTo = (link) => {
        navigate(link);
    }

    const dispatch = useDispatch();
    const blogsState = useSelector(selectors.blogsState);
    const blogPosts = blogsState.data ? blogsState.data : [];

    useEffect(() => {
        dispatch(getBlogPosts(Moralis, configuration));
    }, [Moralis, configuration, dispatch]);

    return (
        <div className="row">
            {blogPosts && blogPosts.map((blog, index) => (
            <div className="col-lg-4 col-md-6 mb30" key={index}>
                <div className="bloglist item">
                    <div className="post-content">
                        <div className="post-text">
                            <span className="p-tagline">Tips &amp; Tricks</span>
                            <span className="p-date">{moment(blog?.attributes?.createdAt ? blog.attributes.createdAt :blog.timestamp).format('L, LT')}</span>
                            <h4><span>{blog?.attributes?.title ? blog.attributes.title : blog.title}<span></span></span></h4>
                            <p>{blog?.attributes?.content ? blog.attributes.content.substring(0, 134): blog.content.substring(0, 134)}...</p>
                            <span onClick={() => navigateTo(`/${process.env.REACT_APP_TEMPLATE_NAME}/news/${blog.id}`)} className="btn-main">Read more</span>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
    );
};

export default memo(News);