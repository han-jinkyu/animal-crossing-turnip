import Expression from './Expression';
import DayOfWeek from '../DayOfWeek';

/**
 * 추락형
 */
class ExpressionDesc extends Expression {

    /**
     * 생성자
     * @param {Array} userPrices 유저가 받은 가격
     * @param {number} basePrice 유저가 구매한 가격
     */
    constructor(userPrices, basePrice) {
        super(userPrices, basePrice);
    }

    /**
     * 가격을 계산한다
     * @param {number} basePrice 기본 가격 Price
     * @param {boolean} isMin 최저가격인가?
     */
    calculate(basePrice, isMin) {
        // PATTERN 2: consistently decreasing
        let rate = 0.9;
        let prices = new Array(DayOfWeek.AllDayLength);

        // 초기화
        for (let i = 0; i < DayOfWeek.AllDayLength; i++) {
            prices[i] = this.userPrices[i] ? this.userPrices[i] : 0;
        }

        rate -= isMin ? 0.05 : 0;
        for (let dayOfWeek = DayOfWeek.DayMonAM; dayOfWeek <= DayOfWeek.DaySatPM; dayOfWeek++) {
            prices[dayOfWeek] = prices[dayOfWeek] ? prices[dayOfWeek] : Math.ceil(rate * basePrice);
            rate -= 0.02;
            rate -= isMin ? 0.04 : 0;
        }

        return prices;
    }

    /**
     * 이름
     */
    get name() {
        return "하락형";
    }
}

export default ExpressionDesc;
