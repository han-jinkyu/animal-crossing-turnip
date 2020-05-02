import DayOfWeek from "./DayOfWeek";

/**
 * 테이블 행 클래스
 */
class TableRow {
    /**
     * 생성자
     * @param {string} name 이름
     * @param {Array} prices Price 배열
     */
    constructor(name, prices) {
        this.name = name;
        this.prices = prices;
    }

    /**
     * 데이터 사이즈를 반환한다 deprecated
     */
    size() {
        return this.prices.length;
    }

    /**
     * 
     * @param {number} index 
     */
    priceAt(index) {
        return this.prices[index];
    }

    /**
     * 현재 테이블 행이 유저 가격과 비교했을 때 나올 가능성이 있는지 확인한다
     * @param {Array} userPrices 유저 가격 정보 배열
     */
    isBetweenPrices(userPrices) {
        for (let dayOfWeek = 0; dayOfWeek < DayOfWeek.AllDayLength; dayOfWeek++) {
            let userPriceNum = userPrices[dayOfWeek];
            if (userPriceNum === 0) {
                continue;
            }

            let dayOfWeekPrice = this.prices[dayOfWeek];
            if (userPriceNum < dayOfWeekPrice.min || 
                dayOfWeekPrice.max < userPriceNum) {
                return false;
            }
        }
        return true;
    }
}

export default TableRow;
