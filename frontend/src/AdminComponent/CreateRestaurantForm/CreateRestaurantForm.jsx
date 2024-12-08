import { AddPhotoAlternate, Close } from "@mui/icons-material"
import { Button, CircularProgress, Grid, IconButton, TextField } from "@mui/material"
import { Formik, useFormik } from "formik"
import { useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { UploadImageC } from "../utils/UploadtoCloudnary";
import { useDispatch } from "react-redux";
import { create_restaurant } from "../../Components/State/Restaurant/Action";
import { useNavigate } from "react-router-dom";

const initialValues = {
    name: "",
    description: "",
    cuisineType: "",
    streetaddress: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    country: "",
    email: "",
    mobile: "",
    twitter: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    openingHours: "Mon-Sun 9:00am-9:00pm",
    images: []
}

export const CreateRestaurantForm = () => {
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            const data = {
                description: values.description,
                name: values.name,
                cuisineType: values.cuisineType,
                address:{
                    streetAddress: values.streetaddress,
                    city: values.city,
                    state: values.stateProvince,
                    pinCode: values.postalCode,
                    country: values.country
                },
                contactInformation:{
                    email: values.email,
                    phone: values.mobile,
                    twitter: values.twitter,
                    instagram: values.instagram,
                },
                images: values.images,
                openingTime: values.openingHours
            }
            console.log(data)
            const reqData = {
                data : data,
                token: token
            }
            dispatch(create_restaurant(reqData))
        }
    })
    const [uploadImage, setUploadImage] = useState(false)
    
    const handleImageInput = async(e) => {
        const file = e.target.files[0]
        setUploadImage(true)
        const image = await UploadImageC(file)
        // UploadImage(file).then((url) => {
        //     formik.setFieldValue("images", [...formik.values.images, url])
        //     setUploadImage(false)
        // })
        formik.setFieldValue("images", [...formik.values.images, image])
        setUploadImage(false)
    }

    const handleRemoveImage = (index) => {
        const uploadImages = formik.values.images.filter((item, i) => i !== index)
        formik.setFieldValue("images", uploadImages)
    }

    return (
        <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
            <div className="lg:max-w-4xl">
            <h1 className="font-bold text-center py-2">
                Add New Restaurant
            </h1>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <Grid container spacing={2}>
                    <Grid className="flex flex-wrap gap-5" item xs={12}>
                        <input
                            accept="image/*"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={handleImageInput}
                            type="file"
                        />
                        <label className="relative" htmlFor="fileInput">
                            <span className="w-24 h-24 cursor-pointer flex items-center justify p-3 border rounded-md border-gray-600">
                                <AddPhotoAlternate className="text-white" />
                            </span>
                            {uploadImage && (
                                <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                                    <CircularProgress />
                                </div>
                            )}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {formik.values.images.map((item, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <img className="w-24 h-24 object-cover" src={item} alt="" />
                                    <IconButton size="small" sx={{ position: "absolute", top: 0, right: 0, outline: "none" }} onClick={() => handleRemoveImage(index)}>
                                        <CloseIcon sx={{fontSize:"1rem"}}/>
                                    </IconButton>
                                </div>
                            ))}
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth id="name" name="name" label="Name" variant="outlined" onChange={formik.handleChange} 
                        value = {formik.values.name}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth id="description" name="description" label="description" variant="outlined" onChange={formik.handleChange} 
                        value = {formik.values.description}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth id="cuisineType" name="cuisineType" label="cuisineType" variant="outlined" onChange={formik.handleChange} 
                        value = {formik.values.cuisineType}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth id="openingHours" name="openingHours" label="openingHours" variant="outlined" onChange={formik.handleChange} 
                        value = {formik.values.openingHours}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth id="streetaddress" name="streetaddress" label="streetaddress" variant="outlined" onChange={formik.handleChange} 
                        value = {formik.values.streetaddress}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth id="city" name="city" label="city" variant="outlined" onChange={formik.handleChange} 
                        value = {formik.values.city}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <TextField fullWidth id="stateProvince" name="stateProvince" label="stateProvince" variant="outlined" onChange={formik.handleChange} 
                        value = {formik.values.stateProvince}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <TextField fullWidth id="postalCode" name="postalCode" label="PostalCode" variant="outlined" onChange={formik.handleChange} 
                        value = {formik.values.postalCode}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <TextField fullWidth id="country" name="country" label="country" variant="outlined" onChange={formik.handleChange} 
                        value = {formik.values.country}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth id="email" name="email" label="Email" variant="outlined" onChange={formik.handleChange} 
                        value = {formik.values.email}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth id="mobile" name="mobile" label="mobile" variant="outlined" onChange={formik.handleChange} 
                        value = {formik.values.mobile}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth id="instagram" name="" label="instagram" variant="outlined" onChange={formik.handleChange} 
                        value = {formik.values.instagram}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth id="twitter" name="twitter" label="Twitter" variant="outlined" onChange={formik.handleChange} 
                        value = {formik.values.twitter}
                        >
                        </TextField>
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" type="submit">
                        Create Restaurant
                </Button>
            </form>
            </div>
        </div>
    )
}
