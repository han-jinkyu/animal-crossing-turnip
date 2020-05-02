/**
 * 가격 정보
 */
class Price {

    /**
     * 생성자
     * @param {number} min 최소 가격
     * @param {number} max 최대 가격
     */
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }

    /**
     * 고정된 가격인가
     */
    isFixed() {
        return this.min === this.max;
    }
}

export default Price;
