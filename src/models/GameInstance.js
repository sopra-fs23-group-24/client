/**
 * User model
 */
class GameInstance {
    constructor(data = {}) {
        this.id = null;
        this.gamePin = null;
        this.status = null;
        this.currentQuestion = null;
        Object.assign(this, data);
    }
}

export default GameInstance;