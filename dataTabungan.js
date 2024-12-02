const daftarTabungan = getData("daftarTabungan") || [];

function getData(Key) {
  return JSON.parse(localStorage.getItem(Key));
}

function setData(Key, Data) {
  return localStorage.setItem(Key, JSON.stringify(Data));
}

const tampilkanTabungan = (filter = "") => {
  const tblTabungan = document.getElementById("tblTabungan");
  tblTabungan.innerHTML =
    "<tr> <th>No</th> <th>Kode Tabungan</th> <th>NIS</th> <th>Nama</th> <th>Kelas</th> <th>Tanggal</th> <th>Saldo</th> <th>Edit</th> <th>Hapus<th> </tr>";
  for (let i in daftarTabungan) {
    if (daftarTabungan[i].nis.includes(filter)) {
      tblTabungan.innerHTML += `<tr> <td>${parseInt(i) + 1}</td> <td>${
        daftarTabungan[i].kodeTab
      }</td> <td>${daftarTabungan[i].nis}</td> <td>${
        daftarTabungan[i].nama
      }</td> <td>${daftarTabungan[i].kelas}</td> <td>${
        daftarTabungan[i].tanggal}</td> <td>${
        daftarTabungan[i].saldo
      }</td> <td><button type="button" class="btn btn-warning" onclick = "handleEditTabungan('${
        daftarTabungan[i].id
      }')">Edit</button></td> <td><button type="button" class="btn btn-danger" onclick = "hapusTabungan('${
        daftarTabungan[i].id
      }')">Delete</button>
</td> </tr>`;
    }
  }
};

const cariIndex = (id) => {
  const index = daftarTabungan.findIndex((item) => item.id == id);
  return index;
};

const hapusTabungan = (id) => {
  const index = cariIndex(id);
  if (index !== -1) {
    daftarTabungan.splice(index, 1);
    tampilkanTabungan();
    console.log("Dihapus");
  }
};

const handleEditTabungan = (id) => {
  const EditModal = document.getElementById("editModal");

  const Modal = new bootstrap.Modal(EditModal);
  Modal.show();

  const indexEdit = cariIndex(id);
  const tabunganDiedit = daftarTabungan[indexEdit];
  const idModal = document.getElementById("id");
  const kodeTab = document.getElementById("kodeTab");
  const nis = document.getElementById("nis");
  const nama = document.getElementById("nama");
  const kelas = document.getElementById("kelas");
  const tanggal = document.getElementById("tanggal");
  const saldo = document.getElementById("saldo");
  idModal.value = tabunganDiedit.id;
  kodeTab.value = tabunganDiedit.kodeTab;
  nis.value = tabunganDiedit.nis;
  nama.value = tabunganDiedit.nama;
  kelas.value = tabunganDiedit.kelas;
  tanggal.value = tabunganDiedit.tanggal;
  saldo.value = tabunganDiedit.saldo;
};

const editTabungan = () => {
  const EditModal = document.getElementById("editModal");
  const Modal = bootstrap.Modal.getInstance(EditModal);
  const id = document.getElementById("id");
  const indexEdit = cariIndex(id.value);
  const kodeTab = document.getElementById("kodeTab");
  const nis = document.getElementById("nis");
  const nama = document.getElementById("nama");
  const kelas = document.getElementById("kelas");
  const tanggal = document.getElementById("tanggal");
  const saldo = document.getElementById("saldo");
  daftarTabungan[indexEdit].kodeTab = kodeTab.value;
  daftarTabungan[indexEdit].nis = nis.value;
  daftarTabungan[indexEdit].nama = nama.value;
  daftarTabungan[indexEdit].kelas = kelas.value;
  daftarTabungan[indexEdit].tanggal = tanggal.value;
  daftarTabungan[indexEdit].saldo = saldo.value;

  Modal.hide();
  setData("daftarTabungan", daftarTabungan);
  tampilkanTabungan();
};

const cancel = () => {
  const EditModal = document.getElementById("editModal");
  const Modal = bootstrap.Modal.getInstance(EditModal);
  Modal.hide()
};

document
  .querySelector('form[role="search"]')
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const searchValue = this.querySelector('input[type="search"]').value;
    tampilkanTabungan(searchValue);
  });

tampilkanTabungan();