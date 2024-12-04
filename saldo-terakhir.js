const daftarTabungan = getData("daftarTabungan") || [];
const daftarSiswa = getData("daftarSiswa") || [];

function getData(Key) {
  return JSON.parse(localStorage.getItem(Key));
}

function setData(Key, Data) {
  return localStorage.setItem(Key, JSON.stringify(Data));
}

// const tampilkanTabungan = (filter = "") => {
//   const tblTabungan = document.getElementById("tblTabungan");
//   tblTabungan.innerHTML =
//     "<tr> <th>No</th> <NIS> <th>Nama</th> <th>Saldo</th> <th>Hapus<th> </tr>";
//   for (let i in daftarTabungan) {
//     if (daftarTabungan[i].nis.includes(filter)) {
//       tblTabungan.innerHTML += `<tr> <td>${parseInt(i) + 1} <td>${
//         daftarTabungan[i].nis
//       }</td> <td>${
//         daftarTabungan[i].nama}</td> <td>${
//         daftarTabungan[i].saldo
//       }</td> <td><button type="button" class="btn btn-danger" onclick = "hapusTabungan('${
//         daftarTabungan[i].id
//       }')">Delete</button> </td> </tr>`;
//     }
//   }
// };

const cariIndex = (id) => {
  const index = daftarTabungan.findIndex((item) => item.id == id);
  return index;
};

const hapusTabungan = (id) => {
  const index = cariIndex(id);
  if (index !== -1) {
    daftarTabungan.splice(index, 1);
    setData("daftarTabungan", daftarTabungan);
    tampilkanTabungan();
    console.log("Dihapus");
  }
};

// const handleEditTabungan = (id) => {
//   const EditModal = document.getElementById("editModal");
//   const Modal = new bootstrap.Modal(EditModal);
//   Modal.show();

//   const indexEdit = cariIndex(id);
//   const tabunganDiedit = daftarTabungan[indexEdit];
//   const idModal = document.getElementById("id");
//   const nis = document.getElementById("nis");
//   const nama = document.getElementById("nama");
//   const saldo = document.getElementById("saldo");

//   idModal.value = tabunganDiedit.id;
//   kodeTab.value = tabunganDiedit.kodeTab;
//   nama.value = tabunganDiedit.nama;
//   saldo.value = tabunganDiedit.saldo;
// };

// const editTabungan = () => {
//   const EditModal = document.getElementById("editModal");
//   const Modal = bootstrap.Modal.getInstance(EditModal);
//   const id = document.getElementById("id").value;
//   const indexEdit = cariIndex(id);
//   const saldoBaru = parseFloat(document.getElementById("saldo").value);

//   daftarTabungan[indexEdit].saldo = parseFloat(daftarTabungan[indexEdit].saldo) + saldoBaru;
//   setData("daftarTabungan", daftarTabungan);
  
//   Modal.hide();
//   tampilkanTabungan();
// };

const tampilkanSaldo = () => {
  const tblTabungan = document.getElementById("tblTabungan");
  tblTabungan.innerHTML =
      "<tr> <th>No</th> <th>NIS</th> <th>Nama</th> <th>Saldo</th> <th>Hapus</th> </tr>";

  for (let i in daftarTabungan) {
      const nis = daftarTabungan[i].nis;
      const nominal = daftarTabungan[i].nominal;
      
      // Mencari nama siswa berdasarkan NIS
      const siswa = daftarSiswa.find(siswa => siswa.nis === nis);
      const nama = siswa ? siswa.nama : "Nama tidak ditemukan"; // Jika siswa tidak ditemukan

      tblTabungan.innerHTML += `<tr> 
          <td>${parseInt(i) + 1}</td>
          <td>${nis}</td> 
          <td>${nama}</td> 
          <td>${nominal}</td> 
          <td><button type="button" class="btn btn-danger" onclick="hapusTabungan('${daftarTabungan[i].id}')">Delete</button></td> 
      </tr>`;
  }
};

document/addEventListener("DOMContentLoaded",tampilkanSaldo);

// const cancel = () => {
//   const EditModal = document.getElementById("editModal");
//   const Modal = bootstrap.Modal.getInstance(EditModal);
//   Modal.hide()
// };

document
  .querySelector('form[role="search"]')
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const searchValue = this.querySelector('input[type="search"]').value;
    tampilkanTabungan(searchValue);
});

// tampilkanTabungan();