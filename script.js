// realtime
// date
function startDate() {
    const today = new Date();
    let day = today.getDay();
    let d = today.getDate();
    let m = today.getMonth();
    let y = today.getFullYear();

    day = checkDay(day);

    document.getElementById('date').innerHTML = day + "\n" + d + "/" + m + '/' + y;
    setTimeout(startDate, 1000);
}

function checkDay(i) {
    if (i == 1) {
        i = "Senin";
    } else if (i == 2) {
        i = "Selasa";
    } else if (i == 3) {
        i = "Rabu";
    } else if (i == 4) {
        i = "Kamis";
    } else if (i == 5) {
        i = "Jum'at";
    } else if (i == 6) {
        i = "Sabtu";
    } else if (i == 0) {
        i = "Minggu";
    }
    return i;
}

startDate();

// time
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}

startTime();

// Perhitungan tagihan
const inputBarang = document.getElementById('inputBarang');
const selection = document.getElementById('selection');
const qty = document.getElementById('qty');
const price = document.getElementById('price');
const total = document.getElementById('total');


let jmlBarang = {
    buku: 0,
    pensil: 0,
    penghapus: 0,
    bolpoint: 0,
    penggaris: 0
}

let harga = {
    buku: 10,
    pensil: 2,
    penghapus: 1,
    bolpoint: 4,
    penggaris: 2
}

let hargaTotal = 0;


function pBaru(namaVarSelection, barang, id) {
    const pBaru = document.createElement('p');
    pBaru.innerHTML = barang;
    pBaru.classList.add(id);
    namaVarSelection.appendChild(pBaru);
}

function pBaruHarga(namaVarSelection, barang, id) {
    const pBaru = document.createElement('p');
    pBaru.innerHTML = "Rp" + barang + ".000.00,-";
    pBaru.classList.add(id);
    namaVarSelection.appendChild(pBaru);
}

function addItem(e, nameString) {
    if (e.target.parentElement.parentElement.getAttribute('id') == nameString) {
        if (e.target.parentElement.classList.contains('tombol') == true) {
            if (e.target.innerHTML == '+') {
                jmlBarang[nameString] += 1;
                if (qty.classList.contains(nameString) == false) {
                    selection.classList.add(nameString);
                    pBaru(selection, nameString, nameString);
                    qty.classList.add(nameString);
                    pBaru(qty, jmlBarang[nameString], nameString);
                    price.classList.add(nameString);
                    pBaruHarga(price, harga[nameString], nameString);
                } else {
                    for (let a = 0; a < qty.childElementCount; a++) {
                        if (qty.children[a].classList.contains(nameString) == true) {
                            qty.children[a].innerHTML = jmlBarang[nameString];
                        }
                    }
                }
            } else if (e.target.innerHTML == '-') {
                if (jmlBarang[nameString] == 0) {
                    alert('Item belum ditambahkan!');
                    jmlBarang[nameString] = 0;
                } else if (jmlBarang[nameString] == 1) {
                    var c = confirm('Mau menghapus item ini?');
                    if (c == true) {
                        selection.classList.remove(nameString);
                        qty.classList.remove(nameString);
                        price.classList.remove(nameString);
                        for (let i = 0; i < qty.childElementCount; i++) {
                            if (qty.children[i].classList.contains(nameString) == true) {
                                selection.children[i].remove();
                                qty.children[i].remove();
                                price.children[i].remove();
                            }
                        }
                        jmlBarang[nameString] = 0;
                    } else {
                        jmlBarang[nameString] = 1;
                    }
                } else {
                    for (let a = 0; a < qty.childElementCount; a++) {
                        if (qty.children[a].classList.contains(nameString) == true) {
                            jmlBarang[nameString] -= 1;
                            qty.children[a].innerHTML = jmlBarang[nameString];
                        }
                    }
                }
            }
            hargaTotal = (jmlBarang['buku'] * harga['buku']) + (jmlBarang['pensil'] * harga['pensil']) + (jmlBarang['penghapus'] * harga['penghapus']) + (jmlBarang['bolpoint'] * harga['bolpoint']) + (jmlBarang['penggaris'] * harga['penggaris']);
            total.innerHTML = hargaTotal + ".000";
        }
    }
}

inputBarang.addEventListener('click', function (e) {
    addItem(e, 'buku');
    addItem(e, 'pensil');
    addItem(e, 'penghapus');
    addItem(e, 'bolpoint');
    addItem(e, 'penggaris');
});

// cashback
const cash = document.getElementById('cash');
const cashAcc = document.getElementById('cashAcc');
const cashBack = document.getElementById('cashback');

let cashValue = 0;
let cashBackValue = 0;

cashAcc.addEventListener('click', function () {
    cashValue = parseInt(cash.value);
    cashBackValue = (cashValue / 1000) - hargaTotal;
    cashBack.innerHTML = cashBackValue + ".000";
});


// no Penjualan
function countNoPenjualan() {
    const tanggal = new Date();
    let tgl = tanggal.getDate().toString();
    let bln = tanggal.getMonth().toString();
    let thn = tanggal.getFullYear().toString();
    let noRef = Math.round(Math.random() * 100000).toString();
    return noPenjualan = tgl + bln + thn + noRef;
}