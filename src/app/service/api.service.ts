import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = 'http://localhost/mahasiswa/';

  constructor(private http: HttpClient) { }

  login(data: any, endpoint: string) {
    return this.http.post(this.apiUrl + endpoint, data);
  }

  tampil(endpoint: string) {
    return this.http.get(this.apiUrl + endpoint);
  }

  tambah(data: any, endpoint: string) {
    return this.http.post(this.apiUrl + endpoint, data);
  }

  edit(data: any, endpoint: string) {
    return this.http.put(this.apiUrl + endpoint, data);
  }

  hapus(id: any, endpoint: string) {
    return this.http.delete(this.apiUrl + endpoint + id);
  }

  lihat(id: any, endpoint: string) {
    return this.http.get(this.apiUrl + endpoint + id);
  }
}