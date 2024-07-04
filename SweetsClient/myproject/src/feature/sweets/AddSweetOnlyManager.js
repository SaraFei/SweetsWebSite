import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Joi from 'joi';
import { AddSweetToSever } from './SweetsApi';
import { addSweetToClient } from './sweetSlice';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from "@hookform/resolvers/joi";
//mui 
import { TextField, Button, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
//mui input file
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const schema = Joi.object({
    sweetName: Joi.string().pattern(/[A-Za-zא-ת]+/).message('שם מורכב מאותיות בלבד').required(),
    sweetPrice: Joi.number().min(1).message('מחיר חייב להיות גדול מ1 ').required(),
    sweetMenueFactureDate: Joi.required(),
    sweetAmount: Joi.number().required(),
    imgSweet: Joi.string(),
    data:Joi.string(),
    type:Joi.string()
});



const AddSweetOnlyManager = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let admin = useSelector(state => state.userState.currentUser);
    const { handleSubmit, control, formState: { errors } } = useForm(

{        resolver: joiResolver(schema)}
    );

    const handleFileUpload = (event) => {
        let imgUrl = event.target.files[0];
        console.log(imgUrl,"Ggg.")
    }
    const onSubmit = async (data) => {

        console.log("Form submitted with data:", data);
        alert("ho")
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            console.error(error.details);
            return;
        } // Prevent form submission if there are validation errors


        try {

            //לא צריך פה בדיקה שז אכן ללא שגיאות?

            let newSweet = await AddSweetToSever(data, admin.token);
            dispatch(addSweetToClient(newSweet));
            alert('נוסף בהצלחה')
            console.log("the sweet add by successed", newSweet)
            navigate('/allsweets')



        } catch (error) {
            if (error.response.request.status === 409 && error.response.data.type === "add user error") {
                console.log("יש ממתק עם הקוד זהה");
            }
            else if (error.response.request.status === 403 && error.response.data.type === "validate error") {
                console.log("אחד מהשדות שהזנת לא מולאו כראוי");
            }
            else {
                console.log('Failed to register:', error);

            }
        }

    }
    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={12} sm={6}>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="sweetName"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="שם הממתק"
                                            variant="outlined"
                                            fullWidth
                                            sx={{ width: '200px' }}
                                            error={!!errors.sweetName}
                                            helperText={errors.sweetName ? errors.sweetName.message : ''}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="sweetPrice"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="מחיר"
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            sx={{ width: '200px' }}
                                            error={!!errors.sweetPrice}
                                            helperText={errors.sweetPrice ? errors.sweetPrice.message : ''}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="sweetMenueFactureDate"
                                    control={control}
                                    defaultValue={null}
                                    render={({ field }) => (
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>


                                            <DatePicker
                                                {...field}
                                                label="תאריך ייצור"
                                                inputVariant="outlined"
                                                fullWidth
                                                sx={{ width: '200px' }}
                                                error={!!errors.sweetMenueFactureDate}
                                                helperText={errors.sweetMenueFactureDate ? errors.sweetMenueFactureDate.message : ''}

                                            /> </LocalizationProvider>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="sweetAmount"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="כמות"
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            sx={{ width: '200px' }}
                                            error={!!errors.sweetAmount}
                                            helperText={errors.sweetAmount ? errors.sweetAmount.message : ''}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="imgSweet"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label=" תמונה"
                                            variant="outlined"
                                            fullWidth
                                            sx={{ width: '200px' }}
                                            error={!!errors.imgSweet}
                                            helperText={errors.imgSweet ? errors.imgSweet.message : ''}
                                        />
                                    )}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    בחר תמונה        <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={handleFileUpload}
                                    />
                                </Button>
                            </Grid> */}
                            <Grid item xs={12}>
                                <Controller
                                    name="data"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                        multiline
                                            {...field}
                                            rows={4}
                                            label=" פרטים נוספים"
                                            variant="outlined"
                                            fullWidth
                                            sx={{ width: '250px' }}
                                            error={!!errors.data}
                                            helperText={errors.data ? errors.data.message : ''}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="type"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="סוג הממתק"
                                            variant="outlined"
                                            fullWidth
                                            sx={{ width: '200px' }}
                                            error={!!errors.type}
                                            helperText={errors.type ? errors.type.message : ''}
                                        />
                                    )}
                                />
                            </Grid>
      
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    הוסף ממתק
                                </Button>
                            </Grid>
                        </Grid>
                    </LocalizationProvider>
                </form>
            </Grid>
        </Grid>
    );
};

export default AddSweetOnlyManager;
/*import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Joi from 'joi';

import { TextField, Button, Grid } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { AddSweetToSever } from './SweetsApi';
import { addSweetToClient } from './sweetSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const schema = Joi.object({
    sweetName: Joi.string().required(),
    sweetPrice: Joi.number().required(),
    sweetMenueFactureDate: Joi.date(),
    sweetAmount: Joi.number(),
    imgSweet: Joi.string()
});

const resolver = async (data) => {
    try {
        await schema.validateAsync(data, { abortEarly: false });
        return {
            values: data,
            errors: {},
        };
    } catch (validationError) {
        const validationErrors = validationError.details.reduce((acc, curr) => {
            acc[curr.path[0]] = { message: curr.message };
            return acc;
        }, {});
        return { values: {}, errors: validationErrors };
    }
};

const AddSweetOnlyManager = () => {
    let dispatch = useDispatch();
    let admin = useSelector(state => state.userState.currentUser);
    let navigate = useNavigate();
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: resolver
    });

    const onSubmit = async (data) => {

        try {
            await schema.validateAsync(data);
            let newSweet = await AddSweetToSever(data, admin.token);
            dispatch(addSweetToClient(newSweet));
            alert('נוסף בהצלחה');
            console.log("the sweet add by successed", newSweet);
            navigate('/allsweets');
        } catch (error) {
            console.error(error.details);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="sweetName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <input {...field} />
                )}
            />
            {errors.sweetName && <p>{errors.sweetName.message}</p>}

            <Controller
                name="sweetPrice"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <input {...field} type="number" />
                )}
            />
            {errors.sweetPrice && <p>{errors.sweetPrice.message}</p>}

            <Controller
                name="sweetMenueFactureDate"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <input {...field} type="date" />
                )}
            />
            {errors.sweetMenueFactureDate && <p>{errors.sweetMenueFactureDate.message}</p>}

            <Controller
                name="sweetAmount"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <input {...field} type="number" />
                )}
            />
            {errors.sweetAmount && <p>{errors.sweetAmount.message}</p>}

            <Controller
                name="imgSweet"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <input {...field} />
                )}
            />
            {errors.imgSweet && <p>{errors.imgSweet.message}</p>}

            <button type="submit">Submit</button>
        </form>
    );
};

export default AddSweetOnlyManager;
*/