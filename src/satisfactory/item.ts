export enum ItemType {
    SOLID = "SOLID",
    FLUID = "FLUID"
}
export class Item {
        private name
        private type

        constructor(name: string, type: ItemType) {
            name = name.trim();
            if(name.length == 0) throw new Error("Invalid name");
            this.name = name;

            if(type != ItemType.SOLID && type != ItemType.FLUID) throw new Error("Invalid resource type");
            this.type = type;
        }

        getName(): string {
            return this.name;
        }

        getType(): ItemType {
            return this.type;
        }
 }