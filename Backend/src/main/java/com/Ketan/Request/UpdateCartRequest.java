package com.Ketan.Request;

import lombok.Data;

@Data
public class UpdateCartRequest {
    private Long cartitemId;
    private Long quantity;
}
