import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'
import { 
  lockClosed,
  informationCircle,
  warning, 
  shieldCheckmark,
  checkmarkCircle,
  alertCircle,
  listOutline,
  hardwareChipOutline,
  layersOutline, 
  constructOutline,
  gridOutline,
  shirtOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet]
})
export class AppComponent {
  constructor() {
    addIcons({ 
      'lock-closed': lockClosed,
      'information-circle': informationCircle,
      'warning': warning,
      'shield-checkmark': shieldCheckmark,
      'checkmark-circle': checkmarkCircle,
      'alert-circle': alertCircle,
      'list-outline': listOutline,
      'hardware-chip-outline': hardwareChipOutline,
      'construct-outline': constructOutline,
      'grid-outline': gridOutline,
      'shirt-outline': shirtOutline,
      'layers-outline': layersOutline
    });
  }
}