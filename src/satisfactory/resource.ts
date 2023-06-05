export enum ResourceType {
    SOLID,
    FLUID
}
export class Resource {
        private name
        private type

        constructor(name: string, type: ResourceType) {
            name = name.trim();
            if(name.length == 0) throw new Error("Invalid name");
            this.name = name;

            if(type != ResourceType.SOLID && type != ResourceType.FLUID) throw new Error("Invalid resource type");
            this.type = type;
        }

        getName(): string {
            return this.name;
        }

        getType(): ResourceType {
            return this.type;
        }
 }