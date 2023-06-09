export enum ItemType {
    SOLID = "SOLID",
    FLUID = "FLUID"
}
export class Item {
        private name
        private type

        /**
         * 
         * @param name The name of the item (for example coal, iron ore, etc...)
         * @param type The type of the item
         */
        constructor(name: string, type: ItemType) {
            name = name.trim();
            if(name.length == 0) throw new Error("Invalid name");
            this.name = name;

            if(type != ItemType.SOLID && type != ItemType.FLUID) throw new Error("Invalid resource type");
            this.type = type;
        }

        /**
         * 
         * @returns The name of the item
         */
        getName(): string {
            return this.name;
        }

        /**
         * 
         * @returns the type of the item
         */
        getType(): ItemType {
            return this.type;
        }
 }