package com.bala2sm.springbootbala2sm.Reservation;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EmailSenderTest {

    @Mock
    private JavaMailSender emailSender;

    @InjectMocks
    private EmailSender emailSenderComponent;

    @Value("${spring.mail.username}")
    private String from;

    @Test
    void sendMailShouldSendCorrectlyFormattedEmail() throws Exception {
        String to = "test@example.com";
        String subject = "Test Subject";
        String text = "Hello, this is a test email.";

        SimpleMailMessage expectedMessage = new SimpleMailMessage();
        expectedMessage.setFrom(from);
        expectedMessage.setTo(to);
        expectedMessage.setSubject(subject);
        expectedMessage.setText(text);

        emailSenderComponent.sendMail(to, subject, text);

        verify(emailSender).send(refEq(expectedMessage));
    }
}
