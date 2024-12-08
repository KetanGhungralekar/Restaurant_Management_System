package com.Ketan.Service;

import com.Ketan.Request.AddCartitemreq;
import com.Ketan.model.Cart;
import com.Ketan.model.CartItems;

public interface CartService {
    public CartItems addCartItems(AddCartitemreq req, String jwt) throws Exception;
    public CartItems updateCartItems(Long cartitemId,Long quantity) throws Exception;
    public Cart removeCartItems(Long cartitemId,String jwt) throws Exception;
    public Long getCartTotal(Cart cart) throws Exception;
    public Cart getCart(Long id) throws Exception;
    public Cart getCartByUser(Long Userid) throws Exception;
    public Cart clearCart(Long cartid) throws Exception;
}
