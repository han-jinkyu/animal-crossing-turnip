import Expression from "./Expression";
import DayOfWeek from "../DayOfWeek";
import StringUtil from "../StringUtil";

/**
 * 변조4기형
 */
class ExpressionPattern4 extends Expression {

    /**
     * 생성자
     * @param {Array} userPrices 유저가 받은 가격
     * @param {number} peakStart 변조가 시작하는 날짜 (MonAM ~ ThuPM)
     * @param {number} basePrice 유저가 구매한 가격
     */
    constructor(userPrices, peakStart, basePrice) {
        super(userPrices, basePrice);
        this.peakStart = peakStart;
    }

    /**
     * 가격을 계산한다
     * @param {number} basePrice 기본 가격 Price
     * @param {boolean} isMin 최저가격인가?
     */
    calculate(basePrice, isMin) {
        // PATTERN 3: decreasing, spike, decreasing
        let rate = isMin ? 0.85 : 0.9;
        let dayOfWeek = DayOfWeek.DayMonAM;
        let prices = new Array(DayOfWeek.AllDayLength);

        // 초기화
        for (let i = 0; i <= DayOfWeek.DaySatPM; i++) {
            prices[i] = this.userPrices[i] ? this.userPrices[i] : 0;
        }

        // decreasing phase before the peak
        rate = isMin ? 0.4 : 0.9;
        for (dayOfWeek = DayOfWeek.DayMonAM; dayOfWeek < this.peakStart; dayOfWeek++) {
            prices[dayOfWeek] = Math.ceil(rate * basePrice);
            rate -= 0.03;
            rate -= isMin ? 0.02 : 0;
        }

        prices[dayOfWeek++] = Math.ceil((isMin ? 0.9 : 1.4) * basePrice);
        prices[dayOfWeek++] = Math.ceil((isMin ? 0.9 : 1.4) * basePrice);
        rate = isMin ? 1.4 : 2.0;
        prices[dayOfWeek++] = Math.ceil((isMin ? 1.4 : 1.9) * basePrice) - 1;
        prices[dayOfWeek++] = Math.ceil(rate * basePrice);
        prices[dayOfWeek++] = Math.ceil((isMin ? 1.4 : 1.9) * basePrice) - 1;

        // decreasing phase after the peak
        if (dayOfWeek < DayOfWeek.AllDayLength) {
            rate = isMin ? 0.4 : 0.9;
            for (; dayOfWeek < DayOfWeek.AllDayLength; dayOfWeek++) {
                prices[dayOfWeek] = Math.ceil(rate * basePrice);
                rate -= 0.02;
                rate -= isMin ? 0.04 : 0;
            }
        }

        return prices;
    }

    /**
     * 이름
     */
    get name() {
        let wok = StringUtil.getWeekOfDay(this.peakStart);
        let meridiem = StringUtil.getMeridiem(this.peakStart);
        return `4기형 [${wok}${meridiem}변조]`;
    }
}

export default ExpressionPattern4;
