# Backend API untuk ZaharaStyle (Aplikasi E-commerce Hijab)
![ZaharaStyle - Logo](https://github.com/user-attachments/assets/2c37ef76-18a0-4483-90b2-bfa86ec88122)

Selamat datang di repositori backend untuk **ZaharaStyle**, sebuah proyek API e-commerce hijab yang dibangun sebagai tugas akhir untuk event **Digital Skill Fair 40.0 by Dibimbing.id**.

## Deskripsi Proyek

ZaharaStyle API adalah sebuah backend service yang menyediakan semua fungsionalitas inti untuk aplikasi penjualan hijab. API ini dirancang untuk mengelola produk, kategori, user, dan proses pemesanan yang melibatkan transaksi database yang aman.

## Fitur Utama

-   **Manajemen Produk (CRUD):** Tambah, lihat, update, dan hapus data produk hijab.
-   **Manajemen Kategori (CRUD):** Kelola kategori produk seperti Pashmina, Bergo, dll.
-   **Manajemen User (Dasar):** Registrasi dan lihat data user.
-   **Sistem Order dengan Transaksi:** Membuat pesanan yang secara otomatis memvalidasi dan mengurangi stok produk. Menggunakan transaksi database untuk menjamin konsistensi data.
-   **Riwayat Pesanan:** Melihat riwayat pesanan per-user.

## Teknologi yang Digunakan

-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** MySQL
-   **Driver MySQL:** mysql2
-   **Lainnya:** dotenv, nodemon

## Cara Menjalankan Proyek

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/RozhakXD/ZaharaStyle.git
    cd ZaharaStyle
    ```
2.  **Install semua dependency:**
    ```bash
    npm install
    ```
3.  **Setup database:**
    -   Buat sebuah database di MySQL dengan nama `zaharastyle_db`.
    -   Import struktur tabel dari file SQL yang disediakan (jika ada) atau buat manual sesuai desain database.

4.  **Buat file `.env`** di root proyek dan isi sesuai dengan konfigurasi databasemu:
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=zaharastyle_db
    PORT=3000
    ```
5.  **Jalankan server:**
    ```bash
    npm start
    ```
    Server akan berjalan di `http://localhost:3000`.

## Dokumentasi Endpoint API

Berikut adalah daftar endpoint yang tersedia:

### Produk

| Method | Endpoint             | Deskripsi                    | Contoh Body (JSON)                                                                  |
| :----- | :------------------- | :--------------------------- | :---------------------------------------------------------------------------------- |
| `POST` | `/api/products`      | Menambah produk baru         | `{"name":"...", "price":50000, "stock":100, "category_id":1}`                        |
| `GET`  | `/api/products`      | Melihat semua produk         | -                                                                                   |
| `GET`  | `/api/products/:id`  | Melihat detail satu produk   | -                                                                                   |
| `PUT`  | `/api/products/:id`  | Memperbarui produk           | `{"name":"...", "price":55000, "stock":90, "category_id":1}`                         |
| `DELETE`| `/api/products/:id`  | Menghapus produk             | -                                                                                   |

### Kategori

| Method | Endpoint               | Deskripsi                      | Contoh Body (JSON)      |
| :----- | :--------------------- | :----------------------------- | :---------------------- |
| `POST` | `/api/categories`      | Menambah kategori baru         | `{"name": "Pashmina"}`  |
| `GET`  | `/api/categories`      | Melihat semua kategori         | -                       |

### User

| Method | Endpoint          | Deskripsi                    | Contoh Body (JSON)                                                      |
| :----- | :---------------- | :--------------------------- | :---------------------------------------------------------------------- |
| `POST` | `/api/users`      | Mendaftarkan user baru       | `{"name":"...", "email":"...", "password":"...", "address":"..."}` |
| `GET`  | `/api/users`      | Melihat semua user           | -                                                                       |

### Order

| Method | Endpoint                 | Deskripsi                               | Contoh Body (JSON)                                                            |
| :----- | :----------------------- | :-------------------------------------- | :---------------------------------------------------------------------------- |
| `POST` | `/api/orders`            | Membuat pesanan baru                  | `{"user_id": 1, "items": [{"product_id":1, "quantity":2}]}` |
| `GET`  | `/api/orders/user/:userId`| Melihat riwayat pesanan per user      | -                                                                             |


## Lisensi

Repositori ini menggunakan lisensi [MIT License](LICENSE).  Silakan digunakan untuk pembelajaran, pengembangan pribadi, atau kontribusi proyek terbuka.
