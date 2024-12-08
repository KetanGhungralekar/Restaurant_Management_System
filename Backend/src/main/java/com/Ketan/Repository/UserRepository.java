package com.Ketan.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Ketan.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
    public User findByEmail(String email);
}
