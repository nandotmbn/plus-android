const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];


export default function timeBuilder(_time) {
	const time = new Date(_time);

	const day = time.getDay();

	const date = time.getDate();
	const month = time.getMonth();
	const year = time.getFullYear();

	const second = time.getSeconds();
	const minutes = time.getMinutes();
	const hour = time.getHours();

    return {
        day : hari[day],
        date,
        month : bulan[month],
        year,
        second,
        minutes,
        hour
    }
}
