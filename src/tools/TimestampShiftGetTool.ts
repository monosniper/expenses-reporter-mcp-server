import {MCPTool, MCPInput, logger} from "mcp-framework";
import Api from "../http/api.js";
import {z} from "zod";

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
}).strict()

class TimestampShiftGetTool extends MCPTool {
	name = "timestamp_shift_get";
	description = `
		Returns a UTC timestamp (seconds) or a range of timestamps.

        **Modes:**
        1. **Absolute date/time** — use \`year\`, \`month\`, \`day\`, \`hours\`, \`minutes\`, \`seconds\`
           as exact values. Missing parts default to current UTC.
           - Example: \`year=2025&month=6&day=20&hours=18\` → 2025-06-20 18:00:00 UTC
           - Example: \`hours=16&minutes=30\` → today at 16:30:00 UTC

        2. **Relative shift** — use \`shift_years\`, \`shift_months\`, \`shift_weeks\`,
           \`shift_days\`, \`shift_hours\`, \`shift_minutes\`, \`shift_seconds\`
           as offsets from the base datetime. Values can be negative.
           - Example: \`shift_days=1&shift_hours=2\` → now + 1 day + 2 hours
           - Example: \`shift_minutes=-30\` → now - 30 minutes
           - Example: \`year=2025&month=6&day=20&hours=18&shift_days=2\`
             → 2025-06-20 18:00:00 UTC + 2 days

        3. **Range mode** — to request start and end of a day (00:00:00–23:59:59)
           or another period. Use \`range=true\` together with absolute or relative
           params. The response will contain \`from\` and \`to\`.
           - Example: \`shift_days=1&range=true\` → timestamps for 00:00:00 and 23:59:59 of tomorrow UTC
           - Example: \`year=2025&month=6&day=20&range=true\` → timestamps for 00:00:00 and 23:59:59 of 2025-06-20 UTC

        **Important rule:** absolutely **all timestamp generation, parsing,
        calculation, or conversion must use this endpoint**.
        The AI should **never** create or manipulate timestamps directly,
        but always rely on this tool in every case where a timestamp is needed.
        For the current date, specify \`shift_days=0\`, for tomorrow — \`shift_days=1\`,
        for other shifts — the corresponding number.
        Do not calculate timestamps yourself and do not use built-in time functions.
        Always get them through the tool.
	`.trim();
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
