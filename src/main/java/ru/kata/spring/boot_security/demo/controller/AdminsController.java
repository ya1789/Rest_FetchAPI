package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;


@RestController
@RequestMapping("api/admin")
public class AdminsController {
    private final UserService userService;

    public AdminsController(UserService userService) {

        this.userService = userService;
    }
    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
    }
    @PostMapping("/users")
    public ResponseEntity<User> add(@RequestBody User user) {
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/users/update/{id}")
    public ResponseEntity<User> update(@RequestBody User user, @PathVariable("id") Long id) {
        userService.updateUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/users/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
//
//    @GetMapping
//    public String index(ModelMap model, Principal principal) {
//        model.addAttribute("admin", userService.findByEmail(principal.getName()));
//        model.addAttribute("users", userService.getAll());
//        model.addAttribute("roles", roleService.getAll());
//        return "admin";
//    }
//
//    @GetMapping("/")
//    public String index() {
//        return "redirect:/login";
//    }
//    @GetMapping("/user-create")
//    public ModelAndView createUserForm() {
//        ModelAndView mav = new ModelAndView("user-create");
//        mav.addObject("user", new User());
//        mav.addObject("roles", roleService.getAll());
//        return mav;
//    }
//
//    @PostMapping("/user-create")
//    public String createUser(@ModelAttribute("user") User user) {
//        userService.saveUser(user);
//        return "redirect:/admin";
//    }
//
//    @DeleteMapping("/user-delete/{id}")
//    public String deleteUser(@PathVariable("id") Long id) {
//        userService.deleteUser(id);
//        return "redirect:/admin";
//    }
//
//    @GetMapping("/user-update/{id}")
//    public ModelAndView updateUserForm(@ModelAttribute("user") User user, @PathVariable("id") Long id) {
//        ModelAndView mav = new ModelAndView("admin");
//        mav.addObject("user", userService.findById(id));
//        mav.addObject("roles", roleService.getAll());
//        return mav;
//    }
//
//    @PutMapping("/user-update")
//    public String updateUser(@ModelAttribute("user") User user) {
//        userService.updateUser(user);
//        return "redirect:/admin";
//    }
}
