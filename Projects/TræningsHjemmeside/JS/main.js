//--setup--
//universal variables
let accounts = []; 
let usedNames = [];
let score = 0;

class User{
    constructor(userName, password, displayName, score){
        this.userName = userName;
        this.password = password;
        this.displayName = displayName;
        this.score = score;
    }
    userName = "";
    password = "";
    displayName = "";
    score = 0;
}

//checks if local storage is empty if so then adds the accounts and used names
if(localStorage.getItem("accounts") == null){
    localStorage.setItem("accounts", JSON.stringify(accounts));
}
if(localStorage.getItem("usedNames") == null){
    localStorage.setItem("usedNames", JSON.stringify(usedNames));
}



//gets the accounts and used names from local storage and adds them to the corresponding array
accounts = JSON.parse(localStorage.getItem("accounts"));
usedNames = JSON.parse(localStorage.getItem("usedNames"));
//-----------



//--main code--
//leaderboard page
if(document.URL.includes("leaderboard.html")){
    //global variables
    const addRow = document.getElementById("submit");
    const addScore = document.getElementById("addScore");
    const removeScore = document.getElementById("removeScore");
    const cls = document.getElementById("cls");
    const leaderboard = document.getElementById("leaderboard");

    const currentDate = new Intl.DateTimeFormat('en-GB', { //gets the current date (EU format)
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    }).format(new Date());


    //debugging
    logAll();

    updateLeaderboard();

    //--buttons--
    //runs the addEntry function when the submit button is pressed
    addRow.addEventListener("click", () => addEntry());

    //adds or removes score on button press
    addScore.addEventListener("click", () => updateScore(1));
    removeScore.addEventListener("click", () => updateScore(-1));

    //runs clearLocalStorage() on button press
    cls.addEventListener("click", () => clearLocalStorage());
    //----------


    //adds an entry to the leaderboard and resets the score
    function addEntry() {
        let currentUser = getUser();
    
        if (score == 0) {
            alert("No score was registered");
        } else if (currentUser != undefined) {
            addLeaderbordRow(currentUser.displayName, score, currentDate);
    
            //update the user's score
            currentUser.score = score;
    
            //find the index of the user in the accounts array
            let index = accounts.findIndex(acc => acc.userName === currentUser.userName);
            if (index !== -1) {
                accounts.splice(index, 1); //remove old entry
            }

            //add updated user object
            accounts.push(new User(currentUser.userName, currentUser.password, currentUser.displayName, score));
            localStorage.setItem("accounts", JSON.stringify(accounts));

            score = 0;
            console.log(accounts);
            location.reload();
        }
        updateScore(0);
    }

    //adds an entry to the leaderboard
    function addLeaderbordRow(name, score, date){
        let row = leaderboard.insertRow(1);

        let nameCell = row.insertCell(0);
        nameCell.innerHTML = name;
        nameCell.className = "Leaderboard_box";

        let scoreCell = row.insertCell(1);
        scoreCell.innerHTML = score;
        scoreCell.className = "Leaderboard_box";

        let dateCell = row.insertCell(2);
        dateCell.innerHTML = date;
        dateCell.className = "Leaderboard_box";
    }

    //returns the user that logging in
    function getUser(){
        //gets the name and password from the text input
        let userName = document.getElementById("logOnUserName").value;
        let password = document.getElementById("logOnPassword").value;

        //checks if there is something in the inputs
        if(userName == ""){
            alert("Please insert a name in the text input");
            return;
        }
        else if(password == ""){
            alert("Please insert a password in the text input");
            return;
        }


        //checks if the account exists
        a = [];
        for(let i = 0; i < accounts.length; i++){
            a.push(accounts[i].displayName);
        }
        if(!a.includes(userName)){
            alert("Can not find this user");
            return;
        }

        //finds the user
        for(let i = 0; i < accounts.length; i++){
            if(accounts[i].displayName == userName && accounts[i].password == password){
                return accounts[i];
            }
        }
        //checks if the username is wrong
        for(let i = 0; i < accounts.length; i++){
            if(accounts[i].userName != userName || accounts[i].password != password){
                alert("Wrong username or password (The username and password is case sensitive)");
                return;
            }
        }
    }

    //adds all previous leaderboard entries to the table
    function updateLeaderboard(){
        for(let i = 0; i < accounts.length; i++){
            if(accounts[i].score != 0){
                addLeaderbordRow(accounts[i].displayName, accounts[i].score, currentDate);
            }
        }
    }
}



//--create user page--
if(document.URL.includes("createUser.html")){
    let accountsS = accounts;
    let usedNamesS = usedNames;
    const createUserButton = document.getElementById("create");

    //debugging
    console.log("accounts");
    console.log(accounts);

    //runs createNewUser function on button press
    createUserButton.addEventListener("click", () => createNewUser())

    function createNewUser(){
        let userName = document.getElementById("userName").value;
        let password = document.getElementById("password").value;
        const displayName = userName;

        //tjecks if the name has the right requirements
        if(userName == ""){
            alert("Please insert a name in the text input");     
        }
        else if(usedNames.includes(noSpace(userName))){
            alert("This name is already in use");
        }
        else if(userName.length > 25){
            alert("This name is longer than 25 characters");
        }

        //checks if the password has the right requrements
        else if(password.includes(" ")){
            alert("Do not use spaces in your password");
        }
        else if(password.length < 6){
            alert("You need more than 6 characters in your password");
        }

        else{
            //adds a new user to the accounts array
            accountsS.push(new User(noSpace(userName), password, displayName, 0));
            
            //adds the name to an array of used names and clears the variables
            usedNamesS.push(noSpace(userName));
            userName = "";
            password = "";

            //sends the accounts and used names to the local storage
            localStorage.setItem("accounts", JSON.stringify(accountsS));
            localStorage.setItem("usedNames", JSON.stringify(usedNamesS));

            alert("User created");

            console.log(accounts);
        }
    }
}
//--------------------



//--other functions--
//removes spaces
function noSpace(str){
    return str.replace(/\s+/g, "");
}

//updates the score label
function updateScore(addToScore){
    if(addToScore != 0){
        score += addToScore;
    }
    document.getElementById("score").innerHTML = "Score: " + score;
}
//-------------



//--debugging functions--
//clears local storage if the username and password is "clearLocalStorage"
function clearLocalStorage(){
    let accountsS = accounts;
    let usedNamesS = usedNames;

    localStorage.clear();
    accounts = [];
    usedNames = [];
    accountsS = [];
    usedNamesS = [];
    logAll();
}

//logs the accounts and used names in the console
function logAll(){
    let accountsS = accounts;
    let usedNamesS = usedNames;

    console.log("-------------Logged-------------");
    console.log("accounts");
    console.log(accounts);
    console.log("usedNames");
    console.log(usedNames);
    console.log("accountsS");
    console.log(accountsS);
    console.log("usedNamesS");
    console.log(usedNamesS);
    console.log("local storage");
    console.log(localStorage);
    console.log("---------------------------------");
}
//-----------------------