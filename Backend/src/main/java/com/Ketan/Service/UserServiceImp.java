package com.Ketan.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Ketan.Config.JwtProvider;
import com.Ketan.Repository.UserRepository;
import com.Ketan.model.User;


@Service
public class UserServiceImp implements UserService{
    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserRepository userRepository;
    @Override
    public User FindUserByJwt(String jwt) throws Exception {
        try{
            String email = jwtProvider.GetEmailfromJwt(jwt);
            User user = userRepository.findByEmail(email);
            if (user == null){
                throw new Exception("User not found");
            }
            return user;
        }
        catch (Exception e){
            throw new Exception("Invalid token");
        }
    }

    @Override
    public User FindUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if (user == null){
            throw new Exception("User not found");
        }
        return user;
    }
    
}
