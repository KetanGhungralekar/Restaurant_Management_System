import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material"
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useDispatch, useSelector } from "react-redux";
import { update_restaurant_status } from "../../Components/State/Restaurant/Action";
export const RestaurantDetails = () => {
    const {restaurant} = useSelector(store=>store);
    const dispatch = useDispatch();
    const handleRestaurantStatus = () => {
        dispatch(update_restaurant_status({
            Restaurant_id:restaurant.usersRestaurant.id,
            token : localStorage.getItem("token"),
        }
        ));
    }
    return (
        <div className="lg:px-20 px-5">
            <div className="flex justify-evenly items-center">
                <h1 className="text-2xl lg:text-7xl text-center font-bold p-5">{restaurant.usersRestaurant?.name}</h1>
                <div>
                    <Button color={restaurant.usersRestaurant?.open ?"primary":"error"} className="py-[1rem] px-[2rem]" variant="contained" onClick={handleRestaurantStatus} size="large">{restaurant.usersRestaurant?.open ?"Close":"Open"}</Button>
                </div>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title={<span className="text-gray-300">Restaurant</span>}/>
                        <CardContent className="space-y-5">
                            <div className="flex">
                                <p className="w-48">Owner</p>
                                <p>
                                    <span className="pr-5">-</span>
                                    {restaurant.usersRestaurant?.owner?.fullname}
                                </p>
                            </div>
                            <div className="flex">
                                <p className="w-48">CuisineType</p>
                                <p>
                                    <span className="pr-5">-</span>
                                    {restaurant.usersRestaurant?.cuisineType}
                                </p>
                            </div>
                            <div className="flex">
                                <p className="w-48">Opening Hours</p>
                                <p>
                                    <span className="pr-5">-</span>
                                    {restaurant.usersRestaurant?.opening_hours}
                                </p>
                            </div>
                            <div className="flex">
                                <p className="w-48">Status</p>
                                <p>
                                    <span className="pr-5">-</span>
                                    {restaurant.usersRestaurant?.open?<span className="px-5 py-2 rounded-full bg-green-400">
                                        {restaurant.usersRestaurant?.open ?"Opened":"Closed"}
                                    </span>:<span className="px-5 py-2 rounded-full bg-red-500">{
                                        restaurant.usersRestaurant?.open?"Open":"Closed"
                                    }</span>}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Card>
                        <CardHeader title={<span className="text-gray-300">Contact</span>}/>
                        <CardContent className="space-y-5">
                            <div className="flex">
                                <p className="w-48">Mobile</p>
                                <p>
                                    <span className="pr-5">-</span>
                                    { restaurant.usersRestaurant.contactInformation?.phone
                                    }
                                </p>
                            </div>
                            <div className="flex">
                                <p className="w-48">Email</p>
                                <p>
                                    <span className="pr-5">-</span>
                                    {restaurant.usersRestaurant.contactInformation?.email}
                                </p>
                            </div>
                            <div className="flex">
                                <p className="w-48">Social</p>
                                <p>
                                    <div className="flex text-gray-400 items-center pb-3 gap-2">
                                        <span className="pr5">-</span>
                                        <a href="/">
                                        <InstagramIcon sx={{fontSize:"3rem"}}/></a>
                                        <a href="/">
                                        <FacebookIcon sx={{fontSize:"3rem"}}/></a>
                                        <a href="/">
                                        <LinkedInIcon sx={{fontSize:"3rem"}}/></a>
                                        <a href="/">
                                        <TwitterIcon sx={{fontSize:"3rem"}}/></a>
                                    </div>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Card>
                        <CardHeader title={<span className="text-gray-300">Address</span>}/>
                        <CardContent className="space-y-5">
                            <div className="flex">
                                <p className="w-48">Country</p>
                                <p>
                                    <span className="pr-5">-</span>
                                    {restaurant.usersRestaurant.address?.country}
                                </p>
                            </div>
                            <div className="flex">
                                <p className="w-48">City</p>
                                <p>
                                    <span className="pr-5">-</span>
                                    {restaurant.usersRestaurant.address?.city}
                                </p>
                            </div>
                            <div className="flex">
                                <p className="w-48">PostalCode</p>
                                <p>
                                    <span className="pr-5">-</span>
                                    {restaurant.usersRestaurant.address?.pincode}
                                </p>
                            </div>
                            <div className="flex">
                                <p className="w-48">StreetAddress</p>
                                <p>
                                    <span className="pr-5">-</span>
                                    {restaurant.usersRestaurant.address?.streetAddress}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}