import Price from '../Price';
import TableRow from '../TableRow';
import DayOfWeek from '../DayOfWeek';

/**
 * 표현식
 */
class Expression {

    /**
     * 생성자
     * @param {Array} userPrices 유저가 받은 가격
     * @param {numbers} basePrice 유저가 구매한 가격
     */
    constructor(userPrices, basePrice) {
        this.userPrices = userPrices;   // int array
        this.basePrice = basePrice ? new Price(basePrice, basePrice) : new Price(90, 110);
    }

     /**
     * 무작위 int형 숫자를 생성한다
     * @param {number} min 무작위 숫자 중 포함되는 가장 작은 수
     * @param {number} max 무작위 숫자 중 포함되지 않는 가장 큰 수
     * @returns {number} 무작위 int형 숫자
     */
    static randint(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * 무작위 참/거짓을 생성한다
     * @returns {boolean} 무작위 참/거짓
     */
    static randbool() {
        return Math.floor(Math.random() * 2) === 0 ? false : true;
    }

    /**
     * 무작위 float형 숫자를 생성한다
     * @param {number} min 무작위 숫자 중 포함되는 가장 작은 수
     * @param {number} max 무작위 숫자 중 포함되지 않는 가장 큰 수
     * @returns {number} 무작위 float형 숫자
     */
    static randfloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    /**
     * 테이블에 표시할 데이터행을 만든다
     */
    toTableRow() {
        let min = this.calculate(this.basePrice.min, true);
        let max = this.calculate(this.basePrice.max, false);

        let prices = new Array(DayOfWeek.AllDayLength);
        for (let dayOfWeek = DayOfWeek.DayMonAM; dayOfWeek <= DayOfWeek.DaySatPM; dayOfWeek++) {
            prices[dayOfWeek] = new Price(min[dayOfWeek], max[dayOfWeek]);
        }
        return new TableRow(this.name, prices);
    }
}

export default Expression;
