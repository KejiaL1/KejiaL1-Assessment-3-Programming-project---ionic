import { Component } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, 
  IonCardHeader, IonCardTitle, IonCardContent, IonButton, 
  IonIcon, AlertController, IonList, IonLabel, IonItem, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { helpCircle } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonButtons, IonItem, IonLabel, IonList, 
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
    IonCardHeader, IonCardTitle, IonCardContent, IonButton,
    IonIcon
  ]
})
export class Tab3Page {
  constructor(private alertController: AlertController) {
    addIcons({ helpCircle });
  }

  async openHelp() {
    const alert = await this.alertController.create({
      header: 'Help',
      message: 'This page explains our privacy policy and security measures for the inventory data.',
      buttons: ['OK']
    });
    await alert.present();
  }
}