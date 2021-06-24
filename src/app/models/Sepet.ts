import { Musteri } from "./Musteri";
import { Urun } from "./Urun"

export class Sepet {
    SepetId: number;
    SepetUrunId: number;
    urunBilgi: Urun;
    SepetUyeId:number;
    musteriBilgi:Musteri;
    SepetOnay:number;
}
