package com.Ketan.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Ketan.Repository.CartRepository;
import com.Ketan.Repository.CartitemRepo;
import com.Ketan.Repository.Foodrepo;
import com.Ketan.Request.AddCartitemreq;
import com.Ketan.model.Cart;
import com.Ketan.model.CartItems;
import com.Ketan.model.Food;
import com.Ketan.model.User;


//hello
@Service
public class CartServiceImp implements CartService{
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private CartitemRepo cartitemRepo;
    @Autowired
    private FoodService foodService;
    @Override
    public CartItems addCartItems(AddCartitemreq req, String jwt) throws Exception {
        try {
            User user = userService.FindUserByJwt(jwt);
            
            Cart cart = cartRepository.findByCustomerId(user.getId());
            Food food = foodService.getFood(req.getFoodid());
            for (CartItems cartItems : cart.getCartItems()) {
                if(cartItems.getFood().equals(food)){
                    Long quantity = cartItems.getQuantity() + req.getQuantity();
                    return updateCartItems(cartItems.getId(), quantity);
                }
            }
            CartItems cartItems = new CartItems();
            cartItems.setFood(food);
            cartItems.setQuantity(req.getQuantity());
            cartItems.setIngredients(req.getIngredients());
            cartItems.setTotaPrice(food.getPrice() * req.getQuantity());
            cartItems.setCart(cart);
            cart.getCartItems().add(cartItems);
            return cartitemRepo.save(cartItems);
       }
       catch(Exception e){
           throw new Exception("Error in adding cart items");
       }
    }

    @Override
    public CartItems updateCartItems(Long cartitemId, Long quantity) throws Exception {
        try {
            Optional <CartItems> cartItemsoptional = cartitemRepo.findById(cartitemId);
            if(cartItemsoptional.isEmpty()){
                throw new Exception("ddsmksm");
            }
            CartItems cartItems = cartItemsoptional.get();
            cartItems.setQuantity(quantity);
            cartItems.setTotaPrice(cartItems.getFood().getPrice() * quantity);
            return cartitemRepo.save(cartItems);
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            throw new Exception("Error in updating cart items");
        }
    }

    @Override
    public Cart removeCartItems(Long cartitemId, String jwt) throws Exception {
        User user = userService.FindUserByJwt(jwt);
        Cart cart = cartRepository.findByCustomerId(user.getId());
        Optional <CartItems> cartItemsoptional = cartitemRepo.findById(cartitemId);
        if(cartItemsoptional.isEmpty()){
            throw new Exception("Cart item not found");
        }
        CartItems cartItems = cartItemsoptional.get();
        cart.getCartItems().remove(cartItems);
        // cartitemRepo.delete(cartItems);
        return cartRepository.save(cart);
    }

    @Override
    public Long getCartTotal(Cart cart) throws Exception {
        Long Total = 0L;
        for (CartItems cartItems : cart.getCartItems()) {
            Total += cartItems.getTotaPrice();
        }
        return Total;
    }

    @Override
    public Cart getCart(Long id) throws Exception {
        Optional <Cart> cartoptional = cartRepository.findById(id);
        if(cartoptional.isEmpty()){
            throw new Exception("Cart not found");
        }
        Cart cart = cartoptional.get();
        cart.setTotalPrice(getCartTotal(cart));
        return cart;
    }

    @Override
    public Cart getCartByUser(Long userid) throws Exception {
        Optional<Cart> cart = Optional.ofNullable(cartRepository.findByCustomerId(userid));
        if(cart.isEmpty()){
            throw new Exception("Error fetching cart");
        }
        Cart cart1 = cart.get();
        cart1.setTotalPrice(getCartTotal(cart1));
        return cart1;
    }

    @Override
    public Cart clearCart(Long cartid) throws Exception {
        Cart cart = getCart(cartid);
        cart.getCartItems().clear();
        return cartRepository.save(cart);
    }
    
}
