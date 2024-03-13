class App {
  constructor() {
      this.clearButton = document.getElementById("clear-btn");
      this.loadButton = document.getElementById("load-btn");
      this.carContainerElement = document.getElementById("cars-container");
      this.tipeDriver = document.getElementById("tipeDriver")
      this.tanggal = document.getElementById("tanggal")
      this.waktuJemput = document.getElementById("waktuJemput")
      this.jumlahPenumpang = document.getElementById("jumlahPenumpang")
  }
// 
  async init() {
      await this.load()
      this.run()
  }


  run = () => {
      Car.list.forEach((car) => {
          const node = document.createElement("div");
          node.classList.add("col-lg-4", "my-2");
          node.innerHTML = car.render();
          this.carContainerElement.appendChild(node);
      });
  };

  async load() {
      const cars = await Binar.listCars();
      Car.init(cars);
      console.log(cars)
  }

  async loadFilter() {
      const cars = await Binar.listCars((data) => {
          const tanggalJemputData = new Date(data.availableAt).getTime()
          const tanggal = new Date(`${this.tanggal.value} ${this.waktuJemput.value}`).getTime()
          const checkWaktu = tanggalJemputData >= tanggal
          const availableAt = (this.tipeDriver.value === 'true' && data.available ? true : false)
          const notAvailableAt = (this.tipeDriver.value === 'false' && !data.available ? true : false)
          const penumpang = data.capacity >= this.jumlahPenumpang.value
          if (this.tipeDriver.value !== 'default' && this.tanggal.value !== '' && this.waktuJemput.value !== 'false' && this.jumlahPenumpang.value >= 0) {
              return (availableAt || notAvailableAt) && checkWaktu && penumpang
          } else if (this.tipeDriver.value !== 'default' && this.jumlahPenumpang.value > 0) {
              return (availableAt || notAvailableAt) && penumpang
          } else if (this.tanggal.value !== '' && this.waktuJemput.value !== 'false' && this.jumlahPenumpang.value > 0) {
              return checkWaktu && penumpang
          } else if (this.tanggal.value !== '' && this.waktuJemput.value !== 'false') {
              return checkWaktu
          } else if (this.tipeDriver.value !== 'default') {
              return (availableAt || notAvailableAt)
          } else {
              return penumpang
          }

      });
      console.log(cars)
      Car.init(cars);
  }


  clear = () => {
      let child = this.carContainerElement.firstElementChild;

      while (child) {
          child.remove();
          child = this.carContainerElement.firstElementChild;
      }
  };
}

// menangani event load ketika halaman web telah selesai dimuat
// menetapkan event listener untuk event load pada objek window. Ketika halaman telah dimuat sepenuhnya
window.addEventListener("load", () => {
  // menemukan elemen HTML dengan ID "load-btn" dan menyimpannya dalam variabel loadBtn.
  const loadBtn = document.getElementById("load-btn");
  // mencari elemen HTML dengan kelas CSS "loader" dan menyimpannya dalam variabel loader.
  const loader = document.querySelector(".loader");
  // mencari elemen HTML dengan ID "cars-container" dan menyimpannya dalam variabel cardcar.
  const cardcar = document.querySelector("#cars-container");
  // menyembunyikan elemen tersebut setelah halaman dimuat sepenuhnya.
  loader.classList.add("loader-hidden");

  // Menambahkan event listener untuk tombol "Cari Mobil"
  loadBtn.addEventListener("click", () => {
    // Menampilkan loader
    loader.classList.remove("loader-hidden");
    // sembunyikan cars
    cardcar.classList.add("card-car-hidden");

    // Simulasikan proses pencarian dengan setTimeout (contoh: 2 detik)
    setTimeout(() => {
      // Sembunyikan loader setelah proses pencarian selesai
      loader.classList.add("loader-hidden");
      //menampilkan cars
      cardcar.classList.remove("card-car-hidden");
      console.log("Proses pencarian selesai");
    }, 2000); // Ubah angka 2000 menjadi waktu yang sesuai dengan proses pencarian sebenarnya
  });

  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
});


// class App {
//   constructor() {
//     this.clearButton = document.getElementById("clear-btn");
//     this.loadButton = document.getElementById("load-btn");
//     this.carContainerElement = document.getElementById("cars-container");
//   }

//   async init() {
//     await this.load();

//     // Register click listener
//     this.clearButton.onclick = this.clear;
//     this.loadButton.onclick = this.run;
//   }

//   run = () => {
//     Car.list.forEach((car) => {
//       const node = document.createElement("div");
//       node.innerHTML = car.render();
//       this.carContainerElement.appendChild(node);
//     });
//   };

//   async load() {
//     const cars = await Binar.listCars();
//     Car.init(cars);
//   }

//   clear = () => {
//     let child = this.carContainerElement.firstElementChild;

//     while (child) {
//       child.remove();
//       child = this.carContainerElement.firstElementChild;
//     }
//   };
// }
