import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export const EventCard = () => {
  return (
    <div>
      <Card className=" cursor-pointer" sx={{width:310}}>
        <CardMedia
          sx={{height:250}}
          image="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
        />
        <CardContent>
          <Typography variant="h5">Indian Fast Food</Typography>
          <Typography variant="body2" color="text.secondary">
            50% off on your first order
            </Typography>
        <div>
            <p>{"mumbai"}</p>
            <p className="text-sm text-blue-500">February 14, 2024 12:00 AM</p>
            <p className="text-sm text-red-500">February 15, 2024 12:00 AM</p>
        </div>
        </CardContent>
        {true && <CardActions className="flex justify-center">
            <IconButton>
                <DeleteIcon/>
            </IconButton>
        </CardActions>}
      </Card>
    </div>
  );
};
