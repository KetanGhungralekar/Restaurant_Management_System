package com.Ketan.Request;

import com.Ketan.model.Address;

import lombok.Data;

@Data
public class CreateOrderreq {
    private Long restaurantid;
    private Address deliveryAddress;
}
