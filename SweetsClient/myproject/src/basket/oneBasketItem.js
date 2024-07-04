
import { useDispatch } from 'react-redux';
import { addProductToClient, decrementProductQuantity, deleteProductFromBasket } from './basketSlice';

//mui card
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


//mui icons
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const OneBasketItem = ({ singleBasketItem, amount }) => {
    const theme = useTheme();


    let dispatch = useDispatch();
    const addProduct = () => {
        dispatch(addProductToClient(singleBasketItem))
    }
    const removeProduct = () => {
        // if (amount == 1) {
        //     removeProductFromBasket();
        // }
        if (amount != 1) {
            dispatch(decrementProductQuantity(singleBasketItem))
        }
    }
    const removeProductFromBasket = () => {
        dispatch(deleteProductFromBasket(singleBasketItem._id));
    }



    return (<>





        <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5" sx={{color:'red'}}>
                        {singleBasketItem.sweetName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{color:'black'}}>
                        מחיר ליחידה: {singleBasketItem.sweetPrice}

                    </Typography>

                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{color:'black'}}>
                        סה"כ מחיר :{Math.round(parseInt(singleBasketItem.sweetPrice * amount))}
                    </Typography>

                    <IconButton aria-label="removeProduct" onClick={() => { removeProductFromBasket() }}>
                        <DeleteIcon sx={{color:'#ffb6c1'}}/>
                    </IconButton>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="removeItem" onClick={() => { removeProduct() }}>
                        <RemoveIcon />
                    </IconButton>
                    <div style={{color:'#ffb6c1'}}>
                    {amount}</div>
                    <IconButton aria-label="addItem" onClick={() => { addProduct() }}>
                        <AddIcon />
                    </IconButton>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 ,marginRight:'40%'}}
                image={singleBasketItem.imgSweet}
                alt={singleBasketItem.sweetName}

            />
        </Card>
    </>);
}
export default OneBasketItem;