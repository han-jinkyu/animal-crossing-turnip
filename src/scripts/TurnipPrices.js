import ExpressionWave from './expressions/ExpressionWave';
import ExpressionDesc from './expressions/ExpressionDesc';
import ExpressionPattern3 from './expressions/ExpressionPattern3';
import ExpressionPattern4 from './expressions/ExpressionPattern4';
import DayOfWeek from './DayOfWeek';

/**
 * 무 가격 관리 클래스
 */
class TurnipPrices {
    
    /**
     * Constructor
     */
    constructor() {}

    /**
     * 표현식을 만든다
     */
    createExpressions(userPrices) {
        let expressions = [];

        // 파도형
        for (let decPhaseLen1 = 2; decPhaseLen1 <= 3; decPhaseLen1++) {
            for (let hiPhaseLen1 = 0; hiPhaseLen1 <= 6; hiPhaseLen1++) {
                for (let hiPhaseLen2 = 1; hiPhaseLen2 <= 7 - hiPhaseLen1; hiPhaseLen2++) {
                    expressions.push(
                        new ExpressionWave(userPrices, decPhaseLen1, hiPhaseLen1, hiPhaseLen2, this.basePrice));
                }
            }
        }

        // 추락형
        expressions.push(new ExpressionDesc(userPrices, this.basePrice));

        // 3기형
        for (let dayOfWeek = DayOfWeek.DayMonPM; dayOfWeek <= DayOfWeek.DayThuPM; dayOfWeek++) {
            expressions.push(new ExpressionPattern3(userPrices, dayOfWeek, this.basePrice));
        }

        // 4기형
        for (let dayOfWeek = DayOfWeek.DayMonAM; dayOfWeek <= DayOfWeek.DayThuPM; dayOfWeek++) {
            expressions.push(new ExpressionPattern4(userPrices, dayOfWeek, this.basePrice));
        }

        return expressions;
    }
}

export default TurnipPrices;
