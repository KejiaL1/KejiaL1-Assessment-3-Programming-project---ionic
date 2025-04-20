import { Component } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
  IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, 
  IonTextarea, IonToggle, IonIcon, IonButtons, IonAlert, 
  NavController, AlertController 
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../services/inventory.service';
import { InventoryItem, Category, StockStatus } from '../models/inventory-item.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, 
  createOutline, 
  trashOutline, 
  barcodeOutline, 
  pricetagOutline, 
  gridOutline, 
  cubeOutline, 
  cashOutline, 
  businessOutline, 
  alertCircleOutline, 
  starOutline, 
  documentTextOutline, 
  saveOutline,
  checkmarkCircleOutline,
  closeCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonInput,
    IonSelect, IonSelectOption, IonButton,
    IonTextarea, IonToggle, IonIcon, IonButtons,
    IonAlert, FormsModule, CommonModule
  ]
})
export class UpdatePage {
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

  categories = Object.values(Category);
  stockStatuses = Object.values(StockStatus);
  isDeleteDisabled = false;
  showDeleteAlert = false;
  isLoading = true;

  alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Delete',
      role: 'destructive',
      handler: () => {
        this.deleteItem();
      }
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private alertController: AlertController,
    public navCtrl: NavController
  ) {
    addIcons({
      arrowBackOutline,
      createOutline,
      trashOutline,
      barcodeOutline,
      pricetagOutline,
      gridOutline,
      cubeOutline,
      cashOutline,
      businessOutline,
      alertCircleOutline,
      starOutline,
      documentTextOutline,
      saveOutline,
      checkmarkCircleOutline,
      closeCircleOutline
    });
  }

  ionViewWillEnter() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.loadItem(name);
      this.isDeleteDisabled = name === 'Laptop'; // 禁用Laptop的删除
    }
  }

  loadItem(name: string) {
    this.isLoading = true;
    this.inventoryService.getItemByName(name).subscribe({
      next: (data) => {
        this.item = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load Item:', err);
        this.showErrorAlert('Failed to load Item');
        this.navCtrl.navigateBack('/tabs/tab1');
        this.isLoading = false;
      }
    });
  }

  updateItem() {
    this.isLoading = true;
    this.inventoryService.updateItem(this.item.item_name, this.item).subscribe({
      next: () => {
        this.showSuccessAlert('Item Update Successful!');
        this.navCtrl.navigateBack('/tabs/tab1');
        this.isLoading = false;
      },
      error: (err) => {
        this.showErrorAlert('Failed to update Item');
        console.error('Failed to update Item:', err);
        this.isLoading = false;
      }
    });
  }

  confirmDelete() {
    this.showDeleteAlert = true;
  }

  deleteItem() {
    this.isLoading = true;
    this.inventoryService.deleteItem(this.item.item_name).subscribe({
      next: () => {
        this.showSuccessAlert('Item deleted successfully!');
        this.navCtrl.navigateBack('/tabs/tab1');
        this.isLoading = false;
      },
      error: (err) => {
        this.showErrorAlert('Failed to delete Item');
        console.error('Failed to delete Item:', err);
        this.isLoading = false;
      },
      complete: () => {
        this.showDeleteAlert = false;
      }
    });
  }

  private async showSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Successes!',
      message: message,
      buttons: ['Define'],
      cssClass: 'success-alert'
    });
    await alert.present();
  }

  private async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Define'],
      cssClass: 'error-alert'
    });
    await alert.present();
  }
}