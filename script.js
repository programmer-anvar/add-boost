const apiURL = 'https://659b548dd565feee2daaf5be.mockapi.io/Api/boots';

async function fetchBoots() {
    const response = await fetch(apiURL);
    const data = await response.json();
    const container = document.getElementById('bootsContainer');
    container.innerHTML = '';
    data.forEach(boot => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${boot.image}" alt="${boot.name}" />
            <h3>${boot.name}</h3>
        `;
        container.appendChild(card);
    });
}

async function addBoot() {
    const name = document.getElementById('bootName').value;
    const image = document.getElementById('bootImage').value;

    if (!name || !image) {
        alert('Please fill in all fields!');
        return;
    }

    const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, image })
    });

    if (response.ok) {
        alert('Boot added successfully!');
        document.getElementById('bootName').value = '';
        document.getElementById('bootImage').value = '';
        fetchBoots();
    } else {
        alert('Error adding boot!');
    }
}
fetchBoots();