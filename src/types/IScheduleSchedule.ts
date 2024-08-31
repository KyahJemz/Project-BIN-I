export interface IScheduleSchedule {
    frequency: "weekly" | "monthly"; 
    interval: number; 
    dayOfWeek?: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"; 
    timeStart: string; 
    daysOfMonth?: number[]; 
    specificDate?: string; 
}