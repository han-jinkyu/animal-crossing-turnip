const DAY_MON_AM = 0;
const DAY_MON_PM = 1;
const DAY_TUE_AM = 2;
const DAY_TUE_PM = 3;
const DAY_WED_AM = 4;
const DAY_WED_PM = 5;
const DAY_THU_AM = 6;
const DAY_THU_PM = 7;
const DAY_FRI_AM = 8;
const DAY_FRI_PM = 9;
const DAY_SAT_AM = 10;
const DAY_SAT_PM = 11;
const ALL_DAY_LENGTH = 12;

/**
 * 날짜 Enum
 */
class DayOfWeek {
    static get DayMonAM() { return DAY_MON_AM; }
    static get DayMonPM() { return DAY_MON_PM; }
    static get DayTueAM() { return DAY_TUE_AM; }
    static get DayTuePM() { return DAY_TUE_PM; }
    static get DayWedAM() { return DAY_WED_AM; }
    static get DayWedPM() { return DAY_WED_PM; }
    static get DayThuAM() { return DAY_THU_AM; }
    static get DayThuPM() { return DAY_THU_PM; }
    static get DayFriAM() { return DAY_FRI_AM; }
    static get DayFriPM() { return DAY_FRI_PM; }
    static get DaySatAM() { return DAY_SAT_AM; }
    static get DaySatPM() { return DAY_SAT_PM; }
    static get AllDayLength() { return ALL_DAY_LENGTH; }
}

export default DayOfWeek;
