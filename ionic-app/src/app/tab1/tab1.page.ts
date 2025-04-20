import { Component, OnInit } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonBadge, 
  IonSearchbar, 
  IonButton, 
  IonIcon,
  IonFab,
  IonFabButton,
  AlertController, IonButtons } from '@ionic/angular/standalone';
import { InventoryService } from '../services/inventory.service';
import { InventoryItem, StockStatus } from '../models/inventory-item.model';
import { addIcons } from 'ionicons';
import { helpCircle, add } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonButtons, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonSearchbar,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class Tab1Page implements OnInit {
  items: InventoryItem[] = [];
  filteredItems: InventoryItem[] = [];
  searchTerm = '';

  constructor(
    private inventoryService: InventoryService,
    private alertController: AlertController
  ) {
    addIcons({ helpCircle, add });
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.inventoryService.getAllItems().subscribe(
      (data) => {
        this.items = data;
        this.filteredItems = [...this.items];
      },
      (error) => {
        console.error('Error loading items:', error);
      }
    );
  }

  searchItems() {
    this.filteredItems = this.items.filter(item => {
      return item.item_name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  getStatusColor(status: StockStatus): string {
    switch(status) {
      case StockStatus.InStock: return 'success';
      case StockStatus.LowStock: return 'warning';
      case StockStatus.OutOfStock: return 'danger';
      default: return 'medium';
    }
  }

  async openHelp() {
    const alert = await this.alertController.create({
      header: 'Help',
      message: 'Search for items by name. Tap an item to view/edit details. Use the + button to add new items.',
      buttons: ['OK']
    });
    await alert.present();
  }
}