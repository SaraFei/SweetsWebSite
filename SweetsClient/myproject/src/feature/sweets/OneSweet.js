//Allows switching between pages
import { Link } from 'react-router-dom';

//mui
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

//mui icons
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

const OneSweet = ({ singleSweet }) => {
  if (!singleSweet) {
    // Handle the case when the doctor object is undefined
    return "😭"; // or display an error message
  }
  return (<>

    <div style={{ margin: "10px" }}>
      <Card sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }}>
        <CardOverflow>
          <AspectRatio sx={{ minWidth: 200 }}>
            <Link to={`sweetDetails/${singleSweet._id}`} state={singleSweet} >
              <img
                src={singleSweet.imgSweet}
                loading="lazy"
                alt={singleSweet.sweetName}
              />
            </Link>
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="body-xxxl">{singleSweet.sweetName}</Typography>
        </CardContent>
        <CardContent>
          <Typography level="body-xxxl">{singleSweet.sweetPrice}</Typography>

        </CardContent>


      </Card >
    </div>







    {/* <h1> {singleSweet.sweetName}</h1>
        <h2> {singleSweet.sweetPrice}</h2>
        
        <Link to={`sweetDetails/${singleSweet._id}`} state={singleSweet} >
      <img  src={singleSweet.imgSweet} alt={singleSweet.sweetName} />
      </Link> */}
  </>);
}

export default OneSweet;