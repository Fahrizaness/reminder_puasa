require('dotenv').config();
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');

const data = JSON.parse(fs.readFileSync('./sunah.json', 'utf8'));
const amalanList = data.amalan_sunah_nabi;

const bot = new TelegramBot(process.env.BOT_TOKEN);

// ==========================
// PENGINGAT PUASA SENIN
// ==========================

// Minggu 20:00 → Ingatkan niat puasa Senin
cron.schedule('0 20 * * 0', () => {
  kirimPesan("Puasa Sunnah Senin", `
💧 *Puasa Senin* besok

Jangan lupa niat malam ini ya!

📿 *Niat Puasa Senin:*
نَوَيْتُ صَوْمَ يَوْمِ ٱلإِثْنَيْنِ سُنَّةً لِلّٰهِ تَعَالَى  
_Nawaitu shauma yaumil itsnaini sunnatan lillahi ta’ala_

Semoga Allah menerima amalanmu. 🤲`);
});

// Senin 03:00 → Pengingat pagi
cron.schedule('0 3 * * 1', () => {
  kirimPesan("Puasa Sunnah Senin", `
💧 *Puasa Senin* hari ini

Sudah niat semalam? Jika belum, boleh niat sampai sebelum zuhur.

📿 *Niat Puasa Senin:*
نَوَيْتُ صَوْمَ يَوْمِ ٱلإِثْنَيْنِ سُنَّةً لِلّٰهِ تَعَالَى  
_Nawaitu shauma yaumil itsnaini sunnatan lillahi ta’ala_

Semoga puasanya berkah dan diterima Allah. 🤲`);
});

// ==========================
// PENGINGAT PUASA KAMIS
// ==========================

// Rabu 20:00 → Ingatkan niat puasa Kamis
cron.schedule('0 20 * * 3', () => {
  kirimPesan("Puasa Sunnah Kamis", `
💧 *Puasa Kamis* besok

Jangan lupa niat malam ini ya!

📿 *Niat Puasa Kamis:*
نَوَيْتُ صَوْمَ يَوْمِ ٱلْخَمِيسِ سُنَّةً لِلّٰهِ تَعَالَى  
_Nawaitu shauma yaumil khamiisi sunnatan lillahi ta’ala_

Semoga Allah menerima niat dan ibadahmu. 🤲`);
});

// Kamis 03:00 → Pengingat pagi
cron.schedule('0 3 * * 4', () => {
  kirimPesan("Puasa Sunnah Kamis", `
💧 *Puasa Kamis* hari ini

Sudah niat semalam? Jika belum, boleh niat sampai sebelum zuhur.

📿 *Niat Puasa Kamis:*
نَوَيْتُ صَوْمَ يَوْمِ ٱلْخَمِيسِ سُنَّةً لِلّٰهِ تَعَالَى  
_Nawaitu shauma yaumil khamiisi sunnatan lillahi ta’ala_

Semoga puasamu diberkahi. 🤲`);
});

// ==========================
// AMALAN SUNNAH RANDOM - 07:00
// ==========================

cron.schedule('0 7 * * *', () => {
  const amalan = getRandomAmalan();
  kirimPesan("Amalan Sunnah Harian", `🕌 *${amalan.amalan}*\n_${amalan.keterangan}_`);
});

// ==========================
// FUNGSI UMUM
// ==========================

function kirimPesan(judul, isi) {
  const fullMessage = `🕌 *[${judul}]*\n\n${isi}`;
  bot.sendMessage(process.env.CHAT_ID, fullMessage, { parse_mode: 'Markdown' });
  console.log(`[${new Date().toLocaleString()}] Kirim: ${judul}`);
}

function getRandomAmalan() {
  const index = Math.floor(Math.random() * amalanList.length);
  return amalanList[index];
}
