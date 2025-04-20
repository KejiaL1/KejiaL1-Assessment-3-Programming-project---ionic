import { Component } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
  IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, 
  IonTextarea, IonToggle, IonCard, IonCardHeader, IonCardTitle, 
  IonCardContent, AlertController, IonIcon, IonButtons, IonBadge, 
  IonAvatar, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { InventoryService } from '../services/inventory.service';
import { InventoryItem, Category, StockStatus } from '../models/inventory-item.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // 添加 RouterModule 导入
import { addIcons } from 'ionicons';
import { 
  helpCircleOutline, 
  star, 
  addCircleOutline, 
  pricetagOutline, 
  gridOutline, 
  cubeOutline, 
  cashOutline, 
  businessOutline, 
  alertCircleOutline, 
  starOutline, 
  documentTextOutline, 
  saveOutline, 
  list 
} from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    // 添加 RouterModule 到 imports 数组
    RouterModule,
    IonAvatar, IonBadge, IonButtons, IonIcon, 
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonList, IonItem, IonLabel, IonInput, 
    IonSelect, IonSelectOption, IonButton,
    IonTextarea, IonToggle, IonCard, IonCardHeader, 
    IonCardTitle, IonCardContent, IonFab, IonFabButton,
    FormsModule, CommonModule
  ]
})
export class Tab2Page {
  newItem: InventoryItem = {
    item_name: '',
    category: Category.Electronics,
    quantity: 0,
    price: 0,
    supplier_name: '',
    stock_status: StockStatus.InStock,
    featured_item: 0,
    special_note: ''
  };

  categories = Object.values(Category);
  stockStatuses = Object.values(StockStatus);
  featuredItems: InventoryItem[] = [];

  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({
      helpCircleOutline, 
      star, 
      addCircleOutline, 
      pricetagOutline, 
      gridOutline, 
      cubeOutline, 
      cashOutline, 
      businessOutline, 
      alertCircleOutline, 
      starOutline, 
      documentTextOutline, 
      saveOutline, 
      list
    });
    this.loadFeaturedItems();
  }

  loadFeaturedItems() {
    this.inventoryService.getAllItems().subscribe(items => {
      this.featuredItems = items.filter(item => item.featured_item === 1);
    });
  }

  addItem() {
    this.inventoryService.addItem(this.newItem).subscribe({
      next: () => {
        this.router.navigate(['/tabs/tab1']);
        this.resetForm();
      },
      error: error => {
        console.error('Error adding item:', error);
      }
    });
  }

  resetForm() {
    this.newItem = {
      item_name: '',
      category: Category.Electronics,
      quantity: 0,
      price: 0,
      supplier_name: '',
      stock_status: StockStatus.InStock,
      featured_item: 0,
      special_note: ''
    };
  }

  async openHelp() {
    const alert = await this.alertController.create({
      header: 'Help',
      message: 'Fill in all required fields with (*) to add a new product. Items set as recommended will be displayed in the list below.',
      buttons: ['OK']
    });
    await alert.present();
  }
}