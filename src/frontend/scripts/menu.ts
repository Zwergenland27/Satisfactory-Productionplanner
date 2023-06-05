const menuTemplate = [
    {
        label: "File",
        submenu: [
            {role: "quit"}
        ]
    },
    {
        label: "Edit",
        submenu: [
          { role: "undo" },
          { role: "redo" },
          { type: "separator" },
          { role: "cut" },
          { role: "copy" },
          { role: "paste" }
        ]
    },
    {
        label: "window",
        role: "windowMenu"
    }
]

export class Menu {

    private menuDOM: HTMLElement;
    private visible: boolean;
    private oldDialog: HTMLElement;

    constructor(menuDOM: HTMLElement, template = menuTemplate) {
        this.menuDOM = menuDOM;
        this.visible = false;
        this.oldDialog = null!;
        this.createMenu(template);
    }

    //TODO: better class for template (dont use any?)
    private createMenu(template: any[]): void {
        template.forEach(mainMenu => {
            let container = document.createElement("div");

            let mainItem = document.createElement("span");
            mainItem.textContent = mainMenu.label;
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

            this.createSubMenu(mainMenu.submenu, submenuBox);
        })
    }

    private createSubMenu(menuItems: any[], submenuBox: HTMLElement): void {
        if(menuItems == null) return;
        menuItems.forEach(menu => {
            let submenuItem = document.createElement("span");
            submenuItem.textContent = menu.role;
            submenuBox.appendChild(submenuItem);
        })
    }
}