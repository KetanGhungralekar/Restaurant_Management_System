import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material"
import React from "react"
import { Form } from "react-router-dom"
import { OrderTable } from "./OrderTable"
const OrderStatus = [
    {
        label: "Pending",
        value: "pending"
    },
    {
        label: "Completed",
        value: "completed"
    },
    {
        label: "Cancelled",
        value: "cancelled"
    },
    {
        label: "All",
        value: "all"
    }
]
export const Orders = () => {
    const [filterValue, setFilterValue] = React.useState("all")
    const handleFilter = (e) => {
        setFilterValue(e.target.value)
    }
    return (
        <div className="px-2">
            <Card className="px-2">
                <Typography sx={{paddingBottom:"1rem"}} variant="h5">
                    Order Status
                </Typography>
                <FormControl>
                    <RadioGroup onChange={handleFilter} row name='category' value={filterValue || "all"}>
                        {OrderStatus.map((item,i)=><FormControlLabel key={item.label} value={item.value} control={<Radio/>} label={item.label} sx={{color:"gray"}}/>)}
                    </RadioGroup>
                </FormControl>
            </Card>
            <OrderTable/>
        </div>
    )
}