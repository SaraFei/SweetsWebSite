//mui card
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


const SmallCart = ({ singleBasketItem, amount }) => {


    return (
        <>


            <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {singleBasketItem.sweetName}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            מחיר ליחידה:{singleBasketItem.sweetPrice}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            כמות:{amount}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            סהכ מחיר:{singleBasketItem.sweetPrice * amount}
                        </Typography>

                    </CardContent>

                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={singleBasketItem.imgSweet}
                    alt={singleBasketItem.sweetName}
                />
            </Card>

        </>
    )
}

export default SmallCart;