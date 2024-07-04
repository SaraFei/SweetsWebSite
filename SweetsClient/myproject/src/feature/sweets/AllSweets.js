import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";

import OneSweet from "./OneSweet";

import { saveAmountSweetsInClient, setFilter } from "./sweetSlice"
import { getAllSweets, getAllSweetsFiltered, getQtyOfSweets } from "./SweetsApi.js";
import OneManagerAllSweets from "./OneManagerAllSweets.js";
//כשאני לוחצת על הלוגו אחרי שביצעתי סינון הוא לא מביא לי את כל הממתקים
//צריך לבצע ליוז סטיי של פילטר איפוס לFALSE

//mui paginaation
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const AllSweets = () => {

  let user = useSelector(state => state.userState.currentUser);
  let [sweetsArr, setSweetsArr] = useState([]);
  // let [filterSweetsArr, setFilterSweetsArr] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [sweetsCnt, setSweetCnt] = useState(0);
  let [filterSelected, setFilterSelected] = useState(false);
  // let [filter, setFilter] = useState(false);
  let filterFromState = useSelector(state => state.sweetState.filter);
  let [deletedSweet, setDeletedSweet] = useState(false);
  let dispatch = useDispatch();

  const sweetSelected = (filterTxt) => {
    getAllSweetsFiltered(filterTxt).then(
      res => {
        alert("מתוקים");
        setSweetsArr(res.data);
        setFilterSelected(true);
        // dispatch(setFilter(true));
      })
  }

  useEffect(() => {
    getAllSweets(currentPage).then(
      res => {
        alert("hello sweets🍫 ");
        setSweetsArr(res.data);
        //אולי להוסיף לכאן פולס
        //לא בטוח שזה טוב
        setFilterSelected(false);
      }
    ).catch(
      (err) => {
        console.log(err);
        alert("לא הצליח להביא את הממתקים");
      }
    )
  }, [deletedSweet, currentPage])
  useEffect(() => {
    getQtyOfSweets("").then(
      res => {
        setSweetCnt(res.data.cnt);
        console.log(res.data.cnt);
        dispatch(saveAmountSweetsInClient(res.data.cnt))
      }

    )

  }, deletedSweet)

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  // let sweetArr = useSelector(state => state.sweetState.sweetsArr);                 
  return (
    <>

      <h1>כל הממתקים🍬🍭</h1>
      <input type="button" value="מתוקים" onClick={() => { sweetSelected("מתוקים") }} />
      <input type="button" value="מלוחים" onClick={() => { sweetSelected("מלוחים") }} />
      <div style={{ display: 'grid', marginTop: "2%", marginLeft: "0.5%", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {sweetsArr.map(item => !user || user.role == 'user' ? <OneSweet key={item.id} singleSweet={item} /> : user.role == 'admin' && <OneManagerAllSweets singleSweet={item} setDeletedSweet={setDeletedSweet} />
        )}

        <Stack spacing={2} style={{ alignItems: "self-start" }}>
          <Pagination count={(sweetsCnt / 6) % 1 == 0 ? (sweetsCnt / 6) : Math.floor(sweetsCnt / 6) + 1} page={currentPage} onChange={handleChange} />
        </Stack>
        <Outlet />
      </div>
    </>

  );
}

export default AllSweets;
//בעת סינון הכפתורים נשארים אותו דבר

// AllSweets.js
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Outlet } from 'react-router-dom';
// import { Box, Container, Grid, Typography, Divider } from '@mui/material';

// import OneSweet from './OneSweet';
// import OneManagerAllSweets from './OneManagerAllSweets';
// import { saveAmountSweetsInClient } from './sweetSlice';
// import { getAllSweets, getQtyOfSweets } from './SweetsApi';

// const AllSweets = () => {
//     let user = useSelector(state => state.userState.currentUser);
//     let [sweetsArr, setSweetsArr] = useState([]);
//     let [deletedSweet, setDeletedSweet] = useState(false);
//     let dispatch = useDispatch();

//     useEffect(() => {
//         getAllSweets().then(res => {
//             setSweetsArr(res.data);
//         });
//         getQtyOfSweets().then(res => {
//             dispatch(saveAmountSweetsInClient(res.data.cnt));
//         }).catch(err => {
//             console.log(err);
//             alert("לא הצליח להביא את הממתקים");
//         });
//     }, [deletedSweet]);

//     return (
//         <Container fixed>
//             <Typography variant="h3" component="h1" sx={{ my: 4 }}>כל הממתקים🍬🍭</Typography>
//             <Divider sx={{ mb: 4 }} />
//             <Grid container spacing={2}>
//                 {sweetsArr.map(item =>
//                     !user || user.role === 'user'
//                         ? <Grid item xs={12} sm={6} md={4} key={item.id}><OneSweet singleSweet={item} /></Grid>
//                         : user.role === 'admin' && <Grid item xs={12} sm={6} md={4} key={item.id}><OneManagerAllSweets singleSweet={item} setDeletedSweet={setDeletedSweet} /></Grid>
//                 )}
//             </Grid>
//             <Outlet />
//         </Container>
//     );
// }

// export default AllSweets;




