import React, { useContext, useState } from 'react';
import { DappifyContext } from 'react-dappify';
import { Grid, Typography, Button } from '@mui/material';
import { navigate } from '@reach/router';

const Categories= ({ onSelect }) => {
    const { configuration } = useContext(DappifyContext);
    const [selected, setSelected] = useState();
// https://fonts.google.com/icons?icon.style=Outlined

    const handleSelect = (cat) =>{
        if (cat.uri === selected) {
            setSelected();
            if (onSelect)
                onSelect(); 
        } else {
            setSelected(cat.uri);
            if (onSelect)
                onSelect(cat);
            else 
                navigate(`/explore?category=${cat.uri}`);
        }
    };

    const displayCategories = () => {
        const items = [];
        configuration?.categories.forEach((category, index) => {
            items.push(
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Button id={category.uri} fullWidth variant='contained' sx={{ borderRadius: 0, py: 4 }} onClick={() => handleSelect(category)}>
                        <Grid container direction="column">
                            <Grid item xs={12}>
                                <span className="material-symbols-outlined" style={{ fontSize: '3em'}}>
                                    {category.icon || 'arrow_forward'}
                                </span>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>{category.label || 'Icon Name'}</Typography>
                            </Grid>
                        </Grid>
                    </Button>
                </Grid>
            );
        });
        return items;
    };

    return (
        <Grid container spacing={1} justifyContent="center">
           {configuration?.categories && displayCategories()}
        </Grid>
    );
};
export default Categories;