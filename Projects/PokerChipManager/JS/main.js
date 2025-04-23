//index
if(document.URL.includes("Index.html")){
    //variables
    let players = [];
    let maxPlayers = 6;
    let minPlayers = 2;
    let currentPlayers = minPlayers;
    let startMoney = 10;

    //html refferences
    const add_player = document.getElementById("addPlayer");
    const subtract_player = document.getElementById("subtractPlayer");
    const start_game = document.getElementById("startGame");
    const playercount = document.getElementById("playerCountDisplay");
    const add_money10 = document.getElementById("addMoney10");
    const subtract_money10 = document.getElementById("subtractMoney10");
    const add_money100 = document.getElementById("addMoney100");
    const subtract_money100 = document.getElementById("subtractMoney100");
    const moneycount = document.getElementById("startMoneyDisplay");
    const randomNameButton = document.getElementById("randomName");

    //html inputs
    add_player.addEventListener("click", addPlayer);
    subtract_player.addEventListener("click", removePlayer);
    start_game.addEventListener("click", startGame);
    add_money10.addEventListener("click", addMoney10);
    subtract_money10.addEventListener("click", subtractMoney10);
    add_money100.addEventListener("click", addMoney100);
    subtract_money100.addEventListener("click", subtractMoney100);
    randomNameButton.addEventListener("click", randomName);

    class Player {
        constructor(name, initialBalance) {
            this.name = name;
            this.wallet = initialBalance;
        }
        withdraw(amount) {
            this.wallet -= amount;
        }
        deposit(amount) {
            this.wallet += amount;
        }
        getBalance() {
            return this.wallet;
        }
        transfer(target, amount) {
            this.withdraw(amount);
            target.deposit(amount);
        }
    }
    function startGame() {
        players = [];
        for(let i = 0; i < currentPlayers; i++) {
            if(randomNameButton.checked){
                players.push(new Player(randomName(), startMoney));
            }
            else{
                players.push(new Player("Player " + (i + 1), startMoney));
            }
        }
        console.log(players);

        //store players in localStorage as a JASON file
        localStorage.setItem("players", JSON.stringify(players));

        //redirect to Table.html
        window.location.href = "Table.html";
    }
    
    //player mannagment
    function addPlayer() {
        if (currentPlayers >= maxPlayers) {
            currentPlayers = maxPlayers;
        }
        else{
            currentPlayers++;
        }
        updatePlayerCount()
    }
    function removePlayer() {
        if (currentPlayers <= minPlayers) {
            currentPlayers = minPlayers;
        }
        else {
            currentPlayers--;
        }
        updatePlayerCount()
    }
    
    //money mannagment
    function addMoney10() {
        startMoney += 10;
        updateMoneyCount();
    }
    function subtractMoney10() {
        startMoney -= 10;
        if (startMoney < 10) {
            startMoney = 10;
        }
        updateMoneyCount();
    }
    function addMoney100() {
        startMoney += 100;
        updateMoneyCount();
    }
    function subtractMoney100() {
        startMoney -= 100;
        if (startMoney < 100) {
            startMoney = 10;
        }
        updateMoneyCount();
    }
    
    //random name selector
    function randomName() {
        const names = [
            "Eren", "Naruto", "Luffy", "Ichigo", "Light", "Goku", 
            "Denji", "Itadori", "Edward", "Tanjiro", "Mob", "Rudy", 
            "Shinji", "Frieren", "Thorfinn", "Emma", "Violet"];
    
        //takes a random name from the list
        let name = names[Math.floor(Math.random() * names.length)];

        //removes used name from name list
        names.splice(names.indexOf(name), 1);
        return name;
    }
    
    //update
    function updatePlayerCount() {
        playercount.textContent = currentPlayers;
    }
    function updateMoneyCount() {
        moneycount.textContent = startMoney;
    }
    
    updateMoneyCount();
    updatePlayerCount();
}

//Table
if(document.URL.includes("Table.html")){
    //variables
    let players = [];

    // Retrievs the players from localStorage and adds them to the players array
    const storedPlayers = localStorage.getItem("players");
    if (storedPlayers) {
        players.push(...JSON.parse(storedPlayers));
    }
    else{
        alert("No players found in localStorage.");
        window.location.href = "Index.html";
    }

    createPlayerDivs();

    function createPlayerDivs() {
        const container = document.createElement("div");
        container.className = "playerContainer";

        for (let i = 0; i < players.length; i++) {
            const playerDiv = document.createElement("div");
            const buttonContainer = document.createElement("div");

            //player info display
            playerDiv.className = "playerDiv";
            playerDiv.textContent = players[i].name + " Wallet: " + players[i].wallet + "$";


            //buttons
            buttonContainer.className = "buttonContainer";
            const depositButton = document.createElement("button");
            depositButton.textContent = "Deposit";
            buttonContainer.appendChild(depositButton);

            const withdrawButton = document.createElement("button");
            withdrawButton.textContent = "Withdraw";
            buttonContainer.appendChild(withdrawButton);

            playerDiv.appendChild(buttonContainer);
            container.appendChild(playerDiv);
        }
        //add the container to the body
        document.body.appendChild(container);
    }
}