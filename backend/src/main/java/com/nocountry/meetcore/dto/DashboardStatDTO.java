package com.nocountry.meetcore.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardStatDTO {
    private String label;
    private String value;
    private String detail;
}
