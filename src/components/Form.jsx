import { useForm } from "react-hook-form"
import { DevTool } from '@hookform/devtools'
import { Button, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FormContainer = () => {

    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const { userid } = useParams();

    const form = useForm({
        defaultValues: {
            firstName: userData?.firstName || '',
            lastName: userData?.lastName || '',
            email: userData?.email || '',
            password: '',
            confirmPassword: '',
        }
    });


    const { register, control, handleSubmit, setValue, formState, watch, reset } = form;
    const { errors } = formState;


    const addNewUser = async (data) => {
        try {
            await axios.post('http://localhost:8000/users', data);
            toast.success("User added successfully !!");
            reset();
        } catch (error) {
            toast.error(error.response.data);
        }
    }

    const updateUser = async (data, id) => {
        try {
            await axios.put(`http://localhost:8000/users/${id}`, data);
            toast.success("User updated successfully !!");
            reset();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const deleteUser = async (id) => {

        const isConfirmed = window.confirm('Are you sure you want to delete this item?');
        if(isConfirmed){
            try {
                await axios.delete(`http://localhost:8000/users/${id}`);
            }
            catch (error) {
                toast.error(error.message);
            }
        }
    }

    const onSubmit = (data) => {
        userid ? updateUser(data, userid) : addNewUser(data);
    }

    const handleBackPage = () => {
        navigate(-1);
    }



    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const resp = await axios.get(`http://localhost:8000/users/${id}`);
                setUserData(resp?.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        userid && fetchData(userid);
    }, [userid])

    useEffect(() => {
        if (Object?.entries?.(userData || {}).length) {
            setValue('firstName', userData.firstName)
            setValue('lastName', userData.lastName)
            setValue('email', userData.email);
        }
    }, [userData])

    return (
        <div>
            <h1>react-hook-form</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <div className="form-control">
                    <label htmlFor='firstName'>FirstName</label>
                    <input
                        type='text'
                        id='firstName'
                        {...register("firstName", {
                            required: {
                                message: 'FirstName is required'
                            }
                        })}
                        value={watch('firstName')}
                    />
                    <p className="error">{errors.firstName?.message}</p>
                </div>

                <div className="form-control">
                    <label htmlFor='lastName'>LastName</label>
                    <input
                        type='text'
                        id='lastName'
                        {...register("lastName", {
                            required: {
                                value: true,
                                message: 'LastName is required'
                            }
                        })}
                    />
                    <p className="error">{errors.firstName?.message}</p>
                </div>

                <div className="form-control">
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is required'
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: 'Invalid email format'
                            }
                        })}
                    />
                    <p className="error">{errors.email?.message}</p>
                </div>

                <div className="form-control">
                    <label htmlFor='password'>Password</label>
                    <input
                        type='text'
                        id='password'
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is must"
                            }
                        })}
                    />
                    <p className="error">{errors.password?.message}</p>
                </div>

                <div className="form-control">
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        type='text'
                        id='confirmPassword'
                        {...register("confirmPassword", {
                            required: {
                                value: true,
                                message: "confirmPassword is must"
                            },
                            validate: (value) => {
                                if (watch('password') != value) {
                                    return "Your passwords do no match";
                                }
                            }
                        })}
                    />
                    <p className="error">{errors.confirmPassword?.message}</p>
                </div>

                <Stack spacing={2} direction={'row'}>
                    <Button type="submit" variant="contained" size="small" >
                        Submit
                    </Button>
                    <Button variant="outlined" size="small" onClick={handleBackPage}>
                        Back
                    </Button>
                </Stack>
            </form>
            <ToastContainer />
            {/* <DevTool control={control} /> */}
        </div>
    )
}

export default FormContainer