import { useDispatch } from "react-redux";

import { MovePage } from "../SweetsApi";

const ButtonsSweets = ({ signalButton }) => {


    return (
        <>
            <button onClick={()=>{MovePage(signalButton)}}>{signalButton}</button>
        </>
    );

}

export default ButtonsSweets;
