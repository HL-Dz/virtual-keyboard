const engLayout = [
  "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
  "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Delete",
  "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "/", "Enter",
  "Shift", "\\", "z", "x", "c", "v", "b", "n", "m", ".", ",", "?", "↑", "shift",
  "Control", "Meta", "Alt", "Space", "Alt", "Control", "←", "↓", "→"
];

const Keyboard = {
  elements: {
    container: null,
    textBlock: null,
    mainBlock: null,
    keysContainer: null,
    keys: []
  },
  properties: {
    value: '',
    capsLock: false
  },

  init(){
    this.elements.container = document.createElement('div');
    this.elements.mainBlock = document.createElement('div');
    this.elements.textBlock = document.createElement('textarea');
    this.elements.keysContainer = document.createElement('div');

    this.elements.container.classList.add('container');
    this.elements.mainBlock.classList.add('keyboard');
    this.elements.textBlock.classList.add('keyboard__value');
    this.elements.keysContainer.classList.add('keyboard__elems');


    document.body.prepend(this.elements.container);
    this.elements.container.prepend(this.elements.mainBlock);
    this.elements.mainBlock.prepend(this.elements.textBlock);
    this.elements.mainBlock.append(this.elements.keysContainer);
    this.elements.keysContainer.append(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__elem');
  },

  toggleCapsLock(){
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
        if(key.textContent.length == 1) {
          key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
      }
  },

  createKeys(){
    const fragment = document.createDocumentFragment();

    engLayout.forEach(key => {
      const keyElem = document.createElement('button');
      const insertBreak = ['Backspace', 'Delete', 'Enter', "shift"].indexOf(key) !== -1;

      
      keyElem.setAttribute('type', 'button');
      keyElem.classList.add('keyboard__elem');

      switch(key) {
        case 'Backspace':
          keyElem.textContent = 'Backspace';
          keyElem.classList.add('keyboard__elem--big', 'keyboard__elem--other');
          
          keyElem.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value -1);
          });
          break;

        case 'CapsLock':
          keyElem.textContent = 'CapsLock';
          keyElem.classList.add('keyboard__elem--big', 'keyboard__elem--activated', 'keyboard__elem--other');

          keyElem.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElem.classList.toggle('keyboard__elem--active', this.properties.capsLock);
          })

          document.addEventListener('keydown', (e)=> {
            if(e.key === keyElem.textContent) {
              this.toggleCapsLock();
              keyElem.classList.toggle('keyboard__elem--active', this.properties.capsLock);
              keyElem.classList.add('keyboard__elem--active-btn');
            }
          })

          break;

        case 'Enter':
          keyElem.textContent = 'Enter';
          keyElem.classList.add('keyboard__elem--big', 'keyboard__elem--other');

          keyElem.addEventListener('click', () => {
            this.properties.value += '\n';
          })

          break;

        case 'Space':
          keyElem.textContent = '';
          keyElem.classList.add('keyboard__elem--big-extra', 'keyboard__elem--other');

          keyElem.addEventListener('click', () => {
            this.properties.value += ' ';
          })

          break;

        case 'Delete':
          keyElem.textContent = 'Delete';
          keyElem.classList.add('keyboard__elem--other');

          break;

        case 'Tab':
          keyElem.textContent = 'Tab';
          keyElem.classList.add('keyboard__elem--other');

          keyElem.addEventListener('click',  () => {
            this.properties.value += '    ';
          })

          break;
        case 'Shift':
          keyElem.textContent = 'Shift';
          keyElem.classList.add('keyboard__elem--big', 'keyboard__elem--other');

          break;

        case 'Control':
          keyElem.textContent = 'Ctrl';
          keyElem.classList.add('keyboard__elem--middle', 'keyboard__elem--other');

          break;

        case 'Meta':
          keyElem.textContent = 'Win';
          keyElem.classList.add('keyboard__elem--other');
          break;

        case 'Alt':
          keyElem.textContent = 'Alt';
          keyElem.classList.add('keyboard__elem--other');
          break;

        case 'shift':
          keyElem.textContent = 'shift';
          keyElem.classList.add('keyboard__elem--other');
          
          break;

        case '↑':
          keyElem.textContent = '↑';
          keyElem.classList.add('keyboard__elem--other');

          break;

        case '←':
          keyElem.textContent = '←';
          keyElem.classList.add('keyboard__elem--other');

          break;

        case '↓':
          keyElem.textContent = '↓';
          keyElem.classList.add('keyboard__elem--other');

          break;

        case '→':
          keyElem.textContent = '→';
          keyElem.classList.add('keyboard__elem--other');

          break;

        default:
          keyElem.textContent = key.toLowerCase();

          keyElem.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
          })

          break;
      }

      fragment.append(keyElem);

      if(insertBreak) {
        fragment.append(document.createElement('br'));
      }
    });

    return fragment;
  }
};


window.addEventListener('DOMContentLoaded', function () {
  Keyboard.init();
});