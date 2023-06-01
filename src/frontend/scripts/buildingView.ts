import { Building } from "../../backend/models/building"
import { BuildingsPresenter } from "./buildingsPresenter"
export class BuildingView {

    private static creatingConnection: Boolean
    private static currentlySelected: BuildingView[]
    
    private building: Building
    private buildingsPresenter: BuildingsPresenter

    private buildingBounds: HTMLElement
    private disableEvents: Boolean
    private positionX: number
    private positionY: number
    private rotation: number

    constructor(buildingId: string, buildingsPresenter: BuildingsPresenter, disableEvents:Boolean = false) {
        this.building = Building.createBuilding(buildingId)
        this.buildingsPresenter = buildingsPresenter
        this.buildingBounds = null!
        this.positionX = 0
        this.positionY = 0
        this.rotation = 0
        this.disableEvents = disableEvents
        BuildingView.creatingConnection = false
        BuildingView.currentlySelected = new Array()
    }

    setPositionX(x: number): void {
        if(x < 0) throw Error('Position must be positive')

        this.positionX = x
        this.buildingBounds.style.left = `${this.positionX}px`
    }

    setPositionY(y: number): void {
        if(y < 0) throw Error('Position must be positive')

        this.positionY = y
        this.buildingBounds.style.top = `${this.positionY}px`
    }

    getBuilding(): Building {
        return this.building
    }

    getBuildingBounds(): HTMLElement {
        return this.buildingBounds
    }

    private rotate(angle: number): void {
        this.rotation += angle
        while(this.rotation >= 360) {
            this.rotation -= 360
        }
        while(this.rotation < 0) {
            this.rotation += 360
        }

        this.buildingBounds.style.transform = `rotate(${this.rotation}deg)`
    }

    private delete(): void {
        this.buildingsPresenter.removeBuildingView(this)
        this.buildingBounds.remove()
    }

    static stopCreatingConnection(): void {
        BuildingView.creatingConnection = false
    }

    static getCurrentlySelected(): BuildingView[] {
        return this.currentlySelected
    }

    createHTML(): HTMLElement {
        let inputs = this.building.getInputs()
        let outputs = this.building.getOutputs()

        this.buildingBounds = document.createElement('div')
        this.buildingBounds.classList.add('building')
        this.buildingBounds.style.width =  this.building.getWidth() * 10 - 2 + 'px'
        this.buildingBounds.style.height =  this.building.getLength() * 10 - 2 + 'px'
        this.buildingBounds.setAttribute('draggable', "true")

        this.buildingBounds.addEventListener('dragstart', (event: DragEvent) => {
            if(BuildingView.creatingConnection) {
                event.preventDefault()
                return
            }
            event.dataTransfer!.setData('text/plain', `${this.building.getNumericId()};${this.building.getId()};${event.offsetX};${event.offsetY}`)
        })
        this.buildingBounds.addEventListener('click', () => {
            if(this.disableEvents) return
            this.buildingBounds.classList.toggle('selected')
            if(this.buildingBounds.classList.contains('selected')) {
                BuildingView.currentlySelected.push(this)
            }else {
                BuildingView.currentlySelected.splice(BuildingView.currentlySelected.indexOf(this), 1)
            }
        })
        this.buildingBounds.addEventListener('mousedown', (event: MouseEvent) => {
            if(this.disableEvents) return
            if(!(event.target! as HTMLElement).classList.contains('interface')) return;
            BuildingView.creatingConnection = true
        })

        let interfacePosition =  (this.building.getWidth() * 10) / (inputs.length + 1)
        inputs.forEach(input => {
            this.buildingBounds.appendChild(this.createInterface(input.getConnectionType(), interfacePosition, 0))
            interfacePosition += this.building.getWidth() * 10 / (inputs.length + 1)
        })

        interfacePosition =  (this.building.getWidth() * 10) / (outputs.length + 1)
        outputs.forEach(output => {
            this.buildingBounds.appendChild(this.createInterface(output.getConnectionType(), interfacePosition, this.building.getLength() * 10 - 2))
            interfacePosition += this.building.getWidth() * 10 / (outputs.length + 1)
        })
        return this.buildingBounds
    }

    keyPress(event: KeyboardEvent): void {
        switch(event.key) {
            case 'r': this.rotate(90); break;
            case 'R' : this.rotate(45); break;
            case 'Delete': this.delete(); break;
        }
    }

    private createInterface(connectionType: string, xPos: number, yPos: number): HTMLElement {
        let buildingInterfaceBounds = document.createElement('div')
        buildingInterfaceBounds.classList.add('interface')
        buildingInterfaceBounds.classList.add(connectionType)
        buildingInterfaceBounds.style.width = '8px'
        buildingInterfaceBounds.style.height = '8px'

        buildingInterfaceBounds.style.left = `${xPos - 5}px`
        buildingInterfaceBounds.style.top = `${yPos - 5}px`

        return buildingInterfaceBounds
    }
}