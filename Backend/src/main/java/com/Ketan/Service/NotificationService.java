package com.Ketan.Service;

import java.time.Instant;
import java.util.Date;
import java.util.concurrent.ScheduledFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;

import com.Ketan.model.Order;
import com.Ketan.model.User;

@Service
@EnableScheduling
public class NotificationService {

    @Autowired
    private EmailService emailService;

    @Autowired
    private TaskScheduler taskScheduler;

    // Schedule the delivery assignment notification email
    public void scheduleDeliveryAssignmentNotification(User user, Order order) {
        Runnable emailTask = () -> sendDeliveryAssignmentEmail(user, order);

        // Schedule to run 15 minutes after the order is placed
        Instant scheduleTime = Instant.now().plusSeconds(5*60);
        Date scheduledDate = Date.from(scheduleTime);
        System.out.println("Scheduling delivery assignment email for " + user.getFullname() 
                + " at " + scheduledDate);
        ScheduledFuture<?> scheduledTask = taskScheduler.schedule(emailTask, scheduleTime);
    }

    private void sendDeliveryAssignmentEmail(User user, Order order) {
        // Build the email content
        String toEmail = user.getEmail();
        String subject = "Delivery Assigned for Your Order";
        StringBuilder body = new StringBuilder();
        body.append("Dear ").append(user.getFullname()).append(",\n\n")
            .append("A delivery person has been assigned for your order with ID: ")
            .append(order.getId()).append(".\n\n")
            .append("Your order will be delivered soon!\n\nThank you for your patience!");

        // Send the email
        try {
            emailService.sendOrderConfirmationEmail(toEmail, subject, body.toString());
            System.out.println("Delivery assignment email sent successfully.");
        } catch (Exception emailException) {
            System.out.println("Error sending delivery assignment email: " + emailException.getMessage());
        }
    }
}
