export class Resource {
        static SOLID: string = 'SOLID'
        static FLUID: string = 'FLUID'

        private name
        private type

        constructor(name: string, type: string) {
            this.name = name

            if(type != Resource.SOLID && type != Resource.FLUID) throw new Error("Invalid resource type")
            this.type = type
        }

        getName(): string {
            return this.name
        }

        getType(): string {
            return this.type
        }
 }