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

                DashboardStatDTO.builder()
                        .label("Reuniones este mes")
                        .value("12")
                        .detail("+2 respecto al mes anterior")
                        .build(),

                DashboardStatDTO.builder()
                        .label("Horas reunido")
                        .value("8.5 h")
                        .detail("Este mes")
                        .build(),

                DashboardStatDTO.builder()
                        .label("Participantes")
                        .value("86")
                        .detail("+18% respecto al mes anterior")
                        .build(),

                DashboardStatDTO.builder()
                        .label("Próxima reunión")
                        .value("Hoy")
                        .detail("En 35 minutos")
                        .build()
        );

        MeetingDTO nextMeeting = MeetingDTO.builder()
                .id("m1")
                .title("Daily de desarrollo")
                .startAt("2026-09-21T17:00:00Z")
                .durationMinutes(30)
                .participants(5)
                .status("scheduled")
                .build();

        List<MeetingDTO> upcoming = Arrays.asList(

                MeetingDTO.builder()
                        .id("m2")
                        .title("Revisión del proyecto")
                        .startAt("2026-09-22T15:00:00Z")
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