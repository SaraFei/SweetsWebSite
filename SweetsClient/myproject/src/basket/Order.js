// import { useDispatch, useSelector } from "react-redux";
// import { addOrderToServer } from "../order/OrderApi"
// import { useState } from "react";
// import { setCustomerAddress } from "./basketSlice";
// import { Link } from "react-router-dom";

// //mui- alert
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';

// const Order = () => {
//     let dispatch = useDispatch();
//     let basketArr = useSelector(state => state.basketState.basketProductArr);
//     let user = useSelector(state => state.userState.currentUser);
//     let customerAddress = useSelector(state => state.basketState.customerAddress);

//     const handleAddNewOrder = (e) => {
//         let productsDetails = [];
//         for (let i = 0; i < basketArr.length; i++) {
//             productsDetails[i] = {
//                 productName: basketArr[i].product.sweetName,
//                 amount: basketArr[i].amount
//             }

//         }
//         let newOrder = {
//             customerAddress: customerAddress,
//             productsDetails: productsDetails

//         }
//         console.log(newOrder.customerAddress + "כתובת");
//         console.log(newOrder.productsDetails[0] + "מוצר וכמות");

//         addOrderToServer(newOrder, user.token, user._id).then(res => {
//             console.log(res.data);
//             <Stack sx={{ width: '100%' }} spacing={2}>
//                 <Alert severity="success">התשלום אושר</Alert>
//             </Stack>

//         }).catch(err => {
//             console.log(user.token._id, "יוזר");
//             console.log(err);
//         })
//     }

//     return (
//         <div style={{ marginTop: '10%' }}>

//             {!user && <Link to="/signUp" variant="body2">
//                 עליך להרשם לפני ביצוע ההזמנה                                </Link>}

//             <br />
//             נא הקש כתובת לביצוע ההזמנה
//             <input type="text" placeholder="הקש כתובת" onChange={(e) => { dispatch(setCustomerAddress(e.target.value)) }} />
//             <input type="button" value="אישור" onClick={handleAddNewOrder} />

//         </div>
//     );
// }

// export default Order;



import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addOrderToServer } from "../order/OrderApi";
import { setCustomerAddress } from "./basketSlice";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Box, Alert, Stack } from '@mui/material';

const Order = () => {
    const dispatch = useDispatch();
    const basketArr = useSelector(state => state.basketState.basketProductArr);
    const user = useSelector(state => state.userState.currentUser);
    const customerAddress = useSelector(state => state.basketState.customerAddress);
    const [orderSuccess, setOrderSuccess] = useState(null);

    const handleAddNewOrder = (e) => {
        const productsDetails = basketArr.map(item => ({
            productName: item.product.sweetName,
            amount: item.amount
        }));

        const newOrder = {
            customerAddress,
            productsDetails
        };

        console.log(newOrder.customerAddress + "כתובת");
        console.log(newOrder.productsDetails[0] + "מוצר וכמות");

        addOrderToServer(newOrder, user.token).then(res => {
            console.log(res.data);
            setOrderSuccess(true);
        }).catch(err => {
            console.log(user._id, "יוזר");
            console.log(err);
            setOrderSuccess(false);
        });
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundImage: 'url(https://www.kokob.co.il/wp-content/uploads/2023/05/17.jpg)', // Replace with your image URL
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            color: 'white',
        }}>
            <Box sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
                width: '300px',
            }}>
                {!user && (
                    <Typography variant="body2" sx={{ color: 'black' }}>
                        <Link to="/signUp" style={{ color: 'black', textDecoration: 'none' }}>עליך להרשם לפני ביצוע ההזמנה</Link>
                    </Typography>
                )}
                <br />
                {orderSuccess === null && <><Typography variant="body1" gutterBottom sx={{ color: 'black' }}>
                    נא הקש כתובת לביצוע ההזמנה
                </Typography>
                    <TextField
                        variant="outlined"
                        placeholder="הקש כתובת"
                        onChange={(e) => dispatch(setCustomerAddress(e.target.value))}
                        fullWidth
                        margin="normal"
                        sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                    />
                    {user ? <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleAddNewOrder}
                        sx={{ marginTop: '10px', backgroundColor: '#f50057', color: 'white' }}
                    >
                        אישור
                    </Button> : <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleAddNewOrder}
                        sx={{ marginTop: '10px', backgroundColor: '#f50057', color: 'white' }}
                        disabled
                    >
                        אישור
                    </Button>}</>}
                {orderSuccess !== null && (
                    <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
                        {orderSuccess ? (
                            <Alert severity="success">התשלום אושר</Alert>
                        ) : (
                            <Alert severity="error">התרחשה שגיאה בעת ביצוע ההזמנה</Alert>
                        )}
                    </Stack>
                )}
            </Box>
        </Box>
    );
};

export default Order;
