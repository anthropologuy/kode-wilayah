# API Kode Wilayah Indonesia

API kode wilayah administrasi Indonesia berdasarkan Kepmendagri terbaru.

---

# Fitur

* Data Provinsi
* Data Kabupaten / Kota
* Data Kecamatan
* Data Desa
* Data Kelurahan
* Endpoint latest otomatis
* Endpoint per tahun
* JSON API
* Playground pencarian wilayah
* Format kode wilayah resmi Kemendagri

---

# Base URL

```txt
https://api.kemendesa.link/kode-wilayah
```

---

# Playground

Website dokumentasi menyediakan playground pencarian wilayah secara langsung.

Fitur pencarian:

* Cari berdasarkan nama wilayah
* Cari berdasarkan kode wilayah
* Mendukung kode dengan atau tanpa titik
* Menampilkan tipe wilayah
* Menampilkan breadcrumb lokasi wilayah
* Menampilkan jumlah wilayah yang dibawahi

Contoh kode yang didukung:

```txt
11
11.01
11.01.01
1101012001
```

---

# Endpoints

## 1. Data Terbaru

Mengambil data kode wilayah terbaru tanpa perlu menentukan tahun.

### Endpoint

```txt
/api/wilayah/latest/[satuan-wilayah]
```

### Full URL

```txt
https://api.kemendesa.link/kode-wilayah/api/wilayah/latest/[satuan-wilayah]
```

### Jenis Wilayah

| Satuan Wilayah | Keterangan          |
| -------------- | ------------------- |
| provinsi       | Data provinsi       |
| kabupaten      | Data kabupaten/kota |
| kecamatan      | Data kecamatan      |
| desa           | Data desa           |
| kelurahan      | Data kelurahan      |

### Contoh

```txt
https://api.kemendesa.link/kode-wilayah/api/wilayah/latest/provinsi
```

```txt
https://api.kemendesa.link/kode-wilayah/api/wilayah/latest/desa
```

---

## 2. Data Per Tahun

Mengambil data kode wilayah berdasarkan tahun tertentu.

### Endpoint

```txt
/api/wilayah/[tahun]/[satuan-wilayah].json
```

### Full URL

```txt
https://api.kemendesa.link/kode-wilayah/api/wilayah/[tahun]/[satuan-wilayah].json
```

### Contoh

```txt
https://api.kemendesa.link/kode-wilayah/api/wilayah/2025/provinsi.json
```

```txt
https://api.kemendesa.link/kode-wilayah/api/wilayah/2025/kecamatan.json
```

---

# Contoh Response

```json
{
  "metadata": {
    "version": "2025.1",
    "source": {
      "name": "cahyadsn/wilayah",
      "url": "https://github.com/cahyadsn/wilayah",
      "total_data": 38
    }
  },

  "data": [
    {
      "code": "11",
      "name": "Aceh"
    }
  ]
}
```

---

# Struktur Kode Wilayah

## Provinsi

```txt
11
```

---

## Kabupaten / Kota

```txt
11.01
```

---

## Kecamatan

```txt
11.01.01
```

---

## Desa / Kelurahan / Desa Adat

```txt
11.01.01.2001
```

---

# Penjelasan Struktur

| Tingkat        | Jumlah Digit | Contoh        |
| -------------- | ------------ | ------------- |
| Provinsi       | 2 digit      | 11            |
| Kabupaten/Kota | 4 digit      | 11.01         |
| Kecamatan      | 6 digit      | 11.01.01      |
| Desa/Kelurahan | 10 digit     | 11.01.01.2001 |

---

# Tipe Wilayah Desa

Digit pertama pada kode desa/kelurahan menentukan jenis wilayah:

| Prefix | Jenis     |
| ------ | --------- |
| 1xxx   | Kelurahan |
| 2xxx   | Desa      |
| 3xxx   | Desa Adat |

---

# Metadata

Metadata tersedia pada setiap file JSON.

Contoh:

```json
{
  "metadata": {
    "version": "2025.1",
    "source": {
      "name": "cahyadsn/wilayah",
      "url": "https://github.com/cahyadsn/wilayah",
      "total_data": 75266
    }
  }
}
```

---

# Sumber Data

Data wilayah menggunakan referensi resmi dan repository berikut:

* https://github.com/cahyadsn/wilayah

---

# Tech Stack

* Next.js
* TypeScript
* Tailwind CSS
* Vercel

---

# Lisensi

MIT
