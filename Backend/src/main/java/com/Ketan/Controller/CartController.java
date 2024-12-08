package com.Ketan.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Ketan.Request.AddCartitemreq;
import com.Ketan.Request.UpdateCartRequest;
import com.Ketan.Service.CartService;
import com.Ketan.Service.UserService;
import com.Ketan.model.User;

@RestController
@RequestMapping("/api")
public class CartController {
    @Autowired
    private CartService cartService;
    @Autowired
    private UserService userService;

    @PostMapping("/cart-item/add")
    public ResponseEntity<?> addCartitem(@RequestBody AddCartitemreq req, @RequestHeader("Authorization") String jwt){
        try {
            return new ResponseEntity<>(cartService.addCartItems(req, jwt), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/cart-item/update")
    public ResponseEntity<?> updateCartitem(@RequestBody UpdateCartRequest req, @RequestHeader("Authorization") String jwt){
        try {
            return new ResponseEntity<>(cartService.updateCartItems(req.getCartitemId(),req.getQuantity()), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Cart item not found");
        }
    }
    @DeleteMapping("/cart-item/remove/{cartitemId}")
    public ResponseEntity<?> removeCartitem(@PathVariable Long cartitemId, @RequestHeader("Authorization") String jwt){
        try {
            return new ResponseEntity<>(cartService.removeCartItems(cartitemId, jwt), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/cart/clear/{cartid}")
    public ResponseEntity<?> clearCart(@PathVariable Long cartid, @RequestHeader("Authorization") String jwt){
        try {
            return new ResponseEntity<>(cartService.clearCart(cartid), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/cart")
    public ResponseEntity<?> getCart(@RequestHeader("Authorization") String jwt){
        try {
            User user = userService.FindUserByJwt(jwt);
            return new ResponseEntity<>(cartService.getCartByUser(user.getId()), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
