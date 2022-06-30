import React, { useState } from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import { navigate } from '@reach/router';
import { Property, utils } from 'react-dappify';

const { toUri } = utils.format;

const Categories= ({ onSelect }) => {
    const [categories] = useState(Property.findAllWithType({type:'category'}));

    const handleSelect = (cat) =>{
        navigate(`/${process.env.REACT_APP_TEMPLATE_NAME}/explore?category=${toUri(cat.key)}`);
    };

    const displayCategories = () => {
        const items = [];
        categories.forEach((category, index) => {
            items.push(
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Button id={category.key} 
                            fullWidth variant='contained' 
                            sx={{ 
                                borderRadius: 0, 
                                py: 4
                            }} 
                            onClick={() => handleSelect(category)}>
                        <Box sx={{
                            background: `url(${category.value})`,
                            backgroundSize: 'cover',
                            backgroundRepear: 'no-repeat',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            zIndex: 0,
                            opacity: 0.8
                        }}/>
                        <Grid container direction="column" sx={{ zIndex: 1 }}>
                            <Grid item xs={12}>
                                <Typography variant="h4">{category.key || 'Icon Name'}</Typography>
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
           {categories && displayCategories()}
        </Grid>
    );
};
export default Categories;