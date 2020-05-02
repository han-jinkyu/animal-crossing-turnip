import Expression from './Expression';
import DayOfWeek from '../DayOfWeek';

/**
 * 표현식
 */
class ExpressionWave extends Expression {

    /**
     * 생성자
     * @param {Array} userPrices 유저가 받은 가격
     * @param {number} decPhaseLen1 처음 값이 내려갈 때의 날짜 수 (2 ~ 3)
     * @param {number} hiPhaseLen1 처음 값이 올라갈 때의 날짜 수 (0 ~ 6)
     * @param {number} hiPhaseLen2 두번째 값이 올라갈 때의 날짜 수. (0 ~ 6)
     * @param {number} basePrice 유저가 구매한 가격
     */
    constructor (userPrices, decPhaseLen1, hiPhaseLen1, hiPhaseLen2, basePrice) {
        super(userPrices, basePrice);

        // 하락은 총 5번, 2번에 걸쳐 나타남
        this.decPhaseLen1 = decPhaseLen1;
        this.decPhaseLen2 = 5 - decPhaseLen1;

        // 상승은 총 7번, 3번에 걸쳐 나타남
        this.hiPhaseLen1 = hiPhaseLen1;
        this.hiPhaseLen2 = hiPhaseLen2;
        this.hiPhaseLen3 = 7 - this.hiPhaseLen1 - this.hiPhaseLen2;
    }

    /**
     * 가격을 계산한다
     * @param {number} basePrice 기본 가격 Price
     * @param {boolean} isMin 최저가격인가?
     */
    calculate(basePrice, isMin) {
        let dayOfWeek = DayOfWeek.DayMonAM;
        let prices = new Array(DayOfWeek.AllDayLength);

        // 초기화
        for (let i = 0; i < DayOfWeek.AllDayLength; i++) {
            prices[i] = this.userPrices[i] ? this.userPrices[i] : 0;
        }

        // high phase 1
        for (let i = 0; i < this.hiPhaseLen1; i++)
        {
            prices[dayOfWeek++] = Math.ceil((isMin ? 0.9 : 1.4) * basePrice);
        }

        // decreasing phase 1
        let rate = isMin ? 0.6 : 0.8;
        for (let i = 0; i < this.decPhaseLen1; i++)
        {
            prices[dayOfWeek++] = Math.ceil(rate * basePrice);
            rate -= 0.04;
            rate -= isMin ? 0.06 : 0;
        }

        // high phase 2
        for (let i = 0; i < this.hiPhaseLen2; i++)
        {
            prices[dayOfWeek++] = Math.ceil((isMin ? 0.9 : 1.4) * basePrice);
        }

        // decreasing phase 2
        rate = isMin ? 0.6 : 0.8;
        for (let i = 0; i < this.decPhaseLen2; i++)
        {
            prices[dayOfWeek++] = Math.ceil(rate * basePrice);
            rate -= 0.04;
            rate -= isMin ? 0.06 : 0;
        }

        // high phase 3
        for (let i = 0; i < this.hiPhaseLen3; i++)
        {
            prices[dayOfWeek++] = Math.ceil((isMin ? 0.9 : 1.4) * basePrice);
        }

        return prices;
    }

    /**
     * 이름
     */
    get name() {
        return `파도형 [` +
            `${"⬆️".repeat(this.hiPhaseLen1)}` + 
            `${"⬇️".repeat(this.decPhaseLen1)}` + 
            `${"⬆️".repeat(this.hiPhaseLen2)}` + 
            `${"⬇️".repeat(this.decPhaseLen2)}` +
            `${"⬆️".repeat(this.hiPhaseLen3)}` +
        `]`;
    }
}

export default ExpressionWave;
