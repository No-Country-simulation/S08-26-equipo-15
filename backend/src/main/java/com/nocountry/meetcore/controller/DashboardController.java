package com.nocountry.meetcore.controller;

import com.nocountry.meetcore.dto.DashboardDataDTO;
import com.nocountry.meetcore.dto.DashboardStatDTO;
import com.nocountry.meetcore.dto.MeetingDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @GetMapping
    public ResponseEntity<DashboardDataDTO> getDashboardData() {
        
        List<DashboardStatDTO> stats = Arrays.asList(
                DashboardStatDTO.builder().label("Total Meetings").value("12").detail("+2 from last week").build(),
                DashboardStatDTO.builder().label("Upcoming").value("3").detail("Next 7 days").build(),
                DashboardStatDTO.builder().label("Total Time").value("8.5h").detail("This month").build()
        );

        MeetingDTO nextMeeting = MeetingDTO.builder()
                .id("m1")
                .title("Daily Standup")
                .startAt("2024-03-20T10:00:00Z")
                .durationMinutes(30)
                .participants(5)
                .status("scheduled")
                .build();

        List<MeetingDTO> upcoming = Arrays.asList(
                MeetingDTO.builder()
                .id("m2")
                .title("Project Review")
                .startAt("2024-03-21T15:00:00Z")
                .durationMinutes(60)
                .participants(8)
                .status("scheduled")
                .build()
        );

        DashboardDataDTO dashboardData = DashboardDataDTO.builder()
                .stats(stats)
                .nextMeeting(nextMeeting)
                .upcomingMeetings(upcoming)
                .build();

        return ResponseEntity.ok(dashboardData);
    }
}
