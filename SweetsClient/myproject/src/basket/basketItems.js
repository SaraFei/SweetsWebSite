// import { useSelector } from "react-redux";

// import OneBasketItem from "./oneBasketItem";
// import { Link } from "react-router-dom";


// const BasketItems = () => {
//     let basketArr = useSelector(state => state.basketState.basketProductArr);
//     let totalAmount = 0;
//     Math.floor(parseInt(totalAmount));
//     for (let i = 0; i < basketArr.length; i++) {
//         totalAmount += basketArr[i].product.sweetPrice * basketArr[i].amount;

//     }


//     return (
//         <>
//             סל קניות🛒
//             {basketArr.length}

//             <ul>
//                 {basketArr.map(item => (
//                     <div style={{ marginTop: '8px' }} >
//                 <OneBasketItem key={item.product._id} singleBasketItem={item.product} amount={item.amount} />
//                </div> )


//                 )}
//             </ul>
//             <div>
//             <Link to='/allSweets'>
//                 <input type="button" value="המשך בקניה" />
//             </Link>
//             <Link to='/order'>
//                 <input type="button" value="סיום הזמנה" />
//             </Link>
//             סהכ עבור כל המוצרים בעגלה:{Math.round(parseInt(totalAmount))}
// </div>
//         </>
//     );
// }
// /*item.product*/
// export default BasketItems;


import React from "react";
import { useSelector } from "react-redux";
import OneBasketItem from "./oneBasketItem";
import { Link } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";

// shoppingCart img
import shoppingCart from './images/shoppingCart.jpeg';

//mui card
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const BasketItems = () => {
    let basketArr = useSelector((state) => state.basketState.basketProductArr);
    let totalAmount = 0;
    Math.floor(parseInt(totalAmount));
    for (let i = 0; i < basketArr.length; i++) {
        totalAmount += basketArr[i].product.sweetPrice * basketArr[i].amount;
    }

    const card = (
        <React.Fragment>
            <CardContent >

                <Typography variant="h5" component="div">
                    סיכום הזמנה
                </Typography>

                <Typography variant="body2">
                    סהכ עבור כל המוצרים בעגלה: {Math.round(parseInt(totalAmount))}₪
                </Typography>
            </CardContent>
            <CardActions>
                <Link to="/allSweets">
                    <Button variant="contained" sx={{
                        backgroundColor: '#ffb6c1', marginRight: '3px'
                        , '&:hover': {
                            backgroundColor: 'black',
                        }
                    }}>
                        המשך בקניה
                    </Button>
                </Link>
                {basketArr.length > 0 ? <Link to="/order" style={{ marginLeft: "8px" }}>
                    <Button variant="contained" sx={{
                        backgroundColor: 'red', marginRight: '5px'
                        , '&:hover': {
                            backgroundColor: 'black',
                        }
                    }}

                    >
                        סיום הזמנה
                    </Button>
                </Link> :
                    <Button variant="contained" sx={{
                        backgroundColor: 'gray', marginRight: '5px'

                    }}
                        disabled
                    >
                        סיום הזמנה
                    </Button>
                }

            </CardActions>
        </React.Fragment>
    );
    return (
        <div style={{marginTop:'10%'}}>
            <Typography variant="h4">סל קניות {basketArr.length}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <ul>
                        {basketArr.map((item) => (
                            <div style={{ marginTop: "8px" }}>
                                <OneBasketItem key={item.product._id} singleBasketItem={item.product} amount={item.amount} />
                            </div>
                        ))}
                    </ul>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ minWidth: 275 }}>
                        <Card variant="outlined" sx={{ backgroundImage: `url(${shoppingCart})`, backgroundSize: 'cover' ,top:'80px'}}>{card}</Card>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default BasketItems;
