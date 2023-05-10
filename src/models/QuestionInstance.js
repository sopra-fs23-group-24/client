/**
 * User model
 */
class QuestionInstance {
    constructor(data = {}) {
        this.questionId = null;
        this.quizQuestionText = null;
        this.imageToDisplay = null;
        this.storyToDisplay = null;
        this.answerOptions = null;
        this.correctAnswer = null;
        this.questionStatus = null;
        this.answerDisplayType = null;
        Object.assign(this, data);
    }
}
export default QuestionInstance;