import DayOfWeek from './DayOfWeek';

/**
 * 문자열 유틸리티 클래스
 */
class StringUtil {

    /**
     * 요일 문자열을 얻는다
     * @param {number} dayOfWeek 요일을 나타내는 숫자
     */
    static getWeekOfDay(dayOfWeek) {
        switch (dayOfWeek) {
            case DayOfWeek.DayMonAM: 
            case DayOfWeek.DayMonPM:
                return "월";
            case DayOfWeek.DayTueAM: 
            case DayOfWeek.DayTuePM:
                return "화";
            case DayOfWeek.DayWedAM: 
            case DayOfWeek.DayWedPM:
                return "수";
            case DayOfWeek.DayThuAM: 
            case DayOfWeek.DayThuPM:
                return "목";
            case DayOfWeek.DayFriAM: 
            case DayOfWeek.DayFriPM:
                return "금";
            case DayOfWeek.DaySatAM: 
            case DayOfWeek.DaySatPM:
                return "토";
            default:
                console.error("not found");
        }
    }

    /**
     * 오전/오후를 나타내는 문자열
     * @param {number} dayOfWeek 요일을 나타내는 숫자
     */
    static getMeridiem(dayOfWeek) {
        return dayOfWeek % 2 === 0 ? "AM" : "PM";
    }
}

export default StringUtil;
