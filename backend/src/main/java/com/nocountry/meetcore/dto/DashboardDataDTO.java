package com.nocountry.meetcore.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class DashboardDataDTO {
    private List<DashboardStatDTO> stats;
    private MeetingDTO nextMeeting;
    private List<MeetingDTO> upcomingMeetings;
}
