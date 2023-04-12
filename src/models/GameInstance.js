/**
 * User model
 */
class GameInstance {
    constructor(data = {}) {
        this.id = null;
        this.gamePin = null;
        this.status = null;
        Object.assign(this, data);
    }
}
export default GameInstance;