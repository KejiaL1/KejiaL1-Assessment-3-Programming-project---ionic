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
  AlertController, IonButtons, IonText, IonAvatar, IonChip, IonCardSubtitle, IonCardHeader, IonCardTitle, IonRow, IonGrid, IonCardContent, IonCol } from '@ionic/angular/standalone';
import { InventoryService } from '../services/inventory.service';
import { InventoryItem, StockStatus } from '../models/inventory-item.model';
import { addIcons } from 'ionicons';
import { helpCircle, add, cubeOutline, helpCircleOutline, searchOutline, alertCircleOutline, pricetagOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonCol, IonCardContent, IonGrid, IonRow, IonCardTitle, IonCardHeader, IonCardSubtitle, IonChip, IonAvatar, IonButtons, 
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

  isCardView = true;

  constructor(
    private inventoryService: InventoryService,
    private alertController: AlertController
  ) {
    addIcons({cubeOutline,helpCircleOutline,searchOutline,alertCircleOutline,pricetagOutline,add,helpCircle});
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

  getCategoryIcon(category: string): string {
    const icons: {[key: string]: string} = {
      'Electronics': 'hardware-chip-outline',
      'Furniture': 'layers-outline',
      'Clothing': 'shirt-outline',
      'Tools': 'construct-outline',
      'Miscellaneous': 'cube-outline'
    };
    return icons[category] || 'help-outline';
  }

  // 新增分类颜色
  getCategoryColor(category: string): string {
    const colors: {[key: string]: string} = {
      'Electronics': 'tertiary',
      'Furniture': 'secondary',
      'Clothing': 'success',
      'Tools': 'warning',
      'Miscellaneous': 'medium'
    };
    return colors[category] || 'primary';
  }

  // 新增状态图标
  getStatusIcon(status: string): string {
    const icons: {[key: string]: string} = {
      'In Stock': 'checkmark-circle-outline',
      'Low Stock': 'alert-circle-outline',
      'Out of Stock': 'close-circle-outline'
    };
    return icons[status] || 'help-circle-outline';
  }

  // 切换视图模式
  toggleViewMode() {
    this.isCardView = !this.isCardView;
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