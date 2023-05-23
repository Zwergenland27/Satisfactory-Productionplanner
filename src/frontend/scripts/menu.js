const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {role: 'quit'}
        ]
    },
    {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' }
        ]
    },
    {
        role: 'windowMenu'
    }
]

module.exports = class Menu {

    #menuDOM

    constructor(menuDOM, template = menuTemplate) {
        this.#menuDOM = menuDOM
        this.#createMenu(template)
    }

    #createMenu(template) {
        template.forEach(mainMenu => {
            let mainItem = document.createElement('span')
            mainItem.textContent = mainMenu.label
            this.#menuDOM.appendChild(mainItem)
        })
    }
    addHandler(menuItem, handlerFunction) {

    }
}