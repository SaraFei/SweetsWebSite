//This component in charge of calculate the number of the buttons we need to 
//display all sweets
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import {  useSelector } from "react-redux";
import ButtonsSweets from "./ButtenSweets";
import { getAllSweets } from '../SweetsApi';

const AllButtonsSweet = () => {

    let sweetsButtonsQty = useSelector(state => state.sweetState.sweetsAmount);

    let result = sweetsButtonsQty % 8;
    let numOfButtons = parseInt(sweetsButtonsQty / 8);
    if (result > 0 && numOfButtons > 0) {
        numOfButtons++;
    }
    let buttonsArr = []
    for (let i = 0; i < numOfButtons; i++) {
        buttonsArr[i] = i;
    }

    return (
        <>
            {result}
            {parseInt(sweetsButtonsQty / 8)}
            {numOfButtons}
            {buttonsArr.map(item => {
                return <ButtonsSweets key={item} signalButton={item} />}
               
               
           )}

        </>
    );
}

export default AllButtonsSweet;