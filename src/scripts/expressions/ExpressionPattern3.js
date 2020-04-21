import Expression from "./Expression";
import DayOfWeek from "../DayOfWeek";
import StringUtil from "../StringUtil";

/**
 * 변조3기형
 */
class ExpressionPattern3 extends Expression {

    /**
     * 생성자
     * @param {Array} userPrices 유저가 받은 가격
     * @param {number} peakStart 변조가 시작하는 날짜 (MonPM ~ ThuPM)
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
        // PATTERN 1: decreasing middle, high spike, random low
        let rate = isMin ? 0.85 : 0.9;
        let dayOfWeek = DayOfWeek.DayMonAM;
        let prices = new Array(DayOfWeek.AllDayLength);

        // 초기화
        for (let i = 0; i < DayOfWeek.AllDayLength; i++) {
            prices[i] = this.userPrices[i] ? this.userPrices[i] : 0;
        }

        for (dayOfWeek = DayOfWeek.DayMonAM; dayOfWeek < this.peakStart; dayOfWeek++) {
            prices[dayOfWeek] = Math.ceil(rate * basePrice);
            rate -= 0.03;
            rate -= isMin ? 0.02 : 0;
        }

        prices[dayOfWeek++] = Math.ceil((isMin ? 0.9 : 1.4) * basePrice);
        prices[dayOfWeek++] = Math.ceil((isMin ? 1.4 : 2.0) * basePrice);
        prices[dayOfWeek++] = Math.ceil((isMin ? 2.0 : 6.0) * basePrice);
        prices[dayOfWeek++] = Math.ceil((isMin ? 1.4 : 2.0) * basePrice);
        prices[dayOfWeek++] = Math.ceil((isMin ? 0.9 : 1.4) * basePrice);

        for (; dayOfWeek < DayOfWeek.AllDayLength; dayOfWeek++) {
            prices[dayOfWeek] = Math.ceil((isMin ? 0.4 : 0.9) * basePrice);
        }

        return prices;
    }

    /* 다른 클래스 */
    
    /* 다른 클래스 */

    /**
     * 이름
     */
    get name () {
        let wok = StringUtil.getWeekOfDay(this.peakStart);
        let meridiem = StringUtil.getMeridiem(this.peakStart);
        return `3기형 [${wok}${meridiem}변조]`;
    }
}

export default ExpressionPattern3;
