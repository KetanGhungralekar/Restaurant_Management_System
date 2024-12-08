package com.Ketan.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Ketan.model.Address;


public interface AddressRepo extends JpaRepository<Address, Long>{
    Optional<Address> findByCityAndStateAndPincodeAndStreetAddressAndCountry(
        String city, String state, String pincode, String streetAddress, String Country
    );
}
