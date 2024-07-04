import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteProductFromServer } from './SweetsApi';
import { deleteSweetFromClient } from './sweetSlice';

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

const OneManagerAllSweets = ({ singleSweet, setDeletedSweet }) => {
    let adminConfirm;

    let user = useSelector(state => state.userState.currentUser);
    let dispatch = useDispatch();
    return (
        <div style={{ margin: "10px" }}>
            <Card sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }}>
                <CardOverflow>
                    <AspectRatio sx={{ minWidth: 200 }}>
                        <img
                            src={singleSweet.imgSweet}
                            // srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
                            loading="lazy"
                            alt=""
                        />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Typography level="body-xxxl">{singleSweet.sweetName}</Typography>



                </CardContent>

                <Box >
                    <Link to={`/editsweet/${singleSweet._id}`} >
                        <Button variant="solid" color="danger" size="lg" sx={{ marginLeft: 18 }}>
                            <CreateIcon />

                        </Button>
                    </Link>
                    <Button variant="solid" color="danger" size="lg" sx={{ marginLeft: 2 }} onClick={() => {
                        adminConfirm = window.confirm("האם אתה רוצה למחוק את המוצר")
                        if (adminConfirm) {
                            try {
                                DeleteProductFromServer(singleSweet._id, user.token);
                                setDeletedSweet(true);
                            }
                            catch (error) {
                                if (error.response.request.status === 400 && error.response.data.type === "error sweetCode") {
                                    console.log("sweetCode is not valied");
                                    console.log(error.response.data.message);
                                }
                                if (error.response.request.status === 404 && error.response.data.type === "sweet error") {
                                    console.log(error.response.data.message);
                                }
                                else { console.log(error) }
                            }

                        }
                    }}>
                        <DeleteIcon />

                    </Button>


                </Box>


            </Card >
        </div>
    );
}
export default OneManagerAllSweets;