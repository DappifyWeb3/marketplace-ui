import { useState } from 'react';
import { useTheme } from "@mui/material/styles";
import { Grid, Box, Autocomplete, TextField, Avatar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";
import { fullTextSearch } from 'store/actions/thunks';
import * as selectors from 'store/selectors';
import Identicon from 'react-identicons';
import { Link, navigate } from '@reach/router';
import Verified from 'components/Verified';
import { utils } from 'react-dappify';

const { format, timer } = utils;
const { cropText } = format;
const { debounce } = timer;

export default function SearchBar({t}) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const fullTextSearchResultState = useSelector(selectors.fullTextSearchResultState);
    const isLoading = fullTextSearchResultState.loading || false;
    const fullTextSearchResult = fullTextSearchResultState.data || [];

    const fetchSearchData = debounce((value) => {
      dispatch(fullTextSearch(value));
    });

    const options = fullTextSearchResult.map((option) => {
      const className = option.source.className === 'Transaction' ? 'NFTs' : 
                        option.source.className === 'NFTCollection' ? 'Collections' : 'Accounts';
      const label = className === 'NFTs' ? option.metadata.name : 
                    className === 'Collections' ? option.name : 
                    option.username ? option.username : '',
      verified = option.verified;
      const image = className === 'NFTs' ? option.metadata.image : 
                    className === 'Collections' ? option.banner : option.image;
      const obj = option;
      return {
        className,
        label,  
        verified,
        image,
        obj
      };
    });

    const getLink = (option) => {
      switch(option.className) {
        case 'NFTs':
          return `/${process.env.REACT_APP_TEMPLATE_NAME}/item/${option.obj.collection.address}/${option.obj.tokenId}`;
        case 'Collections':
          return `/${process.env.REACT_APP_TEMPLATE_NAME}/collection/${option.obj.address}`;
        case 'Accounts':
          return `/${process.env.REACT_APP_TEMPLATE_NAME}/profile/${option.obj.wallet}`;
        default:
          return '/';
      }
    }

  return (

      <Autocomplete
        loading={isLoading}
        options={options.sort((a, b) => -b.className.localeCompare(a.className))}
        groupBy={(option) => option.className}
        disablePortal={true}
        id="grouped-demo"
        open={open}
        onInputChange={(_, value) => {
          if (value.length === 0) {
            if (open) setOpen(false);
          } else {
            if (!open) setOpen(true);
            fetchSearchData(value);
          }
        }}
        onClose={() => setOpen(false)}
        fullWidth
        popupIcon={null}
        renderInput={params => (
          <TextField
            {...params}
            InputProps={{
                ...params.InputProps,
                startAdornment: (
                    <SearchIcon sx={{ color: theme.palette.text.secondary, opacity: 0.5 }} />
                ),
                size:"small",
                sx:{
                  '& legend': { display: 'none' },
                  '& fieldset': { 
                    top: 0, 
                    border: 0
                  },
                  border: `1px solid ${theme.palette.divider}`,
            
                 "& fieldset:hover": {
                  // background: theme.palette.action.selected,
               },
                  "&.Mui-focused fieldset": {
                    'boxShadow': 'rgb(4 17 29 / 25%) 0px 0px 8px 0px',
                    'border': '0 !important',
                    background: 'rgba(255, 255, 255, 0.05)',
                  }
                }
            }}
            placeholder={t('Search items')}
            variant="outlined"
          />
        )}
        renderOption={(props, option, { selected }) => {
          return (
              <Grid item xs={12} {...props} key={option.obj.id} onClick={() => navigate(getLink(option))}>
                  <Link to={getLink(option)}>
                    <Box display={'flex'} flexDirection={'row'} sx={{ p:1 }}>
                        {option.className === 'Accounts' ? 
                          !option.image ? 
                          (<Identicon string={option.obj.wallet} size={40} bg={theme.palette.primary.main} />) :
                          (<Avatar className="fade__in" src={option.image} size={'32'} variant={'circular'} />) :
                          (<Avatar className="fade__in" src={option.image} size={'32'} variant={'circular'} />) 
                        }
                        <Box display={'flex'} ml={1} flexDirection={'column'} justifyContent="center">
                            <Typography variant="body" color={'text.primary'}>
                                {cropText(option.label, 25)} {option.obj.verified && <Verified />}
                            </Typography>
                        </Box>
                    </Box>
                  </Link>
              </Grid>
          );
        }}
      />

  );
}
