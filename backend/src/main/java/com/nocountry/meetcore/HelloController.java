package com.nocountry.meetcore;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController 
@RequestMapping("/")
public class HelloController {
    
    @GetMapping
    public String showHello() {
        return "MeetCore app";
    }

}
