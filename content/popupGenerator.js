
let mainCategoryIcon, subCategoryIcon, overlay, iconContainer, overlayBox, informationText, acceptButton, declineButton,
    buttonContainer, lastShownTimestamp, currentMainIcon, currentSubIcon, reasonInput, questionText;

let currentTime = Date.now();


chrome.storage.local.get('lastShownTimestamp', function(result) {
   // if((currentTime - result['lastShownTimestamp']) / 1000 >= 3600) {
       createOverlay();
       createOverlayBox();
       createIcons();
       createButtons();
       createInformationText();
       createInputField();
       createQuestion();
       appendAllChildren();
       setNewTimestamp();

       on();
   // }
});

function createInputField() {
    reasonInput = document.createElement('textarea');
    reasonInput.setAttribute('id', 'reason-input');
    reasonInput.setAttribute('placeholder', 'Bitte Grund für ihre Auswahl eingeben');
    reasonInput.setAttribute('rows', '5');
    reasonInput.addEventListener('input', function() {
      if(reasonInput.value.trim().length > 0) {
        acceptButton.setAttribute('id', 'accept-button');
        declineButton.setAttribute('id', 'decline-button')
      }
    });

}

function createButtons() {
    createAcceptButton();
    createDeclineButton();
    createButtonContainer();
}

function createButtonContainer() {
    buttonContainer = document.createElement('div');
    buttonContainer.classList.add('row');
    buttonContainer.appendChild(acceptButton);
    buttonContainer.appendChild(declineButton);
    buttonContainer.setAttribute('id', 'buttonContainer');
}

function createAcceptButton() {
    acceptButton = document.createElement('button');
    acceptButton.innerHTML = "Annehmen";
    acceptButton.setAttribute('id', 'accept-button-inactive');
    acceptButton.classList.add('fs-button');
    acceptButton.addEventListener('click', function () {
        createNewLogEntry(true);
    });
}

function createDeclineButton() {
    declineButton = document.createElement('button');
    declineButton.innerHTML = "Ablehnen";
    declineButton.classList.add('fs-button');
      declineButton.setAttribute('id', 'decline-button-inactive');
    declineButton.addEventListener('click', function () {
        createNewLogEntry(false);
    });
}

function createQuestion() {
  questionText = document.createElement('h4');
  questionText.innerHTML =  "Möchten Sie das zulassen?"
}

function createInformationText() {
    informationText = document.createElement('h4');
}

function createOverlayBox() {
    overlayBox = document.createElement('div');
    overlayBox.setAttribute('id', 'overlayBox');
}

function appendAllChildren() {
    overlay.appendChild(overlayBox);
    overlayBox.appendChild(iconContainer);
    overlayBox.appendChild(informationText);
    overlayBox.appendChild(questionText);
    overlayBox.appendChild(reasonInput);
    overlayBox.appendChild(buttonContainer);
    document.body.appendChild(overlay);
}

function createOverlay() {
    overlay = document.createElement('overlay');
    overlay.setAttribute('id', 'overlay');
}

function createIcons() {
    mainCategoryIcon = document.createElement('img');
    subCategoryIcon = document.createElement('img');
    setupIconContainer();
    setupIcons();
}

function setupIcons() {
    chooseMainIcon();
}

function setupIconContainer() {
    iconContainer = document.createElement('div');
    iconContainer.classList.add('row');
    iconContainer.setAttribute('id', 'iconContainer');
    iconContainer.appendChild(mainCategoryIcon);
    iconContainer.appendChild(subCategoryIcon);
}


function displayMainIcon() {
    setMainIconAsUsed();
    chooseSubIcon();

    mainCategoryIcon.setAttribute('src', chrome.runtime.getURL(currentMainIcon['imagePath']));
    mainCategoryIcon.setAttribute('id', 'mainCategoryIcon');
}

function displaySubIcon() {
    setSubIconAsUsed();
    setIconDescription();

    subCategoryIcon.setAttribute('src', chrome.runtime.getURL(currentSubIcon['imagePath']));
    subCategoryIcon.setAttribute('id', 'subCategoryIcon');
}

function setIconDescription() {
    let description = "" + currentMainIcon['description'] + "</br></br>" + currentSubIcon['description'];
    informationText.innerHTML = description;
}



function setNewTimestamp() {
    chrome.storage.local.set({'lastShownTimestamp': Date.now().valueOf()}, function() {

    });
}

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}
