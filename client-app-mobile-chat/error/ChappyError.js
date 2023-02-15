/**
 * 
 */
export default class ChappyError extends Error {

    constructor(
        message,
        isFatal = false,
        origin = "not_specified",
        date = new Date(),
        name = "ChappyError"
    ) {
        super(message);

        this.isFatal = isFatal;
        this.origin = origin;
        this.name = name;
        this.date = date;
        this.stack = (new Error()).stack;
    }

}