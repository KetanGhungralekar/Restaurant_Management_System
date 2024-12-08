package com.Ketan.Request;

import com.fasterxml.jackson.databind.annotation.JsonAppend.Prop;

import lombok.Data;

@Data
public class CreateIngredientsitemreq {
    private String ingredientsname;
    private Long ingredientCategoryId;
    private Long restaurantid;
}
