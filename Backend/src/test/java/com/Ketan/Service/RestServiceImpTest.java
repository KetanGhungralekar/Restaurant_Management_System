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

    @Test
    void testCreateRestaurant() {
        // Arrange: Mock input data
        CreateRestaurantreq req = new CreateRestaurantreq();
        Address address = new Address();
        address.setStreetAddress("123 Test Street");
        address.setCity("Test City");
        address.setPincode("123456");
        req.setAddress(address);
        req.setCuisineType("Italian");
        req.setDescription("A cozy Italian restaurant");
        req.setName("Test Restaurant");
        req.setOpeningTime("9:00 AM - 10:00 PM");

        User user = new User();
        user.setId(1L);
        user.setFullname("Test User");

        Address savedAddress = new Address();
        savedAddress.setId(1L);
        savedAddress.setStreetAddress("123 Test Street");
        savedAddress.setCity("Test City");
        savedAddress.setPincode("123456");

        Restaurant savedRestaurant = new Restaurant();
        savedRestaurant.setId(1L);
        savedRestaurant.setAddress(savedAddress);
        savedRestaurant.setContactInformation(req.getContactInformation());
        savedRestaurant.setCuisineType(req.getCuisineType());
        savedRestaurant.setDescription(req.getDescription());
        savedRestaurant.setName(req.getName());
        savedRestaurant.setOpening_hours(req.getOpeningTime());
        savedRestaurant.setImages(req.getImages());
        savedRestaurant.setRegistrationdate(LocalDateTime.now());
        savedRestaurant.setOwner(user);
        savedRestaurant.setOpen(true);

        // Mock repository behaviors
        when(addressRepo.save(any(Address.class))).thenReturn(savedAddress);
        when(restaurantRepository.save(any(Restaurant.class))).thenReturn(savedRestaurant);

        // Act: Call the method under test
        Restaurant result = restaurantService.CreateRestaurant(req, user);

        // Assert: Validate the result
        assertNotNull(result);
        assertEquals(savedRestaurant.getId(), result.getId());
        assertEquals(req.getName(), result.getName());
        assertEquals(req.getCuisineType(), result.getCuisineType());
        assertEquals(req.getDescription(), result.getDescription());
        assertEquals(savedAddress, result.getAddress());
        assertEquals(user, result.getOwner());
        assertTrue(result.isOpen());

        // Verify interactions with mocked dependencies
        verify(addressRepo, times(1)).save(any(Address.class));
        verify(restaurantRepository, times(1)).save(any(Restaurant.class));
    }
}
