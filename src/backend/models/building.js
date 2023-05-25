module.exports = class Building {
    #name
    #width
    #height

    constructor(name, width = 100, height = 50) {
        this.#name = name
        this.#width = width
        this.#height = height
    }

    get name() {
        return this.#name
    }

    get width () {
        return this.#width
    }
    
    get height() {
        return this.#height
    }
}