import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.page.html',
  styleUrls: ['./mahasiswa.page.scss'],
})
export class MahasiswaPage implements OnInit {
  dataMahasiswa: any;
  modalTambah: any;
  modalEdit: any;
  id: any;
  nama: any = '';
  jurusan: any = '';
  namaError: string = '';

  constructor(
    private api: ApiService,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getMahasiswa();
  }

  validateNama(event: any) {
    const value = event.target.value;
    const nameRegex = /^[a-zA-Z\s]*$/;
    
    if (value.length < 3) {
      this.namaError = 'Nama Mahasiswa minimal 3 karakter';
    } else if (!nameRegex.test(value)) {
      this.namaError = 'Nama tidak boleh mengandung angka atau simbol';
    } else {
      this.namaError = '';
    }
  }

  isFormValid() {
    return this.nama && this.nama.length >= 3 && this.jurusan && !this.namaError;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  getMahasiswa() {
    this.api.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataMahasiswa = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  resetModal() {
    this.id = null;
    this.nama = '';
    this.jurusan = '';
  }

  openModalTambah(isOpen: boolean) {
    this.modalTambah = isOpen;
    this.resetModal();
    this.modalTambah = true;
    this.modalEdit = false;
  }

  async cancel() {
    await this.modalController.dismiss();
    this.modalTambah = false;
    this.modalEdit = false;
    this.resetModal();
  }

  tambahMahasiswa() {
    if (this.isFormValid()) {
      let data = {
        nama: this.nama,
        jurusan: this.jurusan,
      }
      this.api.tambah(data, 'tambah.php')
        .subscribe({
          next: async (hasil: any) => {
            this.resetModal();
            this.getMahasiswa();
            this.modalTambah = false;
            this.modalController.dismiss();
            await this.presentToast('Data Mahasiswa Berhasil Ditambahkan');
          },
          error: (err: any) => {
            console.log('gagal tambah mahasiswa');
          }
        })
    }
  }

  async konfirmasiHapus(id: any) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah Anda Yakin Ingin Menghapus Data Mahasiswa ini?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          handler: () => {
            this.presentToast('Data Mahasiswa Batal Dihapus');
          }
        }, {
          text: 'Ya',
          handler: () => {
            this.hapusMahasiswa(id);
          }
        }
      ]
    });
    await alert.present();
  }

  hapusMahasiswa(id: any) {
    this.api.hapus(id, 'hapus.php?id=').subscribe({
      next: async (res: any) => {
        console.log('sukses', res);
        this.getMahasiswa();
        await this.presentToast('Data Mahasiswa Berhasil Dihapus');
      },
      error: (error: any) => {
        console.log('gagal');
      }
    })
  }

  ambilMahasiswa(id: any) {
    this.api.lihat(id, 'lihat.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let mahasiswa = hasil;
        this.id = mahasiswa.id;
        this.nama = mahasiswa.nama;
        this.jurusan = mahasiswa.jurusan;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      }
    })
  }

  openModalEdit(isOpen: boolean, idget: any) {
    this.modalEdit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilMahasiswa(this.id);
    this.modalTambah = false;
    this.modalEdit = true;
  }

  editMahasiswa() {
    if (this.isFormValid()) {
      let data = {
        id: this.id,
        nama: this.nama,
        jurusan: this.jurusan
      }
      this.api.edit(data, 'edit.php')
        .subscribe({
          next: async (hasil: any) => {
            console.log(hasil);
            this.resetModal();
            this.getMahasiswa();
            this.modalEdit = false;
            this.modalController.dismiss();
            await this.presentToast('Data Mahasiswa Berhasil Diubah');
          },
          error: (err: any) => {
            console.log('gagal edit Mahasiswa');
          }
        })
    }
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin keluar?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Ya',
          handler: () => {
            localStorage.removeItem('user');
            this.router.navigate(['/login']);
            this.presentToast('Berhasil logout');
          }
        }
      ]
    });
    await alert.present();
  }
}