package com.nocountry.meetcore.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MeetingDTO {
    private String id;
    private String title;
    private String startAt;
    private int durationMinutes;
    private int participants;
    private String status;
}
