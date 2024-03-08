//package com.bala2sm.springbootbala2sm;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        // Configure your user store here (e.g., database authentication)
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .authorizeRequests()
//                .antMatchers("/reservations/**").hasRole("USER")
//                .antMatchers("/admin/**").hasRole("ADMIN")
//                .anyRequest().authenticated()
//                .and()
//                .formLogin()
//                .and()
//                .httpBasic();
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//}

//package com.bala2sm.springbootbala2sm;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.crypto.factory.PasswordEncoderFactories;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//import java.util.Collection;
//
//@Configuration
//public class SecurityConfiguration {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.authorizeHttpRequests(
//                        auth -> auth.requestMatchers("/reservations/**").hasRole("USER")
//                                .requestMatchers("/admin/**").hasRole("ADMIN")
//                                .anyRequest().authenticated()
//                )
//                .formLogin(formLogin -> formLogin
//                        .loginPage("/logIn")
//                        .usernameParameter("userName")
//                        .passwordParameter("password")
//                        //Use in case the admin and user will be redirected to the same page after login
//                        .defaultSuccessUrl("/", true)
//                        .successHandler((request, response, authentication) -> {
//                            // Retrieve the roles of the authenticated user
//                            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
//
//                            // Check if the user has the ADMIN role
//                            if (authorities.stream().anyMatch(auth -> auth.getAuthority().equals("ADMIN"))) {
//                                //modify the directory names based on the front-end
//                                response.sendRedirect("/console"); // Redirect ADMIN users to /console
//                            } else {
//                                response.sendRedirect("/homepage"); // Redirect other users to /homepage
//                            }
//                        })
//                        .permitAll()
//                )
//                .rememberMe(rememberMe -> rememberMe.key("UniqueKey").tokenValiditySeconds(900))
//                .logout(logout -> logout.logoutUrl("/home").permitAll());
//
//
//        return http.build();
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
//    }
//}

package com.bala2sm.springbootbala2sm;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SecurityConfiguration {

    public static String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(password.getBytes());
        byte[] digest = md.digest();
        return bytesToHex(digest);
    }

    private static String bytesToHex(byte[] hash) {
        StringBuilder hexString = new StringBuilder(2 * hash.length);
        for (int i = 0; i < hash.length; i++) {
            String hex = Integer.toHexString(0xff & hash[i]);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
