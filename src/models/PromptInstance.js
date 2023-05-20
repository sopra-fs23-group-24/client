/**
 * User model
 */
class PromptInstance {
    constructor(data = {}) {
        this.promptId = null;
        this.promptNr = null;
        this.promptType = null;
        this.promptText = null;
        Object.assign(this, data);
    }
}
export default PromptInstance;