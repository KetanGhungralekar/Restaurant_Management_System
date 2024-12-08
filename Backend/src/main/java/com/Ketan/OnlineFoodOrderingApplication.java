package com.Ketan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class OnlineFoodOrderingApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineFoodOrderingApplication.class, args);
	}

}
