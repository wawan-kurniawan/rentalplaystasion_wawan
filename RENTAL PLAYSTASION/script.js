let timers = {};

function mulaiBilling(unitId, tarifPerJam) {
    const statusEl = document.getElementById(`wawan_status_${unitId}`);
    const timerEl = document.getElementById(`wawan_timer_${unitId}`);
    const biayaEl = document.getElementById(`wawan_biaya_${unitId}`);

    if (timers[unitId]) return;

    statusEl.textContent = "Digunakan";
    statusEl.className = "wawan_badge wawan_digunakan";

    let detik = 0;
    timers[unitId] = setInterval(() => {
        detik++;
        let jam = Math.floor(detik / 3600);
        let menit = Math.floor((detik % 3600) / 60);
        let sisaDetik = detik % 60;

        timerEl.textContent = 
            `${String(jam).padStart(2, '0')}:${String(menit).padStart(2, '0')}:${String(sisaDetik).padStart(2, '0')}`;

        let totalBiaya = Math.ceil((detik / 3600) * tarifPerJam);
        if (totalBiaya < 1000) totalBiaya = 1000;
        biayaEl.textContent = "Rp " + totalBiaya.toLocaleString("id-ID");
    }, 1000);
}

function stopBilling(unitId) {
    if (timers[unitId]) {
        clearInterval(timers[unitId]);
        delete timers[unitId];
        const statusEl = document.getElementById(`wawan_status_${unitId}`);
        const biayaEl = document.getElementById(`wawan_biaya_${unitId}`);
        alert(`Sesi Unit ${unitId} selesai!\nTotal Tagihan: ${biayaEl.textContent}`);
        statusEl.textContent = "Tersedia";
        statusEl.className = "wawan_badge wawan_tersedia";
    }
}

function kirimPesan(event) {
    event.preventDefault();
    const nama = document.getElementById("wawan_nama").value;
    const email = document.getElementById("wawan_email").value;
    const subjek = document.getElementById("wawan_subjek").value;
    const pesan = document.getElementById("wawan_pesan").value;

    const hasil = document.getElementById("wawan_hasil_pesan");
    hasil.innerHTML = `
        <div class="wawan_card" style="border-color: #16a34a; margin-top: 1rem;">
            <h3 class="wawan_title">Pesan Berhasil Terkirim!</h3>
            <p><strong>Pengirim:</strong> ${nama} (${email})</p>
            <p><strong>Subjek:</strong> ${subjek}</p>
            <p><strong>Isi Pesan:</strong> ${pesan}</p>
        </div>
    `;
    event.target.reset();
}