import { Component, OnInit } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
  IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, 
  IonTextarea, IonToggle, AlertController,
  IonIcon, NavController, IonAlert, IonButtons } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { InventoryItem, Category, StockStatus } from '../models/inventory-item.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { trash, arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  standalone: true,
  imports: [IonButtons, 
    IonHeader, IonToolbar, IonTitle, IonContent, IonList,
    IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
    IonButton, IonTextarea, IonToggle, IonAlert,
    FormsModule, CommonModule, IonIcon
  ]
})
export class UpdatePage implements OnInit {
  item: InventoryItem = {
    item_id: 0,
    item_name: '',
    category: Category.Electronics,
    quantity: 0,
    price: 0,
    supplier_name: '',
    stock_status: StockStatus.InStock,
    featured_item: 0,
    special_note: ''
  };
  
  isDeleteDisabled: boolean = false;
  showDeleteAlert: boolean = false;

  // 删除确认对话框按钮配置
  alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.showDeleteAlert = false;
      }
    },
    {
      text: 'Delete',
      role: 'destructive',
      handler: () => {
        this.deleteItem();
      }
    }
  ];

  categories = Object.values(Category);
  stockStatuses = Object.values(StockStatus);

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private alertController: AlertController,
    public navCtrl: NavController
  ) {
    addIcons({ trash, arrowBack });
  }

  isLoading = true; // 添加加载状态
  
  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.loadItem(name);
      this.isDeleteDisabled = name === 'Laptop'; // 禁用Laptop的删除
    }
  }

  loadItem(name: string) {
    this.inventoryService.getItemByName(name).subscribe({
      next: (data) => {
        this.item = data;
      },
      error: (err) => {
        console.error('Error loading item:', err);
        this.showErrorAlert('Failed to load item');
        this.navCtrl.navigateBack('/tabs/tab1');
      }
    });
  }

  updateItem() {
    this.inventoryService.updateItem(this.item.item_name, this.item).subscribe({
      next: () => {
        this.showSuccessAlert('Item updated successfully!');
        this.navCtrl.navigateBack('/tabs/tab1');
      },
      error: (err) => {
        this.showErrorAlert('Failed to update item');
        console.error('Error updating item:', err);
      }
    });
  }

  confirmDelete() {
    this.showDeleteAlert = true;
  }

  deleteItem() {
    this.inventoryService.deleteItem(this.item.item_name).subscribe({
      next: () => {
        this.showSuccessAlert('Item deleted successfully!');
        this.navCtrl.navigateBack('/tabs/tab1');
      },
      error: (err) => {
        this.showErrorAlert('Failed to delete item');
        console.error('Error deleting item:', err);
      },
      complete: () => {
        this.showDeleteAlert = false;
      }
    });
  }

  private async showSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Success',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  private async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}