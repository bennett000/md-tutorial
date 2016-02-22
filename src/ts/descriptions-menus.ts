export const menus = {
  about: {
    label: 'About',
    args: '/about',
    fn: 'go',
    icon: '/img/icons/question-mark.svg',
    tabindex: 900,
    onMenu: 'secondary'
  },
  remove: {
    label: 'Remove',
    args: '',
    fn: 'remove',
    icon: '/img/icons/trash.svg',
    onMenu: 'secondary',
    tabindex: 160,
    toggle: 'hide-remove'
  },
  mailto: {
    label: 'Send',
    args: '',
    fn: 'email',
    icon: '/img/icons/envelope-closed.svg',
    onMenu: 'secondary',
    tabindex: 150,
    toggle: 'hide-email'
  },
  download: {
    label: 'Download',
    args: '',
    fn: 'download',
    icon: '/img/icons/data-transfer-download.svg',
    onMenu: 'secondary',
    tabindex: 140,
    toggle: 'hide-download'
  },
  startNew: {
    label: 'New',
    args: '',
    fn: 'promptNew',
    icon: '/img/icons/bolt.svg',
    onMenu: 'secondary',
    tabindex: 130,
    toggle: 'hide-new'
  },
  load: {
    label: 'Load',
    args: '',
    fn: 'promptLoad',
    icon: '/img/icons/folder.svg',
    onMenu: 'secondary',
    tabindex: 120,
    toggle: 'hide-load'
  },
  saveAs: {
    label: 'Save As',
    args: '',
    fn: 'promptSaveAs',
    icon: '/img/icons/file.svg',
    onMenu: 'secondary',
    tabindex: 110,
    toggle: 'hide-save-as'
  },
  sandbox: {
    label: 'Sandbox',
    args: '/sandbox',
    fn: 'go',
    icon: 'img/icons/pencil.svg',
    tabindex: 100,
    onMenu: 'primary'
  },
  tutorial: {
    label: 'Tutorial',
    args: '/tutorial',
    fn: 'go',
    icon: 'img/icons/location.svg',
    tabindex: 200,
    onMenu: 'primary'
  },
  reference: {
    label: 'Reference',
    args: '/reference',
    fn: 'go',
    icon: 'img/icons/book.svg',
    tabindex: 300,
    onMenu: 'primary'
  }
};
