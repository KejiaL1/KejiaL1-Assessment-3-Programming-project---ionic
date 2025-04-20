import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../models/inventory-item.model';

const API_URL = 'https://prog2005.it.scu.edu.au/ArtGalley';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(API_URL);
  }

  getItemByName(name: string): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${API_URL}/${name}`);
  }

  addItem(item: InventoryItem): Observable<any> {
    return this.http.post(API_URL, item);
  }

  updateItem(name: string, item: InventoryItem): Observable<any> {
    return this.http.put(`${API_URL}/${name}`, item);
  }

  deleteItem(name: string): Observable<any> {
    return this.http.delete(`${API_URL}/${name}`);
  }
}