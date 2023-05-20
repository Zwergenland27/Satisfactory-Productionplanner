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
module.exports.menuTemplate = menuTemplate