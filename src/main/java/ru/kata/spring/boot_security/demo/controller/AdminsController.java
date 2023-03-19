package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;


@Controller
@RequestMapping(value = "/admin")
public class AdminsController {
    private final UserService userService;

    private final RoleService roleService;


    public AdminsController(UserService userService, RoleServiceImpl roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String index(ModelMap model, Principal principal) {
        model.addAttribute("admin", userService.findByEmail(principal.getName()));
        model.addAttribute("users", userService.findAll());
        model.addAttribute("roles", roleService.findAll());
        return "admin";
    }

    @GetMapping("/")
    public String index() {
        return "redirect:/login";
    }
    @GetMapping("/user-create")
    public ModelAndView createUserForm() {
        ModelAndView mav = new ModelAndView("user-create");
        mav.addObject("user", new User());
        mav.addObject("roles", roleService.findAll());
        return mav;
    }

    @PostMapping("/user-create")
    public String createUser(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/user-delete/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }

    @GetMapping("/user-update/{id}")
    public ModelAndView updateUserForm(@ModelAttribute("user") User user, @PathVariable("id") Long id) {
        ModelAndView mav = new ModelAndView("admin");
        mav.addObject("user", userService.findById(id));
        mav.addObject("roles", roleService.findAll());
        return mav;
    }

    @PutMapping("/user-update")
    public String updateUser(@ModelAttribute("user") User user) {
        userService.updateUser(user);
        return "redirect:/admin";
    }
}
