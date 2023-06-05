import { Building } from "../../satisfactory/building"
import { BuildingView } from "./buildingView"
import { BuildingsPresenter } from "./buildingsPresenter"

export class View {

    private buildingsPresenter: BuildingsPresenter
    private designer: HTMLElement
    private draggedObject

    constructor(buildingsPresenter: BuildingsPresenter) {
        this.buildingsPresenter = buildingsPresenter
        this.designer = null!
        this.draggedObject = null!
    }

    initializeComponents(): void {
        this.buildingsPresenter.getBuildings()
        this.designer = document.getElementById('designer')!
        this.designer.addEventListener('drop',  this.dropHandler.bind(this), true)
        this.designer.addEventListener('dragover', this.dragoverHandler.bind(this))
        document.addEventListener('mouseup', () => {
            BuildingView.stopCreatingConnection()
        })
        document.addEventListener('keydown', (event) => {
            BuildingView.getCurrentlySelected().forEach(selectedBuildingView => {
                selectedBuildingView.keyPress(event)
            })
        })
    }

    addCategory(category: string, buildings: Building[]): void {
        let buildingsSelector: HTMLElement = document.getElementById('buildings')!

        let openCategory: HTMLElement = document.createElement('button')
        openCategory.classList.add('collapsible')
        openCategory.id = `collapsible-${category}`
        openCategory.innerText = category

        let categoryContent: HTMLElement = document.createElement('div')
        categoryContent.classList.add('collapsible-item')
        categoryContent.id = category

        openCategory.addEventListener('click', (event) => {
            this.openTierBuildingsList(event, categoryContent)
        })

        buildings.forEach(building => {
            let container: HTMLElement = document.createElement('a')

            let buildingView: BuildingView = new BuildingView(building.getId(), this.buildingsPresenter, true)
            
            let label: HTMLElement = document.createElement('label')
            label.innerText = building.getName()

            container.appendChild(buildingView.createHTML())
            container.appendChild(label)
            categoryContent.appendChild(container)
        });

        buildingsSelector.appendChild(openCategory)
        buildingsSelector.appendChild(categoryContent)

    }

    private openTierBuildingsList(event: MouseEvent, categoryContent: HTMLElement): void {
        (event.target! as HTMLElement).classList.toggle('opened')
        categoryContent.classList.toggle('opened')
    }

    private dragoverHandler(event: DragEvent): void {
        event.preventDefault()
    }

    private dropHandler(event: DragEvent): void {
        let eventData: String[] = event.dataTransfer!.getData('text').split(';')

        let buildingViewId: number = new Number(eventData[0]) as number
        let buildingId: string = eventData[1] as string
        let offsetX: number = new Number(eventData[2]) as number
        let offsetY: number = new Number(eventData[3]) as number

        let buildingView: BuildingView = this.buildingsPresenter.addOrGetBuildingView(buildingId, buildingViewId)

        let x = (event.pageX - (event.currentTarget! as HTMLElement).offsetLeft) - offsetX
        let y = (event.pageY - (event.currentTarget! as HTMLElement).offsetTop) - offsetY

        let newBuildingBounds = buildingView.getBuildingBounds() ?? buildingView.createHTML()

        buildingView.setPositionX(x)
        buildingView.setPositionY(y)

        this.designer.appendChild(newBuildingBounds)
    }
}