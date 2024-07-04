// import React, { useState } from 'react';
// import Joi from 'joi';
// import { useForm } from 'react-hook-form';
// import { joiResolver } from '@hookform/resolvers/joi';
// import { addUserToServer, loginInServer } from './UserApi';
// import { useDispatch } from 'react-redux';
// import { saveUserLoginInState } from './userSlice';
// import { Link, useNavigate } from 'react-router-dom';

// import loginBG from './images/Login.jpeg';

// //mui
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';

// const schema = Joi.object({

//     email: Joi.string().email({ tlds: { allow: false } }).required().messages({
//         'string.email': 'Invalid email address',
//         'string.empty': 'Email is required',
//     }),
//     userPwd: Joi.string().min(6).max(9).required().messages({
//         'string.min': 'Password must be at least 6 characters',
//         'string.max': 'Password must be less than 10 characters',
//         'string.empty': 'Password is required',
//     }),
//     userName: Joi.string().required().message("שם הוא שדה חובה")
// });

// const SignUp = () => {
//     const [error, setError] = useState('');

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [moveToAddUser, setMoveToAddUser] = useState(false);

//     const { register, handleSubmit, formState: { errors } } = useForm({
//         resolver: joiResolver(schema),
//     });

//     const onSubmit = async (data) => {
//         console.log('Form data:', data);  // Debug log
//         try {
//             const response = await addUserToServer(data);
//             dispatch(saveUserLoginInState(response.data));
//             console.log('User registered successfully:', response);
//             setTimeout(() => { navigate('/allSweets') }, 2000);
//         } catch (error) {
//             if (error.response.request.status === 409 && error.response.data.type === "add user error") {
//                 console.log("יש משתמש עם אימייל זהה");
//             }
//             else if (error.response.request.status === 403 && error.response.data.type === "validate error") {
//                 console.log("אחד מהשדות שהזנת לא מולאו כראוי");
//             }
//             else {
//                 console.error('Failed to register:', error);
//                 setError('Registration failed. Please try again.');
//             }
//         }
//     };

//     function Copyright(props) {
//         return (
//             <Typography variant="body2" color="text.secondary" align="center" {...props}>
//                 {'Copyright © '}
//                 <Link color="inherit" href="http://localhost:3000/allSweets">
//                     Sweetime
//                 </Link>{' '}
//                 {new Date().getFullYear()}
//                 {'.'}
//             </Typography>
//         );
//     }

//     return (
//         <>
//             <Grid container component="main" sx={{ height: '100vh' }}>
//                 <CssBaseline />
//                 {error && <p>{error}</p>}
//                 <Grid
//                     item
//                     xs={false}
//                     sm={4}
//                     md={7}
//                     sx={{
//                         backgroundImage: `url(${loginBG})`,
//                         backgroundRepeat: 'no-repeat',
//                         backgroundColor: (t) =>
//                             t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                     }}
//                 />
//                 <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//                     <Box
//                         sx={{
//                             my: 8,
//                             mx: 4,
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                         }}
//                     >
//                         <Avatar sx={{ m: 1, bgcolor: '#CC2222' }}>
//                             <LockOutlinedIcon />
//                         </Avatar>
//                         <Typography component="h1" variant="h5">
//                             הירשם
//                         </Typography>
//                         <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
//                             <TextField
//                                 {...register('userName')}
//                                 label=" שם משתמש"
//                                 variant="outlined"
//                                 fullWidth
//                                 error={!!errors.userName}
//                                 helperText={errors.userName ? errors.userName.message : ''}
//                                 margin="normal"
//                                 sx={{ color: '#CC2222' }}
//                             />
//                             <TextField
//                                 {...register('email')}
//                                 label=" מייל"
//                                 variant="outlined"
//                                 fullWidth
//                                 error={!!errors.email}
//                                 helperText={errors.email ? errors.email.message : ''}
//                                 margin="normal"
//                                 sx={{ color: '#CC2222' }}
//                             />
//                             <TextField
//                                 {...register('userPwd')}
//                                 label=" סיסמה"
//                                 variant="outlined"
//                                 fullWidth
//                                 error={!!errors.userPwd}
//                                 helperText={errors.userPwd ? errors.userPwd.message : ''}
//                                 margin="normal"
//                                 type="password"

//                             />
//                             <FormControlLabel
//                                 control={<Checkbox value="remember" color="primary" />}
//                                 label="זכור אותי"
//                             />
//                             <Button
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"
//                                 sx={{
//                                     mt: 3, mb: 2, backgroundColor: '#CC2222', '&:hover': {
//                                         backgroundColor: '#ffb6c1',
//                                     }
//                                 }}

//                             >
//                                 הירשם
//                             </Button>
//                         </Box>
//                         <Grid container>
//                             <Grid item>
//                                 <Link to="/login">יש לך כבר חשבון? הכינס כאן</Link>
//                             </Grid>
//                         </Grid>
//                         {moveToAddUser && (
//                             <div>
//                                 <h2>שכחת שם משתמש או סיסמה?</h2>
//                                 <Link to="/signUp">
//                                     <button>הרשמה לאתר</button>
//                                 </Link>
//                             </div>
//                         )}
//                         <Copyright sx={{ mt: 5 }} />
//                     </Box>
//                 </Grid>
//             </Grid>
//         </>
//     );
// };

// export default SignUp;