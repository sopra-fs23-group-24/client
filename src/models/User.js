/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.name = null;
    this.username = null;
    this.token = null;
    this.status = null;
    this.playerId = null;
    this.gamePin = null;
    this.isHost = false;
    this.score = null;
    Object.assign(this, data);
  }
}
export default User;
