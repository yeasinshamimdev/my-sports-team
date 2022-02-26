const loadPlayer = () => {
    const emptyValueMsg = document.getElementById('empty-value');
    const wrongValue = document.getElementById('wrong-value');
    const inputField = document.getElementById('input-filed');
    const inputFieldText = inputField.value;
    fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputFieldText}`)
        .then(res => res.json())
        .then(data => {
            if(inputField.length === 0){
                emptyValueMsg.style.display = 'block';
                wrongValue.style.display = 'none';
            }
            else if(data.player === null){
                wrongValue.style.display = 'block';
                emptyValueMsg.style.display = 'none';
            }
            else{
                wrongValue.style.display = 'none';
                emptyValueMsg.style.display = 'none';
                displayData(data.player[0]);
            }
        });
    inputField.value = '';
}
const displayData = (playersName) => {
    const showResultDiv = document.getElementById('show-result-div');
    const div = document.createElement('div');
    console.log(playersName.strPlayer);
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 border-0">
            <img src="${playersName.strThumb}" class="card-img-top my-style img-fluid " alt="My pic">
            <div class="card-body">
                <h5 class="card-title">Name: ${playersName.strPlayer}</h5>
                <h6 class="card-title">Country: ${playersName.strNationality}</h6>
                <p class="card-text">${playersName.strDescriptionEN.slice(1, 200)}.....</p>
                <button class="btn btn-success" onclick="addPlayerMyTeam('${playersName.strPlayer}')">Add this player</button>
            </div>
        </div>
        `;
        showResultDiv.appendChild(div);
}

const addPlayerMyTeam = (selectedPlayer) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${selectedPlayer}`)
    .then(res => res.json())
    .then(data => selectedPlayerDisplay(data.player));
}

const selectedPlayerDisplay = (myPlayer) => {
    const showSelectedPlayers = document.getElementById('selected-players');
    const matchBtn = document.getElementById('match-btn');
    myPlayer.forEach(player => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 border-0">
            <img src="${player.strThumb}" class="card-img-top my-style img-fluid " alt="My pic">
            <div class="card-body">
                <h5 class="card-title">Name: ${player.strPlayer}</h5>
                <h6 class="card-title">Country: ${player.strNationality}</h6>
                <p class="card-text">${player.strDescriptionEN.slice(1, 200)}.....</p>
                <button class="btn btn-success" onclick="removePlayer('${div}')">Remove this player</button>
            </div>
        </div>
        `;
        showSelectedPlayers.appendChild(div);
        matchBtn.style.display = 'block';
    });
}
const removePlayer = (div) => {
    console.log(this.div);
    div.textContent = '';
}