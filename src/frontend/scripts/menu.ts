class MenuItem {
    private title: string;
    private description: string | undefined;
    private shortcut: string | undefined;
    private action: () => void;

    public constructor(title: string, action: () => void, description?: string, shortcut?: string) {
        this.title = title;
        this.action = action;
        this.description = description;
        this.shortcut = shortcut;
    }

    public getTitle(): string {
        return this.title;
    }

    public hasDescription(): boolean {
        return !this.description === undefined;
    }

    public getDescription(): string {
        return this.description?? "";
    }

    public fireAction(): void {
        this.action();
    }

    public requiresCtrl(): boolean {
        if(this.shortcut === undefined) {
            return false;
        }
        return this.shortcut.startsWith("CTRL");
    }

    public getKey(): string {
        if(this.shortcut === undefined) {
            return "false";
        }
        return this.shortcut.replace("CTRL ", "");
    }
}

class MenuTab {
    private title: string;
    private menuItems: MenuItem[];

    public constructor(title: string, menuItems: MenuItem[]) {
        this.title = title;
        this.menuItems = menuItems;
    }

    public getTitle(): string {
        return this.title;
    }

    public getMenuItems(): MenuItem[] {
        return this.menuItems;
    }
}

const fileMenu = [
    new MenuItem("read Items", () => {console.log("rItems")}, "read items from the docs json"),
    new MenuItem("quit", () => {console.log("quit")}, "quit the application")
]

const editMenu = [
    new MenuItem("undo", () => {console.log("undo")}, "", "CTRL z"),
    new MenuItem("redo", () => {console.log("redo")}, "", "CTRL y"),
    new MenuItem("cut", () => {console.log("cut")}, "", "CTRL x"),
    new MenuItem("copy", () => {console.log("copy")}, "", "CTRL c"),
    new MenuItem("paste", () => {console.log("paste")}, "", "CTRL v"),
]

const menuTabs = [
    new MenuTab("File", fileMenu),
    new MenuTab("Edit", editMenu),
]

export class Menu {

    private window: Window;
    private menuDOM: HTMLElement;
    private visible: boolean;
    private oldDialog: HTMLElement;

    constructor(window: Window, menuDOM: HTMLElement, template: MenuTab[] = menuTabs) {
        this.window = window;
        this.menuDOM = menuDOM;
        this.visible = false;
        this.oldDialog = null!;
        this.createMenu(template);
    }

    private createMenu(template: MenuTab[]): void {
        template.forEach(menuTab => {
            let container = document.createElement("div");

            let mainItem = document.createElement("span");
            mainItem.textContent = menuTab.getTitle();
            container.appendChild(mainItem);

            let submenuBox = document.createElement("dialog");
            submenuBox.classList.add("hidden");
            container.appendChild(submenuBox);
            this.menuDOM.appendChild(container);

            mainItem.addEventListener("click", () => {
                if(this.visible) {
                   this.visible = false;
                   submenuBox.classList.add("hidden");
                }
                else{
                    this.visible = true;
                    submenuBox.classList.remove("hidden");
                    this.oldDialog = submenuBox;
                }
            });

            mainItem.addEventListener("mouseenter", () => {
                if(!this.visible) return;
                if(this.oldDialog != null){
                    this.oldDialog.classList.add("hidden");
                }
                this.oldDialog = submenuBox;
                submenuBox.classList.remove("hidden");
            })

            this.createSubMenu(menuTab.getMenuItems(), submenuBox);
        })
    }

    private createSubMenu(menuItems: MenuItem[], submenuBox: HTMLElement): void {
        if(menuItems == null) return;
        menuItems.forEach(menu => {
            let submenuItem = document.createElement("span");
            submenuItem.textContent = menu.getTitle();
            submenuItem.addEventListener("click", () => {
                this.visible = false;
                submenuBox.classList.add("hidden");

                menu.fireAction();
            });
            this.window.addEventListener("keydown", (event: KeyboardEvent) => {
                if(menu.requiresCtrl() && !event.ctrlKey) return;
                if(event.key == menu.getKey()) menu.fireAction();
            })
            submenuBox.appendChild(submenuItem);
        })
    }
}