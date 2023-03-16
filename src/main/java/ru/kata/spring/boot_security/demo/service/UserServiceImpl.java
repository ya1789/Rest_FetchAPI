package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;
import ru.kata.spring.boot_security.demo.configs.WebSecurityConfig;


import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {
    private final UserRepository userRepository;
    private PasswordEncoder passwordEncoder;


    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Autowired
    public PasswordEncoder getPasswordEncoder() {
        return passwordEncoder;
    }

    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public void saveUser(User user) {
        if (userRepository.findByEmail(user.getUsername()) == null) {
            userRepository.save( new User(user.getId(), user.getUsername(), user.getFirstname(),
                    user.getLastname(), user.getEmail(), passwordEncoder.encode(user.getPassword()),
                    user.getAge(), user.getRoles()));
        }
    }

    @Override
    public void updateUser(User user) {

        if (passwordEncoder.matches(user.getPassword(), findById(user.getId()).getPassword())) {
            user.setPassword(findById(user.getId()).getPassword());
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        userRepository.save(user);

    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);

    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User findByEmail(String username) {
        return userRepository.findByEmail(username);
    }

    @Override
    @Transactional
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        if (findByEmail(username) == null) {
            throw new UsernameNotFoundException(String.format("User '%s' not found", username));
        }
        return findByEmail(username);
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {
        return roles.stream().map(r -> new SimpleGrantedAuthority(r.getName())).collect(Collectors.toSet());
    }
}
