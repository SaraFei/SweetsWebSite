const SweetFilter = ({sweetArr}) => {
    
    const sweetSelected=()=>{
for (let i = 0; i < sweetArr.length; i++) {
   
    
}
    }
    return (<>
        <input type="button" value="מתוקים" onChange={sweetSelected}/>
        <input type="button" value="מלוחים" />
        {/* <input type="button" value="מתוקים" /> */}

    </>);
}

export default SweetFilter;