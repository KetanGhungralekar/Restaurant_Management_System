import React from "react";
import { AddressCard } from "../Cart/AddressCard";
import { AddLocation } from "@mui/icons-material";
import { Button, Card } from "@mui/material";

export const Address = () => {
    return(
        <div className="">
            <h1 className="text-center text-2xl py-10 font-semibold">
              Chose Delivery Address
            </h1>
            <div className="flex flex-wrap justify-center gap-4">
              {[1,1,1,1].map((item) => (
                <AddressCard
                  item={item}
                  showButton={false}
                />
              ))}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocation />
                <div className="space-y-3 text-gray-500">
                  <h1 className=" font-semibold text-lg text-white">
                    Add New Address
                  </h1>
                  <Button
                    onClick={() => {console.log("Add Address")}}
                    variant="outlined"
                    color="primary"
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
    )
}