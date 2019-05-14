document.getElementById('form').onsubmit = (e) => {
    e.preventDefault();
    const value = document.getElementById('input').value;
    fetch(`http://localhost:3000/weather?search=${value}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            document.getElementById('outputOne').innerText = data.error;
        } else {
            document.getElementById('result').innerHTML = "<div id='result'></div>";
            document.getElementById('result').innerHTML += `<h3>${data.location}</h3><p>${data.forecast}</p>`
        }
    })
})
};
