package com.Ketan.Request;

import java.util.List;

import lombok.Data;

@Data
public class AddCartitemreq {
    private Long foodid;
    private Long quantity;
    private List <String> ingredients;
}
