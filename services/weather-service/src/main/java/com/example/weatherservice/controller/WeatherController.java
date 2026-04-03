package com.example.weatherservice.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    @GetMapping("/{location}")
    public String getWeather(@PathVariable String location) {
        // In a real app, you'd call an external API like OpenWeatherMap
        return "Weather for " + location + ": Sunny, 25°C";
    }
}
