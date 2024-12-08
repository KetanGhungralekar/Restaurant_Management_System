package com.Ketan.Service;

import com.Ketan.model.User;

public interface UserService {
    public User FindUserByJwt(String jwt) throws Exception;

    public User FindUserByEmail(String email) throws Exception;
}
