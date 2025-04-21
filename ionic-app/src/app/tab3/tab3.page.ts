/*
 * File name: tab3.page.ts
 * Author: Lehan Zhang
 * Assignment Section: Privacy Page Logic Component
 * Creation Date: April 15, 2025
 * Last Modified: April 20, 2025
 * Version: 1.0.0
 * Description: This is the Privacy Logic component, responsible for writing the privacy page logic and functionality.
 */
// Importing necessary Angular and Ionic components for building the UI and handling alerts
import { Component } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, 
  IonCardHeader, IonCardTitle, IonCardContent, IonButton, 
  IonIcon, AlertController, IonList, IonLabel, IonItem, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { helpCircle, lockClosed, informationCircle, ellipse, warning, shieldCheckmark, checkmarkCircle, alertCircle } from 'ionicons/icons';

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
    addIcons({helpCircle,lockClosed,informationCircle,ellipse,warning,shieldCheckmark,checkmarkCircle,alertCircle});
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