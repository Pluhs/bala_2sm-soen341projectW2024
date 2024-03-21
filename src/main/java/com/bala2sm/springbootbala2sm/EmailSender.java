package com.bala2sm.springbootbala2sm;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailSender {

    @Value("${spring.mail.username}")
    private String from;

    @Autowired
    private JavaMailSender emailSender;

	
    public void sendMail (
    	      String to, String subject, String text) throws Exception{
    	        
    	        SimpleMailMessage message = new SimpleMailMessage(); 
    	        message.setFrom(from);
    	        message.setTo(to); 
    	        message.setSubject(subject); 
    	        message.setText(text);
    	        emailSender.send(message);
    	        
    	    }
}