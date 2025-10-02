import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const TimestampShiftGetToolArgs = z.object({
	year: z.number().optional().describe('Year'),
	month: z.number().optional().describe('Month (1-12)'),
	day: z.number().optional().describe('Day'),
	hours: z.number().optional().describe('Hours'),
	minutes: z.number().optional().describe('Minutes'),
	seconds: z.number().optional().describe('Seconds'),
	shift_years: z.number().optional().describe('Shift years'),
	shift_months: z.number().optional().describe('Shift months'),
	shift_weeks: z.number().optional().describe('Shift weeks'),
	shift_days: z.number().optional().describe('Shift days'),
	shift_hours: z.number().optional().describe('Shift hours'),
	shift_minutes: z.number().optional().describe('Shift minutes'),
	shift_seconds: z.number().optional().describe('Shift seconds'),
	range: z.boolean().optional().describe('Return range (start/end of day)')
})

class TimestampShiftGetTool extends MCPTool {
	name = "timestamp_shift_get";
	description = "Получение временной метки с возможностью сдвига даты/времени";
	schema = TimestampShiftGetToolArgs;

	async execute(input: MCPInput<this>) {
		const params: any = {};
		if (input.year !== undefined) params.year = input.year;
		if (input.month !== undefined) params.month = input.month;
		if (input.day !== undefined) params.day = input.day;
		if (input.hours !== undefined) params.hours = input.hours;
		if (input.minutes !== undefined) params.minutes = input.minutes;
		if (input.seconds !== undefined) params.seconds = input.seconds;
		if (input.shift_years !== undefined) params.shift_years = input.shift_years;
		if (input.shift_months !== undefined) params.shift_months = input.shift_months;
		if (input.shift_weeks !== undefined) params.shift_weeks = input.shift_weeks;
		if (input.shift_days !== undefined) params.shift_days = input.shift_days;
		if (input.shift_hours !== undefined) params.shift_hours = input.shift_hours;
		if (input.shift_minutes !== undefined) params.shift_minutes = input.shift_minutes;
		if (input.shift_seconds !== undefined) params.shift_seconds = input.shift_seconds;
		if (input.range !== undefined) params.range = input.range;
		
		return await Api.get('timestamp-shift', params)
	}
}

export default TimestampShiftGetTool;
