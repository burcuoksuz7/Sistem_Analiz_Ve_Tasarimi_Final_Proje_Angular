import { Kategori } from './Kategori';
import { Urun } from 'src/app/models/Urun';
export class Kayit {
    kayitId: number;
    kayitUrunId: number;
    kayitKatId: number;
    urunBilgi: Urun;
    kategoriBilgi: Kategori;
}