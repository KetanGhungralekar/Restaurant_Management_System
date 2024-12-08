import React, { useEffect, useState } from "react";
import { Cartitem } from "./Cartitem";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { AddressCard } from "./AddressCard";
import { AddLocation } from "@mui/icons-material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { findCart } from "../State/Cart/Action";
import { createOrder } from "../State/Order/Action";
import { getUser } from "../State/Authentication/Action";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const initialValues = {
  streetAddress: "",
  city: "",
  state: "",
  pincode: "",
};

const validationSchema = Yup.object({
  streetAddress: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  pincode: Yup.string().required("Required"),
});

export const Cart = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleOpenAddressModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { cart, auth } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(token || auth.token));
  }, []);

  const createOrderUsingSelectedAddress = (selectedAddress) => {
    const data = {
      token: localStorage.getItem("token"),
      data: {
        restaurantid: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          city: selectedAddress.city,
          state: selectedAddress.state,
          pincode: selectedAddress.pincode,
          streetAddress: selectedAddress.streetAddress,
        },
      },
    };

    setLoading(true);
    dispatch(createOrder(data)).then(() => {
      setLoading(false);
      setOrderSuccess(true);
      handleClose();
    });
  };

  const handleSubmit = (values) => {
    const data = {
      token: localStorage.getItem("token"),
      data: {
        restaurantid: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          city: values.city,
          state: values.state,
          pincode: values.pincode,
          streetAddress: values.streetAddress,
        },
      },
    };

    setLoading(true);
    dispatch(createOrder(data)).then(() => {
      setLoading(false);
      setOrderSuccess(true);
      handleClose();
    });
  };

  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cart?.cartItems.map((item) => (
            <Cartitem item={item} key={item.id} />
          ))}
          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5 text-xl">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>${cart.cart?.totalPrice}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Delivery Fee</p>
                <p>$21</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Platform Fee</p>
                <p>$5</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>GST and Restaurant Charges</p>
                <p>$10</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-400">
                <p>Total Pay</p>
                <p>${(cart.cart?.totalPrice || 0) + 21 + 5 + 10}</p>
              </div>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center text-2xl py-10 font-semibold">
              Choose Delivery Address
            </h1>
            <div className="flex flex-wrap justify-center gap-5">
              {auth.user?.addresses.map((item) => (
                <AddressCard
                  key={item.id}
                  handleSelectAddress={createOrderUsingSelectedAddress}
                  item={item}
                  showButton={true}
                />
              ))}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocation />
                <div className="space-y-3 text-gray-500">
                  <h1 className="font-semibold text-lg text-white">
                    Add New Address
                  </h1>
                  <Button
                    onClick={handleOpenAddressModal}
                    variant="outlined"
                    color="primary"
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="streetAddress"
                    as={TextField}
                    label="Street Address"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={8}>
                  <Field
                    name="state"
                    as={TextField}
                    label="State"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    name="pincode"
                    as={TextField}
                    label="Pincode"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="city"
                    as={TextField}
                    label="City"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>

      {/* Loading screen */}
      {loading && (
        <Modal open={loading}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <CircularProgress size={60} />
          </Box>
        </Modal>
      )}

      {/* Success screen */}
      {orderSuccess && (
        <Modal open={orderSuccess} onClose={() => setOrderSuccess(false)}>
          <Box sx={{ ...style, textAlign: 'center', backgroundColor: '#e3f2fd', color: '#1e88e5' }}>
            <CheckCircleIcon sx={{ fontSize: 60, color: '#1e88e5' }} />
            <Typography variant="h5" gutterBottom>
              Order Placed Successfully!
            </Typography>
            <Typography variant="body2" sx={{ color: 'blue' }} gutterBottom>
  Thank you for your order. Your items will be delivered soon.
</Typography>

            <Button onClick={() => setOrderSuccess(false)} variant="contained" color="primary">
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
};
