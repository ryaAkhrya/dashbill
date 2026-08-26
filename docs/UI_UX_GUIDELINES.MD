# UI/UX Guidelines: Neobrutalism

## 1. Visual Aesthetics
- **Borders:** Semua elemen interaktif dan *container* utama **wajib** menggunakan border hitam solid. Ketebalan standar: `2px`.
- **Shadows:** Gunakan *hard drop-shadow* (tanpa *blur radius*). 
  - Standard shadow: `[box-shadow:4px_4px_0px_#000]`.
  - Hover state: Shadow bergeser ke `[box-shadow:2px_2px_0px_#000]` dan elemen turun sedikit (`translate-x-[2px] translate-y-[2px]`) untuk memberikan efek ditekan.
- **Border Radius:** Minimalisir lengkungan. Gunakan `rounded-none` atau maksimal `rounded-md` untuk mempertahankan kesan kaku.

## 2. Color Palette
- **Background Utama:** Putih (`#FFFFFF`) atau *off-white* (`#F9FAFB`).
- **Warna Aksen:** Batasi maksimal 3 warna utama untuk menghindari visual *clutter*.
  - *Primary Action:* Kuning Mustard (`#FBBF24`).
  - *Secondary Action / Highlight:* Biru Langit (`#38BDF8`).
  - *Destructive / Error:* Pink Retro (`#F472B6`) atau Merah Solid (`#EF4444`).
- **Teks:** Hitam pekat (`#000000`) untuk keterbacaan maksimal.

## 3. User Experience (UX)
- **Hierarchy:** Gunakan tipografi yang tebal (font-weight `800` atau `900`) untuk *headings* dan angka metrik utama.
- **Feedback:** Setiap aksi pengguna (klik tombol, hover, form error) harus memberikan *feedback* visual yang instan dan tegas.
- **Layout:** Pertahankan *whitespace* yang cukup meskipun elemen-elemen menggunakan *border* tebal. Jangan biarkan *layout* terasa sesak.