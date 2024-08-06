export default function formatDate(date:Date) {
    const days = [
        "Pazar",
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi",
    ];
    const months = [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık",
    ];

    let day:string|number = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes: string | number = date.getMinutes();

    // Sıfır ekleme
    day = day < 10 ? "0" + day : day;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${day} ${month} ${year} ${hours}:${minutes}`;
}

