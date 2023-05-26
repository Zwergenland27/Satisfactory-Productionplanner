module.exports = class Resource {
        static SOLID = 'SOLID'
        static FLUID = 'FLUID'

        #name
        #type

        /**
         * 
         * @param {String} name 
         * @param {String} type SOLID | FLUID
         */
        constructor(name, type) {
            this.#name = name

            if(type != Resource.SOLID && type != Resource.FLUID) throw new Error("Invalid resource type")
            this.#type = type
        }

        get name() {
            return this.#name
        }

        get type() {
            return this.#type
        }
 }