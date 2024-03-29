import { BrowserWindow, Event, IpcRenderer, IpcRendererEvent, ipcMain, ipcRenderer } from "electron"
import { Menu } from "./menu"

export class Titlebar {

    private window: Window;
    private ipcRenderer: IpcRenderer

    private minimizeWindow: HTMLElement;
    private maximizeWindow: HTMLElement;
    private unmaximizeWindow: HTMLElement;
    private closeWindow: HTMLElement;

    constructor(window: Window){
        this.window = window;
        this.ipcRenderer = ipcRenderer;
        this.minimizeWindow = null!;
        this.maximizeWindow = null!;
        this.unmaximizeWindow = null!;
        this.closeWindow = null!;
        this.create();
        this.createHandler();
    }

    private createControls(controls: HTMLElement): void {
        this.minimizeWindow = document.createElement("span");
        this.minimizeWindow.id = "window-minimize";
        this.minimizeWindow.innerHTML = "&#xE921;";
        controls.appendChild(this.minimizeWindow);

        this.maximizeWindow = document.createElement("span");
        this.maximizeWindow.id = "window-maximize";
        this.maximizeWindow.innerHTML = "&#xE922;";
        controls.appendChild(this.maximizeWindow);

        this.unmaximizeWindow = document.createElement("span");
        this.unmaximizeWindow.id = "window-unmaximize";
        this.unmaximizeWindow.innerHTML = "&#xE923;";
        this.unmaximizeWindow.hidden = true;
        controls.appendChild(this.unmaximizeWindow);

        this.closeWindow = document.createElement("span");
        this.closeWindow.id = "window-close";
        this.closeWindow.innerHTML = "&#xE8BB;";
        controls.appendChild(this.closeWindow);
    }

    private createMenu(menuDOM: HTMLElement): void {
        let menu = new Menu(this.window, menuDOM);
    }

    private create(): void {
        let nav: HTMLElement = document.getElementById("titlebar")!;

        let menu: HTMLElement = document.createElement("div");
        menu.id = "menu";
        this.createMenu(menu);
        
        let title: HTMLElement = document.createElement("span");
        title.innerText = document.querySelector("title")!.innerText;

        let controls: HTMLElement = document.createElement("div");
        controls.classList.add("controls");
        this.createControls(controls);

        nav.appendChild(menu);
        nav.appendChild(title);
        nav.appendChild(controls);
    }

    private createHandler(): void {
        this.minimizeWindow.addEventListener("click", this.controlHandler.bind(this), false);
        this.maximizeWindow.addEventListener("click", this.controlHandler.bind(this), false);
        this.unmaximizeWindow.addEventListener("click", this.controlHandler.bind(this), false);
        this.closeWindow.addEventListener("click", this.controlHandler.bind(this), false);
        this.ipcRenderer.on("window-control", this.handlemaximize.bind(this));
    }

    private controlHandler(event: MouseEvent): void {
        this.ipcRenderer.send("window-control", (event.target! as HTMLElement).id);
    }

    private handlemaximize(event: IpcRendererEvent, type: string): void {
        switch(type){
            case "window-maximized": this.maximizeWindow.hidden = true; this.unmaximizeWindow.hidden = false; break;
            case "window-unmaximized": this.maximizeWindow.hidden = false; this.unmaximizeWindow.hidden = true; break;
        }
    }

    //has to be executed before new titlebar object created
    static initialize(window: BrowserWindow): void {
        window.on("unmaximize", () => {
            window.webContents.send("window-control", "window-unmaximized");
          })
          window.on("maximize", () => {
            window.webContents.send("window-control", "window-maximized");
          })
        ipcMain.on("window-control", (event, type) => {
          switch(type){
            case "window-minimize": window.minimize(); break;
            case "window-maximize": window.maximize(); break;
            case "window-unmaximize": window.restore(); break;
            case "window-close": window.close(); break;
          }
        })
    }
}