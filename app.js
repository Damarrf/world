document.getElementById('searchBtn').addEventListener('click', () => {
    const country = document.getElementById('countryInput').value.trim();
    if (country) {
        getCountryData(country);
    }
});

document.getElementById('countryInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const country = document.getElementById('countryInput').value.trim();
        if (country) getCountryData(country);
    }
});

async function getCountryData(countryName) {
    // API ini publik, gratis, dan langsung aktif tanpa KEY!
    // Ganti baris url lama dengan yang baru ini:
const url = `https://openconcepts-countries.github.io/restcountries/v3.1/name/${countryName}.json`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Negara tidak ditemukan!');
        }
        
        const data = await response.json();
        // Mengambil index ke-0 karena API mengembalikan array objek negara
        displayCountry(data[0]);
        
    } catch (error) {
        showError(error.message);
    }
}

function displayCountry(country) {
    document.getElementById('errorMsg').style.display = 'none';
    document.getElementById('countryInfo').style.display = 'block';
    
    // Tampilkan data bendera dan nama
    document.getElementById('flag').src = country.flags.svg;
    document.getElementById('countryName').innerText = country.name.common;
    
    // Tampilkan Ibu kota (beberapa negara kecil kadang tidak punya ibu kota di API)
    document.getElementById('capital').innerText = country.capital ? country.capital[0] : 'Tidak ada';
    
    // Tampilkan Benua
    document.getElementById('region').innerText = `${country.region} (${country.subregion || ''})`;
    
    // Format angka populasi agar ada titik ribuan (misal: 273.523.615)
    document.getElementById('population').innerText = country.population.toLocaleString('id-ID');
    
    // Ambil data mata uang dinamis karena tiap negara kuncinya beda-beda
    if (country.currencies) {
        const currencyKey = Object.keys(country.currencies)[0]; // ambil key pertama (misal: IDR, USD)
        const currencyName = country.currencies[currencyKey].name;
        const currencySymbol = country.currencies[currencyKey].symbol || '';
        document.getElementById('currency').innerText = `${currencyName} (${currencySymbol} - ${currencyKey})`;
    } else {
        document.getElementById('currency').innerText = '-';
    }
}

function showError(message) {
    document.getElementById('countryInfo').style.display = 'none';
    const errorEl = document.getElementById('errorMsg');
    errorEl.innerText = message;
    errorEl.style.display = 'block';
}
