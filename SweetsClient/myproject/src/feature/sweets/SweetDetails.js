
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux"
import { useState } from "react";

import { addProductToClient } from "../../basket/basketSlice";
import DialogSmallCart from "../../basket/DialogSmallCart";
import "./style/SweetDetails.css";

//mui button-add to cart
import Fab from '@mui/material/Fab';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
const SweetDetails = () => {
    let [isClick, setIsClick] = useState(false);
    let dispatch = useDispatch();
    let location = useLocation();
    let sweet = location.state;

    const showSmallCart = () => {
        setIsClick(true);
    }
    if (!sweet) {
        return <div style={{ backgroundColor: "red", position: "fixed", width: "100vw", height: "100vh" }}>No sweet found!</div>; // or any other fallback UI
    }


    return (
        <div className="visual"  >
            <div className="details-container"  >
                <div className="img-sweet">
                    <img src={sweet.imgSweet} style={{ width: '50%', height: '100%' }} />
                </div>
                <div className="sweet-details">

                    <h1>{sweet.sweetName}</h1>
                    <p style={{marginBottom:"30%"}}>{sweet.data}</p>
                    <Fab variant="extended" color="primary" onClick={() => {
                        dispatch(addProductToClient(sweet));
                        showSmallCart();
                    }}
                        sx={{
                            width: '60%', backgroundColor: '#CC2222', '&:hover': {
                                backgroundColor: '#ffb6c1',
                            }
                        }}>
                        <AddShoppingCartIcon sx={{ mr: 1 }} />
                        הוסף לסל
                    </Fab>

                    {isClick && <DialogSmallCart setIsClick={setIsClick} isClick={isClick} />}
                    <Link to={"/basket"}>
                        <Fab variant="extended" color="primary"
                            sx={{
                                width: '60%', backgroundColor: '#CC2222', '&:hover': {
                                    backgroundColor: '#ffb6c1',
                                }
                                , top: "8px"
                            }}>
                            <ShoppingCartCheckoutIcon sx={{ mr: 1 }} />
                            מעבר לסל הקניות
                        </Fab>
                    </Link>
                </div>
            </div>
        </div>
    );

}

export default SweetDetails;