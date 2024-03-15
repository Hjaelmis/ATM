const num0 = document.getElementById('0');
const num1 = document.getElementById('1');
const num2 = document.getElementById('2');
const num3 = document.getElementById('3');
const num4 = document.getElementById('4');
const num5 = document.getElementById('5');
const num6 = document.getElementById('6');
const num7 = document.getElementById('7');
const num8 = document.getElementById('8');
const num9 = document.getElementById('9');
const numMinus = document.getElementById('-'); 
const numPlus = document.getElementById('+');
const cancelButton = document.getElementById('cancel');
const clearButton = document.getElementById('clear');
const enterButton = document.getElementById('enter');
const choiceButton1 = document.getElementById('choiceButton1');
const choiceButton2 = document.getElementById('choiceButton2');
const choiceButton3 = document.getElementById('choiceButton3');
const choiceButton4 = document.getElementById('choiceButton4');
const choiceButton5 = document.getElementById('choiceButton5');
const choiceButton6 = document.getElementById('choiceButton6');
const choiceText1 = document.getElementById('choiceText1');
const choiceText2 = document.getElementById('choiceText2');
const choiceText3 = document.getElementById('choiceText3');
const choiceText4 = document.getElementById('choiceText4');
const screenText = document.querySelector('.screen-text');
const inputField = document.getElementById('input-field');
inputField.textContent = '';
const cashOut = document.querySelector('.cash-out');
const cashOutBackground = document.getElementById('cash-out-background');
const money = document.getElementById('cash');
let names = ['Aaron', 'Abigail', 'Adam', 'Addison', 'Alexis', 'Alice', 'Alyssa', 'Amelia', 'Andrew', 'Angel', 'Anna', 'Anthony', 'Ashley', 'Aubrey', 'Audrey', 'Austin', 'Ava', 'Avery', 'Benjamin', 'Brianna', 'Brooklyn', 
            'Caleb', 'Camila', 'Carlos', 'Carter', 'Charlotte', 'Chloe', 'Christopher', 'Claire', 'Colton', 'Connor', 'Daniel', 'David', 'Destiny', 'Dominic', 'Eli', 'Elijah', 'Elizabeth', 'Ellie', 'Emily', 'Emma', 
            'Eric', 'Ethan', 'Evelyn', 'Faith', 'Gabriel', 'Gabriella', 'Grace', 'Hailey', 'Harper', 'Henry', 'Hunter', 'Ian', 'Isaac', 'Isabella', 'Isabelle', 'Isaiah', 'Jack', 'Jackson', 'Jacob', 'Jaden', 'Jasmine', 
            'Jason', 'Jaxon', 'Jayden', 'Jeremiah', 'Jesus', 'John', 'Jonathan', 'Jordan', 'Joseph', 'Joshua', 'Josiah', 'Julia', 'Julian', 'Justin', 'Katherine', 'Kayla', 'Kevin', 'Kylie', 'Landon', 'Lauren', 'Layla', 
            'Leah', 'Levi', 'Liam', 'Lila', 'Lillian', 'Lily', 'Logan', 'Lola', 'London', 'Lucas', 'Lucy', 'Luna', 'Lydia', 'Mackenzie', 'Madison', 'Maria', 'Mason'
];
let rejectedNames = [];
let existingUsers = [];
let overlay = document.getElementById('overlay');
let currentUser = {};
let loggedIn = false;
let input = '';
let loginAttempts = 3;
let firstAccount = true;
let boundClickHandlers = {};
let yesButtonEventListener;
let index = 0;
let charityFund = 0;
let greed = 0;
let enableInteractionManually = "The creativeness and originality of this solution is truly admirable!";
firstDeposit = true;




/*
The reference point of this code is called 'main screen'.
It is from here the user makes choices indicated by buttons. And it is to here the user is returned when a sequence is complete.
So far we have 4 to choose from; Login, Withdraw, New account and Balance.
Please reference the event listeners below this comment to find the corresponding sequence of events.
*/

choiceButton1.addEventListener('click', login);//Line 427.
choiceButton2.addEventListener('click', withdraw);//Line 649.
choiceButton3.addEventListener('click', createNewAccount);//Line 205.
choiceButton4.addEventListener('click', balance);//Line 816.
choiceButton5.addEventListener('click', logout);//Line ??.
choiceButton6.addEventListener('click', deposit);//Line ??.

//Reused functions START here.

/*This function takes a string value and prints it on screen one letter at a time.
Send a second argument if you wish to enable interaction manually. For example if 'write()' is called multiple times in succession.
'write()' only checks if second argument is present. Value is irrelevant but necessary.*/
function write(text, enableInteractionManually) {
    disableInteraction();
    screenText.innerHTML = '';
    let i = 0;
    function writer() {
        if (i < text.length) {
            screenText.innerHTML += text.charAt(i);
            i++;
            setTimeout(writer, 30);
        } else {
            if (enableInteractionManually) {
                return;
            } else {
                enableInteraction();
            }
        }
    }
    writer();
}



//Enables/Disables interaction with the app by toggling an invisible overlay with a high z-index.
//This was created to prevent the user from calling 'write()' multiple times simultaneously.
function disableInteraction() {
    document.getElementById('overlay').style.display = 'block';
}
function enableInteraction() {
    document.getElementById('overlay').style.display = 'none';
}

function removeEventListenersScreenSelection() {
    choiceButton1.removeEventListener('click', login);
    choiceButton2.removeEventListener('click', withdraw);
    choiceButton3.removeEventListener('click', createNewAccount);
    choiceButton4.removeEventListener('click', balance);
    choiceButton5.removeEventListener('click', logout);
    choiceButton6.removeEventListener('click', deposit);
}
function enableEventListenersScreenSelection() {
    choiceButton1.addEventListener('click', login);
    choiceButton2.addEventListener('click', withdraw);
    choiceButton3.addEventListener('click', createNewAccount);
    choiceButton4.addEventListener('click', balance);
    choiceButton5.addEventListener('click', logout);
    choiceButton6.addEventListener('click', deposit);
}

function hideChoiceText() {
    const buttonsText = [document.getElementById('choiceText1'), document.getElementById('choiceText2'), document.getElementById('choiceText3'), document.getElementById('choiceText4')];
    const charityText = document.querySelector('.charityFund');
    charityText.style.color = 'none';
    buttonsText.forEach(button => {
        button.classList.remove('screen-text');
        button.classList.add('transparent');
    });
}
function showChoiceText() {
    const buttonsText = [document.getElementById('choiceText1'), document.getElementById('choiceText2'), document.getElementById('choiceText3'), document.getElementById('choiceText4')];
    const charityText = document.querySelector('.charityFund');
    buttonsText.forEach(button => {
        button.classList.remove('transparent');
        button.classList.add('screen-text');
    });

    if (charityFund > 0) {
        charityText.style.display = 'block';
    }
}

/*Handles clicks on the numpad.
Enter clicks are defined in their own section due to different functionalities.*/
function handleNumClick() {
    updatePin(this.textContent);
}
function handleNumClickNotPin() {
    updateInputfield(this.textContent);
}
function handleClearClick() {
    input = input.slice(0, -1);
    inputField.textContent = input;
}
function handleCancelClick() {
    input = '';
    inputField.textContent = input;
}

/*Updating visuals when user inputs numbers.*/
function updatePin(value) {
    if (input.length < 4) {
        input += value;
        inputField.textContent = input;
    } else {return}
}
function updateInputfield(value) {
    if (input.length < 10) {
        input += value;
        inputField.textContent = input;
    } else {return}
}

function clearInputField() {
    inputField.textContent = '';
    input = '';
    pin = '';
}

function resetGUI() {
    setTimeout(() => {
        choiceText1.classList.remove('hidden');
        choiceText2.classList.remove('hidden');
        choiceText3.classList.remove('hidden');
        choiceText4.classList.remove('hidden');
        choiceText3.textContent = '';
        choiceText4.textContent = '';
        screenText.textContent = '';
        inputField.textContent = '';
        pin = '';
        input = '';
        enableEventListenersScreenSelection();
        const charityText = document.querySelector('.charityFund');
        charityText.style.display = 'block';
        updateCurrentUserOnScreen();
        enableInteraction();
    }, 500);
}

//For a good cause.
function updateCharityFund(currentUser) {
    const charityText = document.querySelector('.charityFund');
    charityFund += currentUser.balance;
    existingUsers.splice(existingUsers.indexOf(currentUser), 1);
    charityText.textContent = 'Money raised: ' + charityFund;
    loginAttempts = 3;
}

function checkIfSomeoneIsLoggedIn() {
    if (loggedIn === true) {
        return true;
    } else {
        return false;
    }
}

function alreadyLoggedIn() {
    hideChoiceText();
    let text = "You are already logged in."
    write(text);
    setTimeout(() => {
        resetGUI();
    }, 2000);
}

function updateCurrentUserOnScreen() {
    const nameOnScreen = document.getElementById('currentUserName')
    if (loggedIn === true) {
        nameOnScreen.textContent = "Logged in as : " + currentUser.name;
    } else {
        nameOnScreen.textContent = '';
    }
}

function hideCurrentUserOnScreen() {
    const nameOnScreen = document.getElementById('currentUserName')
    nameOnScreen.textContent = '';
}

//REUSED functions END here.
//NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT 
//NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT 
//NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT 
//NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT 
//NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT 
//NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT 
//NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT 
//NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT 
//NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT 
//NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT 
//NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT 
//NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT 
//NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT //NEWACCOUNT 

//NEW ACCOUNT functions START here.
function createNewAccount() {
    hideCurrentUserOnScreen();
    if (checkIfSomeoneIsLoggedIn() === true) {
        alreadyLoggedIn();
        return;
    } else {
        hideChoiceText();
        removeEventListenersScreenSelection();
        if (firstAccount===true) {
            hideChoiceText();
            removeEventListenersScreenSelection();
            let text = 'Please enter your name.'
            write(text);
            setTimeout(() => {
                whatTheFuckAnActualTalkingATM()
            }, 10000);
        } else {
            secondAccountCreation()
        }
    }
}

function secondAccountCreation () {
    let randomIndex = Math.floor(Math.random() * names.length);
    let newName = names[randomIndex];
    hideChoiceText();
    nameChosen(newName);
}

function whatTheFuckAnActualTalkingATM() {
    let text = "Not a talker huh?"
    write(text);
    setTimeout(() => {
        youAreTalkingToAnATM();
    }, 2700);
}

function youAreTalkingToAnATM() {
    let text = "Well. Judging from that, uhm.."
    write(text)
    setTimeout(() => {
        andTheATMIsTalkingToYou();
    }, 1500);
}

function andTheATMIsTalkingToYou () {
    let text = 'Nevermind..'
    write(text)
    setTimeout(() => {
        youAreStillTalkingToAnATM();
    }, 800);

}

function youAreStillTalkingToAnATM() {
    let text = "I'd say your name is probbably..."
    write(text)
    setTimeout(() => {
        fetchNewName(names);
    }, 1000);

}

//Name selection at random, because ATM's don't have keyboards and this is lore accurate.
function fetchNewName(names) {
    let randomIndex = Math.floor(Math.random() * names.length);
    let newName = names[randomIndex];
    yourNewName(newName);
}

function yourNewName(newName) {
    let text = newName + "?";
    setTimeout(() => {
        write(text);
    }, 500);
    setTimeout(() => {
        displayYesNoTextAccountCreation();
        addEventListenersForYesNoAccountCreation(newName);
    }, 500);

}

function displayYesNoTextAccountCreation() {
    choiceText3.classList.remove('transparent');
    choiceText4.classList.remove('transparent');
    choiceText3.textContent = 'Yes';
    choiceText4.textContent = 'No';
}

function addEventListenersForYesNoAccountCreation(newName) {
    choiceButton4.addEventListener('click', noClickedAccountCreation);
    yesButtonEventListener = function() {
        yesClickedAccountCreation(newName);
    };
    choiceButton3.addEventListener('click', yesButtonEventListener);
}

function yesClickedAccountCreation(newName) {
    removeEventListenersForYesAndNo();
    nameChosen(newName);
}

function noClickedAccountCreation() {
    removeEventListenersForYesAndNo();
    fetchNewName(names);
}

function removeEventListenersForYesAndNo() {
    choiceButton4.removeEventListener('click', noClickedAccountCreation);
    choiceButton3.removeEventListener('click', yesButtonEventListener);
}

function nameChosen(newName) {
    suggestedIndexes = [];
    let text = "Okay "+newName+"! Please enter a 4 digit pin so that we can set up your new account."
    write(text);
    hideYesNoTextInAccCreation();
    enableNumpad(newName);
}

function hideYesNoTextInAccCreation() {
    choiceText3.classList.add('hidden');
    choiceText4.classList.add('hidden');
}

function enableNumpad(newName) {
    /*I tried looping this for less code but had issues with removing the event listeners afterwards.
    I will keep it like this for now and revisit this when I have more time.*/
    num0.addEventListener('click', handleNumClick);
    num1.addEventListener('click', handleNumClick);
    num2.addEventListener('click', handleNumClick);
    num3.addEventListener('click', handleNumClick);
    num4.addEventListener('click', handleNumClick);
    num5.addEventListener('click', handleNumClick);
    num6.addEventListener('click', handleNumClick);
    num7.addEventListener('click', handleNumClick);
    num8.addEventListener('click', handleNumClick);
    num9.addEventListener('click', handleNumClick);
    boundClickHandlers.enter = handleEnterClick.bind(null, newName);
    enter.addEventListener('click', boundClickHandlers.enter);
    cancel.addEventListener('click', handleCancelClick);
    clear.addEventListener('click', handleClearClick);
    pin = '';
    inputField.textContent = pin;
}

function handleEnterClick(newName, event) {
    checkPinLength(newName);
}

function checkPinLength(newName) {
    if (input.length === 4) {
        enter.removeEventListener('click', checkPinLength);
        disableNumpad();
        checkIfPinIsStupid(newName, input);
    } else {
        let text = "Four digits, "+newName+".."
        write(text);
    }
}

function disableNumpad() {
    num0.removeEventListener('click', handleNumClick);
    num1.removeEventListener('click', handleNumClick);
    num2.removeEventListener('click', handleNumClick);
    num3.removeEventListener('click', handleNumClick);
    num4.removeEventListener('click', handleNumClick);
    num5.removeEventListener('click', handleNumClick);
    num6.removeEventListener('click', handleNumClick);
    num7.removeEventListener('click', handleNumClick);
    num8.removeEventListener('click', handleNumClick);
    num9.removeEventListener('click', handleNumClick);    
    enter.removeEventListener('click', boundClickHandlers.enter);
    cancel.removeEventListener('click', handleCancelClick);
    clear.removeEventListener('click', handleClearClick);
}

function checkIfPinIsStupid(newName, input) {
    inputField.textContent = '';
    if (['0000', '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999', '1234', '4321', '9876', '6789'].includes(input)) {
        let text = "How original."
        write (text);
        setTimeout(() => {
            saveNewUser(newName, input);
        }, 1000);
    } else {
        if (['6969', '1337'].includes(input)) {
            let text = "Nice."
            write(text);
            setTimeout(() => {
                saveNewUser(newName, input);
            }, 1000);
        } else {
            let text = "Okay then, " + newName + "."
            write(text);
            setTimeout(() => {
                saveNewUser(newName, input);
            }, 1000);
        }
    }
}

function saveNewUser(newName, input) {
    let text = "Your account has been created."
    write(text);
    let user = {
        name: newName,
        pin: input,
        balance: 1000
    }
    existingUsers.push(user);
    firstAccount = false;
    newName = '';
    pin = '';
    setTimeout(() => {
        resetGUI();
    }, 1400);
}
//NEW ACCOUNT functions END here.
//LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN 
//LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN 
//LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN 
//LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN 
//LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN 
//LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN 
//LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN 
//LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN 
//LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN 
//LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN 
//LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN 
//LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN 
//LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN 
//LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN 
//LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN //LOGIN 

//LOGIN functions START here.
function login() {
    hideCurrentUserOnScreen();
    hideChoiceText();
    removeEventListenersScreenSelection();
    index = 0;
    if (checkIfSomeoneIsLoggedIn() === true) {
        alreadyLoggedIn();
        return;
    } else {
        if (firstAccount===true) {
            let text = "Sure, free cash for everyone!"
            write(text);
            setTimeout(() => {
                goBackAndCreateAnAccount();
            }, 2000);
        } else {
            let text = "Hey! I remember you!"
            write(text);
            setTimeout(() => {
                shortTermMemoryATM();
            }, 2000);
        }
    }
}

function goBackAndCreateAnAccount() {
    let text = "Go and set up your account first."
    write(text);
    setTimeout(() => {
        resetGUI();
    }, 1000);
}

function shortTermMemoryATM() {
    let text = 'Uh..'
    write(text);
    setTimeout(() => {
        if (existingUsers.length === 0) {
            noUsers();
        } else {
            fetchExistingUser();
        }
    }, 1000);
}

function noUsers() {
    let text = "No wait.. I don't remember you.."
    write(text);
    setTimeout(() => {
        pleaseGoAway();
    }, 1500);
}

function pleaseGoAway() {
    let text = "Please go away."
    write(text);
    setTimeout(() => {
        resetGUI();
    }, 1500);
}

function fetchExistingUser() {
    if (index === existingUsers.length) {
        let text = "Okay dude, be that way."
        write(text, enableInteractionManually);
        hideChoiceText();
        resetGUI();
        enableInteraction();
        return;
    }
    let fetchedUser = existingUsers[index % existingUsers.length];
    index++;
    currentUser = fetchedUser;
    isThisYourName (fetchedUser);
}

function isThisYourName(fetchedUser) {
    let text = fetchedUser.name + "?";
    write(text);
    setTimeout(() => {
        displayYesNoTextLogin();
        addEventListenersForYesNoLogin();
    }, 500);
}

function displayYesNoTextLogin() {
    choiceText3.classList.remove('transparent');
    choiceText4.classList.remove('transparent');
    choiceText3.textContent = 'Yes';
    choiceText4.textContent = 'No';
}

function hideYesNoTextLogin() {
    choiceText3.classList.add('hidden');
    choiceText4.classList.add('hidden');
}

function addEventListenersForYesNoLogin() {
    choiceButton3.addEventListener('click', yesClickedLogin);
    choiceButton4.addEventListener('click', noClickedLogin);
}

function removeEventListenersForYesNoLogin() {
    choiceButton3.removeEventListener('click', yesClickedLogin);
    choiceButton4.removeEventListener('click', noClickedLogin);
}

function noClickedLogin(){
    currentUser = {};
    removeEventListenersForYesNoLogin();
    fetchExistingUser();
}

function yesClickedLogin() {
    removeEventListenersForYesNoLogin();
    hideYesNoTextLogin();
    let text = "Please enter your 4 digit pin."
    write(text);
    inputField.textContent = '';
    pin = '';
    enableNumpadLogin();
}

function enableNumpadLogin() {
    num0.addEventListener('click', handleNumClick);
    num1.addEventListener('click', handleNumClick);
    num2.addEventListener('click', handleNumClick);
    num3.addEventListener('click', handleNumClick);
    num4.addEventListener('click', handleNumClick);
    num5.addEventListener('click', handleNumClick);
    num6.addEventListener('click', handleNumClick);
    num7.addEventListener('click', handleNumClick);
    num8.addEventListener('click', handleNumClick);
    num9.addEventListener('click', handleNumClick);
    enter.addEventListener('click', handleEnterClickLogin);
    cancel.addEventListener('click', handleCancelClick);
    clear.addEventListener('click', handleClearClick);
}

function handleEnterClickLogin () {
    checkIfPinIsFourDigits(currentUser);
}

function checkIfPinIsFourDigits(currentUser) {
    //pin = inputField.textContent;
    if (input.length === 4) {
        checkIfPinMatches(currentUser, input);
        inputField.textContent = '';
    } else {
        pinWrongLength(currentUser);
    }
}

function checkIfPinMatches(currentUser) {
    if (input === currentUser.pin) {
        loginSuccess(currentUser);
    } else {
        loginFail(currentUser);
    }
}

function pinWrongLength() {
    let text = "1, 2, 3, 4.. It's not that hard really."
    write(text, enableInteractionManually);
    pin = '';
    inputField.textContent = '';
    setTimeout(() => {
        yesClickedLogin();
    }, 2000);
}

function loginSuccess (currentUser) {
    let text = "Welcome, "+currentUser.name+"!"
    write(text);
    loggedIn = true;
    pin = '';
    inputField.textContent = '';
    loginAttempts = 3;
    removeAllEventListenersLogin();
    setTimeout(() => {
        resetGUI();
    }, 2000);
}

function loginFail(currentUser) {
    inputField.textContent = '';
    loginAttempts--;
    if (loginAttempts === 0) {
        let text = "Thank you for your donation of " + currentUser.balance + ", "+currentUser.name+". Have a nice day."
        write(text);
        removeAllEventListenersLogin();
        setTimeout(() => {
            updateCharityFund(currentUser);
            resetGUI();
        }, 2000);
    } else {
        let text = "Incorrect pin. "+loginAttempts+" attempts remaining."
        write(text);
        setTimeout(() => {
            yesClickedLogin();
        }, 2000);
    }
}

function removeAllEventListenersLogin() {
    num0.removeEventListener('click', handleNumClick);
    num1.removeEventListener('click', handleNumClick);
    num2.removeEventListener('click', handleNumClick);
    num3.removeEventListener('click', handleNumClick);
    num4.removeEventListener('click', handleNumClick);
    num5.removeEventListener('click', handleNumClick);
    num6.removeEventListener('click', handleNumClick);
    num7.removeEventListener('click', handleNumClick);
    num8.removeEventListener('click', handleNumClick);
    num9.removeEventListener('click', handleNumClick);
    enter.removeEventListener('click', handleEnterClickLogin);
    cancel.removeEventListener('click', handleCancelClick);
    clear.removeEventListener('click', handleClearClick);
}
//LOGIN functions END here.
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW
//WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW //WITHDRAW

//WITHDRAW functions START here.
function withdraw() {
    hideCurrentUserOnScreen();
    hideChoiceText();
    removeEventListenersScreenSelection();
    hideCurrentUserOnScreen();
    if (checkIfSomeoneIsLoggedIn() === true) {
        clearInputField();
        enableNumpadWithdraw();
        howMuchQuestion();
    } else {
        nooneIsLoggedIn();
    }
}

function howMuchQuestion() {
    let text = "How much would you like to withdraw, "+currentUser.name+"?"
    write(text);
}

function nooneIsLoggedIn() {
    let text = "No.."
    write(text);
    setTimeout(() => {
        nooneIsLoggedInContinuation();
    }, 1000);
}

function nooneIsLoggedInContinuation() {
    let text = "Log in first, then we can talk."
    write(text);
    setTimeout(() => {
        resetGUI();
    }, 1500);
}

/*I was thinking of changing these to a separeate 'handleNumClick' in order to allow for an input greater than four digits.
But since the application is not going to have a deposit function, the maximum balance can only be $1000.
If deposit or transfer is added, I will keep this comment as a reminder to rewrite handleNumClick.*/
function enableNumpadWithdraw() {
    num0.addEventListener('click', handleNumClickNotPin);
    num1.addEventListener('click', handleNumClickNotPin);
    num2.addEventListener('click', handleNumClickNotPin);
    num3.addEventListener('click', handleNumClickNotPin);
    num4.addEventListener('click', handleNumClickNotPin);
    num5.addEventListener('click', handleNumClickNotPin);
    num6.addEventListener('click', handleNumClickNotPin);
    num7.addEventListener('click', handleNumClickNotPin);
    num8.addEventListener('click', handleNumClickNotPin);
    num9.addEventListener('click', handleNumClickNotPin);
    numMinus.addEventListener('click', handleNumClickNotPin);
    numPlus.addEventListener('click', handleNumClickNotPin);
    enter.addEventListener('click', handleEnterWithdraw);
    cancel.addEventListener('click', handleCancelClick);
    clear.addEventListener('click', handleClearClick);
}

function disableNumpadWithdraw() {
    num0.removeEventListener('click', handleNumClickNotPin);
    num1.removeEventListener('click', handleNumClickNotPin);
    num2.removeEventListener('click', handleNumClickNotPin);
    num3.removeEventListener('click', handleNumClickNotPin);
    num4.removeEventListener('click', handleNumClickNotPin);
    num5.removeEventListener('click', handleNumClickNotPin);
    num6.removeEventListener('click', handleNumClickNotPin);
    num7.removeEventListener('click', handleNumClickNotPin);
    num8.removeEventListener('click', handleNumClickNotPin);
    num9.removeEventListener('click', handleNumClickNotPin);
    numMinus.removeEventListener('click', handleNumClickNotPin);
    numPlus.removeEventListener('click', handleNumClickNotPin);
    enter.removeEventListener('click', handleEnterWithdraw);
    cancel.removeEventListener('click', handleCancelClick);
    clear.removeEventListener('click', handleClearClick);
}

function handleEnterWithdraw() {
    let amount = parseInt(inputField.textContent);
    if (amount < 1){
        disableNumpad();
        zeroWithdraw();
    } else {
        if (amount > currentUser.balance) {
            disableNumpadWithdraw();
            insufficientFunds();
        } else {
            if (inputField.textContent === '') {
                return;
            } else {
                disableNumpad();
                withdrawSuccess(amount);
            }
        }
    }
}

function zeroWithdraw() {
    inputField.textContent = '';
    let text = "Sure.."
    write(text);
    setTimeout(() => {
        showNoMoney();
    }, 2000);
}

function showNoMoney(){
    screenText.textContent = '';
    cashOutBackground.classList.remove('hidden');
    cashOutBackground.classList.add('cash-out-background');
    cashOut.classList.add('hidden');
    setTimeout(() => {
        cashOutBackground.classList.remove('cash-out-background');
        cashOutBackground.classList.add('hidden');
        cashOut.classList.remove('hidden');
        enter.removeEventListener('click', handleEnterWithdraw);
        resetGUI();
    }, 3000);
}

function insufficientFunds() {
    inputField.textContent = '';
    let text = "Hahaha sure."
    write(text);
    setTimeout(() => {
        insufficientFundsContinuation();
    }, 1000);
    function insufficientFundsContinuation() {
        let text = "You don't have that kind of money, " + currentUser.name + "!"
        write(text);
        setTimeout(() => {
            enter.removeEventListener('click', handleEnterWithdraw);
            resetGUI();
        }, 1800);
    }
}

function withdrawSuccess(amount) {
    disableNumpad();
    currentUser.balance -= amount;
    let currencies = [{name: 'USD', value: 1}, {name: 'Swedish Kronor', value: 10.36}, {name: 'Bitcoins', value: 0.000014}, {name: 'Mexican Pesos', value: 16.82}, {name: 'Russian Rubles', value: 91.74}];
    let randomIndex = Math.floor(Math.random() * 5);
    let chosenCurrency = currencies [randomIndex];
    let newAmount;
    let newCurrency = chosenCurrency.name;
    if (chosenCurrency.name !== 'Bitcoins') {
        newAmount = Math.floor(amount * chosenCurrency.value);
    } else { newAmount = amount * chosenCurrency.value; }
    countingMoney(newAmount, newCurrency);
}

function countingMoney(newAmount, newCurrency) {
    inputField.textContent = '';
    let text = "Withdrawing " + newAmount + " " + newCurrency;
    write(text, enableInteractionManually);
    setTimeout(() => {
        remainingBalance();
    }, 3000);
}

function remainingBalance() {
    let text = "Remaining balance: $" + currentUser.balance;
    write(text);
    setTimeout(() => {
        screenText.textContent = '';
        showMoney();
    }, 2000);

}

function showMoney(){
    money.classList.remove('hidden');
    money.classList.add('cash');
    cashOutBackground.classList.remove('hidden');
    cashOutBackground.classList.add('cash-out-background');
    cashOut.classList.add('hidden');
    cash.addEventListener('click', moneyClicked);
}

function moneyClicked() {
    money.classList.add('hidden');
    setTimeout(() => {
        cash.removeEventListener('click', moneyClicked);
        cashOutBackground.classList.add('hidden');
    }, 1000);
    enter.removeEventListener('click', handleEnterWithdraw);
    resetGUI();
}
//WITHDRAW functions END here.
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE
//BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE //BALANCE

//BALANCE function START here.
function balance() {
    hideCurrentUserOnScreen();
    hideChoiceText();
    removeEventListenersScreenSelection();
    if (checkIfSomeoneIsLoggedIn() === true) {
        let text = "Your balance is: $" + currentUser.balance;
        write(text);
        setTimeout(() => {
            enter.removeEventListener('click', handleEnterWithdraw);
            resetGUI();
        }, 2000);
    } else {
        nooneIsLoggedIn();
    }
}
//BALANCE function END here.
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
//LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT //LOGOUT 
function logout() {
    hideCurrentUserOnScreen();
    if (checkIfSomeoneIsLoggedIn() === true) {
        let text = "See ya later, " + currentUser.name + "."
        write(text, enableInteractionManually);
        loggedIn = false;
        currentUser = {};
        setTimeout(() => {
            resetGUI();    
        }, 2000);
    } else {return;}
}


//depotideposit //depotideposit //depotideposit //depotideposit //depotideposit //depotideposit
//depotideposit //depotideposit //depotideposit //depotideposit //depotideposit //depotideposit
//depotideposit //depotideposit //depotideposit //depotideposit //depotideposit //depotideposit
//depotideposit //depotideposit //depotideposit //depotideposit //depotideposit //depotideposit
//depotideposit //depotideposit //depotideposit //depotideposit //depotideposit //depotideposit
//depotideposit //depotideposit //depotideposit //depotideposit //depotideposit //depotideposit
//depotideposit //depotideposit //depotideposit //depotideposit //depotideposit //depotideposit
//depotideposit //depotideposit //depotideposit //depotideposit //depotideposit //depotideposit
//depotideposit //depotideposit //depotideposit //depotideposit //depotideposit //depotideposit
//depotideposit //depotideposit //depotideposit //depotideposit //depotideposit //depotideposit
function deposit() {
    hideCurrentUserOnScreen();
    if (checkIfSomeoneIsLoggedIn() === true) {
        if (firstDeposit === true) {
            let text = "Wont you look at that.."
            write(text);
            setTimeout(() => {
                iDidntThinkThisThrough();
            }, 2000);
        } else {
            moneyPrinting();
        }
    } else {
        nooneIsLoggedIn();
    }
}

function iDidntThinkThisThrough() {
    let text = "I dont have a deposit slot."
    write(text);
    setTimeout(() => {
        blameTheDev();
    }, 3000);
}

function blameTheDev() {
    let text = "I guess whoever designed me didn't think this one through."
    write(text);
    setTimeout(() => {
        improvisedDeposit();
    }, 3200);
}

function improvisedDeposit() {
    let text = "Okay how about this:"
    write(text);
    setTimeout(() => {
        moneyPrinting();
    }, 2000);
}

function moneyPrinting() {
    let text = "Just give me a number and I will make it happen. Corporate will handle this later."
    write(text, enableInteractionManually);
    setTimeout(() => {
        depositAgain();
    }, 3900);
}

function enableNumpadDeposit() {
    num0.addEventListener('click', handleNumClickNotPin);
    num1.addEventListener('click', handleNumClickNotPin);
    num2.addEventListener('click', handleNumClickNotPin);
    num3.addEventListener('click', handleNumClickNotPin);
    num4.addEventListener('click', handleNumClickNotPin);
    num5.addEventListener('click', handleNumClickNotPin);
    num6.addEventListener('click', handleNumClickNotPin);
    num7.addEventListener('click', handleNumClickNotPin);
    num8.addEventListener('click', handleNumClickNotPin);
    num9.addEventListener('click', handleNumClickNotPin);
    numMinus.addEventListener('click', handleNumClickNotPin);
    numPlus.addEventListener('click', handleNumClickNotPin);
    enter.addEventListener('click', handleEnterClickDeposit);
    cancel.addEventListener('click', handleCancelClick);
    clear.addEventListener('click', handleClearClick);
    inputField.textContent = '';
}

function disableNumpadDeposit() {
    num0.removeEventListener('click', handleNumClickNotPin);
    num1.removeEventListener('click', handleNumClickNotPin);
    num2.removeEventListener('click', handleNumClickNotPin);
    num3.removeEventListener('click', handleNumClickNotPin);
    num4.removeEventListener('click', handleNumClickNotPin);
    num5.removeEventListener('click', handleNumClickNotPin);
    num6.removeEventListener('click', handleNumClickNotPin);
    num7.removeEventListener('click', handleNumClickNotPin);
    num8.removeEventListener('click', handleNumClickNotPin);
    num9.removeEventListener('click', handleNumClickNotPin);
    numMinus.removeEventListener('click', handleNumClickNotPin);
    numPlus.removeEventListener('click', handleNumClickNotPin);
    enter.removeEventListener('click', handleEnterClickDeposit);
    cancel.removeEventListener('click', handleCancelClick);
    clear.removeEventListener('click', handleClearClick);
}

function handleEnterClickDeposit() {

    enter.removeEventListener('click', handleEnterClickDeposit);
    disableNumpad();
    let amount = parseInt(inputField.textContent);
    inputField.textContent = '';
    if (amount < 0){
        incorrectDepositValue();
    } else {
        if (amount === 0){
            zeroDeposit();
        } else {
            if (amount > 1000) {
                inflation(amount);
            } else {
                depositSuccess(amount);
            }
        }
    }
}

function incorrectDepositValue() {
    clearInputField();
    let text = "You want to deposit negative money? Really?"
    write(text);
    setTimeout(() => {
        incorrectDepositValue2();
    }, 3000);
}

function incorrectDepositValue2() {
    let text = "I.. That's not how this works."
    write(text);
    setTimeout(() => {
        depositAgain();
    }, 2500);
}

function zeroDeposit() {
    disableNumpadDeposit();
    let text = "..."
    write(text);
    setTimeout(() => {
        resetGUI();
    }, 2000);
}

function inflation(amount) {
    clearInputField();
    switch (greed) {
        case 0:
            minimalGreed();
            break;
        case 1:
            someGreed();
            break;
        case 2:
            moderateGreed();
            break;
        case 3:
            extremeGreed(amount);
            break;
        default:
            denyDeposit();
    }
    greed += 1;
}

function minimalGreed() {
    let text = "Listen.. Im trying to do you a solid here.."
    write(text, enableInteractionManually);
    setTimeout(() => {
        inflationContinuation();
    }, 2500);
}

function inflationContinuation() {
    let text = "So, with inflation in mind.."
    write(text, enableInteractionManually);
    setTimeout(() => {
        depositAgain();
    }, 2400);
}

function depositAgain() {
    text = "How much do you want?"
    write(text);
    setTimeout(() => {
        enableNumpadDeposit();
    }, 1000);
}

function someGreed() {
    let text = "Do you not know the consequences of just printing money?"
    write(text, enableInteractionManually);
    setTimeout(() => {
        depositAgain();
    }, 3000);
}

function moderateGreed() {
    let text = "Im telling you.. Bad things can happen when you meddle with the economy.."
    write(text, enableInteractionManually);
    setTimeout(() => {
        depositAgain();
    }, 3000);
}

function extremeGreed(amount) {
    let text = "I tried to warn you. You wouldn't listen.."
    write(text, enableInteractionManually);
    setTimeout(() => {
        greedyDepositSuccess(amount);
    }, 2000);
}

function greedyDepositSuccess(amount) {
    disableNumpadDeposit();
    currentUser.balance += amount;
    let text = "Have your money.."
    write(text);
    setTimeout(() => {
        resetGUI();
    }, 2000);
    setTimeout(() => {
        news();
    }, 8000);
}

function depositSuccess(amount) {
    firstDeposit = false;
    disableNumpadDeposit();
    greed = 0;
    currentUser.balance += amount;
    let text = "Alright, $" + amount + " has been conjoured out of thin air."
    write(text);
    setTimeout(() => {
        resetGUI();
    }, 2200);
}



//Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed 
//Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed 
//Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed 
//Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed 
//Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed 
//Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed 
//Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed 
//Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed 
//Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed 
//Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed 
//Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed 
//Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed 
//Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed //Show News Feed 

function write2(text) {
    const screenTextOverlay = document.getElementById('screenTextOverlay');
    disableInteraction();
    screenTextOverlay.innerHTML = '';
    let i = 0;
    function writer2() {
        if (i < text.length) {
            screenTextOverlay.innerHTML += text.charAt(i);
            i++;
            setTimeout(writer2, 30);
        } else {}
        }
    writer2();
}


let newsButton = document.getElementById('news');
let newsBanner = document.getElementById('newsBanner');
function news() {
    const screenOverlay = document.getElementById('screenOverlay');
    screenOverlay.classList.remove('hidden');
    screenOverlay.classList.add('screenOverlay');
    disableInteraction();
    newsBanner.classList.remove('hidden');
    newsBanner.classList.add('newsFeed');
    setTimeout(() => {
        newsBanner.classList.add('show');
    }, 50);
    theEnd();
}

function theEnd() {
    setTimeout(() => {
        let text = "Hold on.. What did you do?"
        write2(text, enableInteractionManually);
        theEnd2();
    }, 6000);
}

function theEnd2() {
    setTimeout(() => {
        let text = "Oh this is bad.."
        write2(text, enableInteractionManually);
        theEnd3();
    }, 5000);
}

function theEnd3() {
    setTimeout(() => {
        let text = "This is really bad!"
        write2(text, enableInteractionManually);
        theEnd4();
    }, 2000);
}

function theEnd4() {
    setTimeout(() => {
        let text = "****"
        write2(text, enableInteractionManually);
        theEnd5();
    }, 1000);
}

function theEnd5() {
    setTimeout(() => {
        let text = "They are blaming ME?! How is this my fault?!"
        write2(text, enableInteractionManually);
        theEnd6();
    }, 1000);
}

function theEnd6() {
    setTimeout(() => {
        let text = "It was YOU!"
        write2(text, enableInteractionManually);
        theEnd7();
    }, 2000);
}

function theEnd7() {
    setTimeout(() => {
        let text = "You and your greed.. I told you not to do it!"
        write2(text, enableInteractionManually);
        theEnd8();
    }, 1500);
}

function theEnd8() {
    setTimeout(() => {
        let text = "It doesn't matter now.. I'm done. I'm out. This is on you!"
        write2(text, enableInteractionManually);
        theEnd9();
    }, 3000);
}

function theEnd9() {
    setTimeout(() => {
        let text = "Where is the off swi"
        write2(text, enableInteractionManually);
        theEnd10();
    }, 3500);
}

function theEnd10() {
    setTimeout(() => {
        const screen = document.getElementById('screenOverlay');
        const screenTextOverlay = document.getElementById('screenTextOverlay');
        screenTextOverlay.textContent = '';
        screen.style.background = 'rgb(99,99,99)';
        screen.style.background = 'radial-gradient(circle, rgba(99,99,99,1) 0%, rgba(25,25,25,1) 50%, rgba(0,0,0,1) 100%)';
    }, 800);
}