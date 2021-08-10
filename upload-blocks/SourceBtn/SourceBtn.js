import { BlockComponent } from '../BlockComponent/BlockComponent.js';

export class SourceBtn extends BlockComponent {

  constructor() {
    super();
    this.initLocalState({
      iconName: 'default',
    });
  }

  initCallback() {
    this.setAttribute('role', 'button');
    this._setType(this._type);
  }

  _setType(type) {
    let types = {
      local: () => {
        this.pub('local', 'iconName', 'local');
        this.onclick = () => {
          this.multiPub('external', {
            modalActive: false,
            currentActivity: 'upload-list',
            modalCaption: 'Selected',
            modalIcon: 'local',
          });
          if (!this.read('external', 'files')?.length) {
            this.pub('external', 'systemTrigger', {});
          } else {
            this.pub('external', 'modalActive', true);
          }
        };
      },
      url: () => {
        this.pub('local', 'iconName', 'url');
        this.onclick = () => {
          this.multiPub('external', {
            currentActivity: 'url',
            modalCaption: 'Import from external URL',
            modalIcon: 'url',
            modalActive: true,
          });
        };
      },
      camera: () => {
        window.setTimeout(() => {
          if (this.blockRegistry['camera-source']) {
            this.pub('local', 'iconName', 'camera');
            this.onclick = () => {
              this.multiPub('external', {
                currentActivity: 'camera',
                modalCaption: 'Camera',
                modalIcon: 'camera',
                modalActive: true,
              });
            };
          } else {
            this.style.display = 'none';
          }
        });
      },
      other: () => {
        this.pub('local', 'iconName', 'dots');
        this.onclick = () => {
          this.multiPub('external', {
            currentActivity: 'external',
            modalCaption: 'Other sources',
            modalIcon: 'dots',
            modalActive: true,
          });
        };
      },
    };
    types[type]();
  }

  set type(val) {
    if (!val) {
      return;
    }
    this._type = val;
  }

}
SourceBtn.template = /*html*/ `
<icon-ui loc="@name: iconName"></icon-ui>
<div .txt></div>
`;
SourceBtn.bindAttributes({
  type: ['property'],
});