//Karakter Utama
let nama: string = "Arion"
let umur: number = 30
let bertarung: boolean = true //ya
console.log("Nama, Umur, Status")
console.log(nama, umur, bertarung) //Arion 30 true


//aset kerajaan
let emas: number = 5000
let makanan: number = 120
let prajurit: number = 200
console.log("Jumlah emas, Jumlah makanan, Jumlah Prajurit")
console.log(emas, makanan, prajurit)//5000 120 200


//fungsi tambah emas
function tambahemas(emas:number):number {
    return emas + 1500
}
console.log("Petarung mendapatkan 1500 emas sehingga jumlahnya sekarang menjadi", tambahemas(emas))


//exp bertambah
let exp: number = 75
console.log("Selamat! ",nama, "baru saja mendapatkan", exp, "poin exp")


//kesehatan awal prajurit
let kesehatanPrajurit: number[] = new Array(prajurit).fill(100); // Setiap prajurit mulai dengan 100 poin kesehatan
console.log("Kesehatan awal prajurit:", kesehatanPrajurit);


//kesehatan prajurit berkurang
function kurangikesehatan(jumlahPrajurit: number, poinHilang: number): void {
  for (let i = 0; i < jumlahPrajurit; i++) {
    kesehatanPrajurit[i] -= poinHilang;

    if (kesehatanPrajurit[i] < 0) {
      kesehatanPrajurit[i] = 0;
    }
  }
}
kurangikesehatan(prajurit, 5);
console.log("Setelah prajurit terkena serangan, kesehatan mereka sekarang adalah:", kesehatanPrajurit.slice(0, 100));

//Rangkuman Misi Arion
function rangkumanMisi(nama: string, emas: number, exp: number): void {
  console.log("Rangkuman Misi Arion")
  console.log("Nama Pahlawan:", nama)
  console.log("Emas yang Dikumpulkan:", emas)
  console.log("Poin Pengalaman yang Didapat:", exp)
}
rangkumanMisi(nama, emas, exp)
