document.getElementById('weather-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const zipcode = document.getElementById('zipcode').value;
    const feelings = document.getElementById('feelings').value;
    const response = await fetch(`/api/weather?zipcode=${zipcode}`);
    const data = await response.json();
    const resultDiv = document.getElementById('weather-result');
    if (data.error) {
        resultDiv.innerHTML = `<p>Error: ${data.error}</p>`;
    } else {
        resultDiv.innerHTML = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Your feelings: ${feelings}</p>
        `;

        await fetch('/add', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: new Date().toLocaleDateString(),
                temp: data.main.temp,
                feel: feelings
            }),
        });

        retrieveData();
    }
});

const retrieveData = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
        document.getElementById('content').innerHTML = allData.feel;
        document.getElementById('date').innerHTML = allData.date;
    } catch (error) {
        console.log("error", error);
    }
};
