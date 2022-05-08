import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import UserSales from 'components/UserSales/';
import * as selectors from 'store/selectors';
import { fetchUserRanking } from "store/actions/thunks";
import { Grid } from '@mui/material';

const TopSellerList = () => {
    
    const dispatch = useDispatch();
    const authorState = useSelector(selectors.authorRankingsState);
    const authors = authorState.data ? authorState.data : [];

    useEffect(() => {
        dispatch(fetchUserRanking());
    }, [dispatch]);

    return (
        <Grid container spacing={3} alignItems="center" justifyContent="center">
            { authors && authors.map((author, index) => (
                <Grid item xs={12} xm={6} sm={4} md={3} key={index}>
                    <UserSales user={author} index={index} />
                </Grid>
            ))}
        </Grid>
    );
};
export default memo(TopSellerList);
