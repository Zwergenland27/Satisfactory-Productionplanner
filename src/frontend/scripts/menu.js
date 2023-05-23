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
        label: 'window',
        role: 'windowMenu'
    }
]

module.exports = class Menu {

    #menuDOM
    #visible = false
    #oldDialog

    constructor(menuDOM, template = menuTemplate) {
        this.#menuDOM = menuDOM
        this.#createMenu(template)
    }

    #createMenu(template) {
        template.forEach(mainMenu => {
            let mainItem = document.createElement('span')
            mainItem.textContent = mainMenu.label
            this.#menuDOM.appendChild(mainItem)

            let submenuBox = document.createElement('dialog')
            submenuBox.classList.add('hidden')
            this.#menuDOM.appendChild(submenuBox)

            mainItem.addEventListener('click', () => {
                if(this.#visible) {
                   this.#visible = false
                   submenuBox.classList.add('hidden')
                }
                else{
                    this.#visible = true
                    submenuBox.classList.remove('hidden')
                }
            });

            mainItem.addEventListener('mouseenter', () => {
                if(!this.#visible) return
                if(this.#oldDialog != null){
                    this.#oldDialog.classList.add('hidden')
                }
                this.#oldDialog = submenuBox
                submenuBox.classList.remove('hidden')
            })

            this.#createSubMenu(mainMenu.submenu, submenuBox)
        })
    }

    #createSubMenu(menuItems, submenuBox) {
        if(menuItems == null) return;
        menuItems.forEach(menu => {
            let submenuItem = document.createElement('span')
            submenuItem.textContent = menu.role
            submenuBox.appendChild(submenuItem)
        })
    }
    addHandler(menuItem, handlerFunction) {

    }
}