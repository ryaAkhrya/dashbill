# Development Rules & Standards

## 1. Documentation & Markdown
- **No AI Slop:** Hindari penggunaan kalimat generatif yang bertele-tele, metafora yang tidak perlu, atau penjelasan panjang lebar yang tidak fungsional.
- **Direct & Technical:** Gunakan bahasa teknis, ringkas, dan langsung pada intinya.
- **Emoji Usage:** Dilarang keras menggunakan emoji dekoratif standar AI (seperti roket, bintang, atau lampu). Jika harus menggunakan emoji, pastikan memiliki nilai semantik atau navigasional yang jelas.

## 2. Code Structure
- Pisahkan *business logic* dari komponen UI. Gunakan *custom hooks* untuk mengelola state dan operasi data.
- Gunakan tipe data TypeScript secara eksplisit. Dilarang menggunakan `any` kecuali dalam keadaan darurat (dan harus disertai komentar penjelasan).
- Penamaan variabel harus deskriptif (contoh: `invoiceList` lebih baik daripada `data`).

## 3. Commit Messages
Gunakan format *Conventional Commits*:
- `feat:` untuk fitur baru.
- `fix:` untuk perbaikan bug.
- `docs:` untuk perubahan dokumentasi.
- `chore:` untuk pemeliharaan rutin (update dependencies, dll).