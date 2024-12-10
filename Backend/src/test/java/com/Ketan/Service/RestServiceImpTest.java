package com.Ketan.Service;

import com.Ketan.Repository.AddressRepo;
import com.Ketan.Repository.RestaurantRepository;
import com.Ketan.model.Address;
import com.Ketan.model.Restaurant;
import com.Ketan.model.User;
import com.Ketan.Request.CreateRestaurantreq;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RestServiceImpTest {

    @Mock
    private AddressRepo addressRepo;

    @Mock
    private RestaurantRepository restaurantRepository;

    @InjectMocks
    private RestServiceImp restaurantService; // Replace with your actual service class name

    public RestServiceImpTest() {
        MockitoAnnotations.openMocks(this);
    }
    /*
     * we now test restaurant creation usinh junit and mockito 
     * we create restaurent with mock data and see if it secessfully created or not
     */
    @Test
    void testCreateRestaurant() {
        // Arrange: Mock input data
        CreateRestaurantreq req = new CreateRestaurantreq();
        Address address = new Address();

        // Set Address fields
        address.setPincode("282002");
        address.setCity("Agra");
        address.setStreetAddress("123 Address Street");

        // Set request fields
        req.setName("Shah Jahan Restaurant");
        req.setDescription("A cozy Indian restaurant");
        req.setOpeningTime("10:00 AM");
        req.setCuisineType("Indian");
        req.setAddress(address);

        User user = new User();
        user.setId(1L);
        user.setFullname("Shah Jahan");

        // Mock the saved Address
        Address savedAddress = new Address();
        savedAddress.setPincode("282002");
        savedAddress.setStreetAddress("123 Address Street");
        savedAddress.setCity("Agra");
        savedAddress.setId(1L);

        // Mock the saved Restaurant
        Restaurant savedRestaurant = new Restaurant();
        savedRestaurant.setId(1L);
        savedRestaurant.setName(req.getName());
        savedRestaurant.setDescription(req.getDescription());
        savedRestaurant.setCuisineType(req.getCuisineType());
        savedRestaurant.setOpening_hours(req.getOpeningTime());
        savedRestaurant.setAddress(savedAddress);
        savedRestaurant.setOwner(user);
        savedRestaurant.setOpen(true);
        savedRestaurant.setRegistrationdate(LocalDateTime.now());
        savedRestaurant.setContactInformation(req.getContactInformation());
        savedRestaurant.setImages(req.getImages());

        // Mock repository behaviors
        when(addressRepo.save(any(Address.class))).thenReturn(savedAddress);
        when(restaurantRepository.save(any(Restaurant.class))).thenReturn(savedRestaurant);

        // Act: Call the method under test
        Restaurant result = restaurantService.CreateRestaurant(req, user);

        // Assert: Validate the result
        assertEquals(req.getName(), result.getName());
        assertNotNull(result);
        assertTrue(result.isOpen());
        assertEquals(user, result.getOwner());
        assertEquals(req.getDescription(), result.getDescription());
        assertEquals(savedRestaurant.getId(), result.getId());
        assertEquals(req.getCuisineType(), result.getCuisineType());
        assertEquals(savedAddress, result.getAddress());

        // Verify interactions with mocked dependencies
        verify(addressRepo, times(1)).save(any(Address.class));
        verify(restaurantRepository, times(1)).save(any(Restaurant.class));
    }

}
