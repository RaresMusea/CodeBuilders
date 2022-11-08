//contactFormValidation.js->Validates the contact form found on Contact page.
//DOM Manipulation
const submit = document.querySelector('.submitFormButton');
const firstName = document.getElementById('firstNameInput');
const firstNameLabel = document.getElementById('firstNameLabel');
const lastName = document.getElementById('lastNameInput');
const lastNameLabel = document.getElementById('lastNameLabel');
const emailAddress = document.getElementById('emailInput');
const emailAddressLabel = document.getElementById('emailLabel');
const dropdownList = document.getElementById('dropdown');
const dropdownLabel = document.getElementById('dropdownLabel');
const message = document.getElementById('textMessage');
const messageLabel = document.getElementById('messageLabel');
const checkbox = document.getElementById('checkbox');
const checkboxLabel = document.getElementById('gdprLabel');
const nameType = ["First name", "Last name"];
const errorMsg = document.getElementById('errorMessage');
const errorMsgText = document.getElementById('errorMessagePrompt');

/*Animation handler needed for form validaion. When the fields do not pass the form validation this arrow function will get invoked. It will decrease the opacity of the targetted label, then it will
dynamically change its fore color to red. After that, the opacity is raised until it reaches its maximum value.*/
const decreaseThenIncreaseTheOpacity = (element) => {
    let opacityArray = ["1", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1"];
    opacityArray.forEach(opValue => {
        setTimeout(element.style.opacity = opValue, 600);
    });
    element.style.color = 'red';
    opacityArray = opacityArray.reverse();

    opacityArray.forEach(opValue => {
        setTimeout(element.style.opacity = opValue, 700);
    })
}

//Reset the .formElement div styles to their implicit CSS declarations.
const resetFormStyles = (formElement, formLabel, initialTextValue) => {
    formElement.style.border = '1px solid #2b4957';
    formLabel.style.color = 'black';
    formLabel.innerHTML = initialTextValue;
    formElement.value = "";
}

//Applies an error effect on the form elements where a input mismatch occured.
const errorEffect = (formElement, elementLabel, message) => {
    formElement.style.border = '4px solid red';
    decreaseThenIncreaseTheOpacity(elementLabel);
    elementLabel.innerHTML = message;
}

//Parses the input string parameter in such a way that its first char will be uppercase. The rest of the string will get converted to lowercase. Used to parse the first and last name values.
const formatNameInput = (input) => {
    input = input.toLowerCase();
    return input.replace(input[0], input[0].toUpperCase());
}

//Checks whether an input char is a digit or not
const isDigit = (char) => {
    const chars = "0123456789";
    return chars.includes((String)(char[0]));
}

//Checks if a string contains at least one digit
const containsDigits = (input) => {
    for (let ch in input) {
        if (isDigit(input.charAt(ch)))
            return true;
    }
    return false;
}

//Validation for the first and last name fields of the form.
const validateName = (nameElement, nameLabel, nameTypeString) => {

    if (containsDigits(nameElement.value)) {
        errorEffect(nameElement, nameLabel, `Invalid ${nameTypeString}! Input cannot contain digits!`);
        throw new Error(`Input missmatch!`);
    }

    if (nameElement.value == "") {
        errorEffect(nameElement, nameLabel, `${nameTypeString} cannot be empty!`)
        throw new Error(`Input missmatch!`);
    }

    if (nameElement.value.length < 2 || nameElement.value.includes(" ")) {
        errorEffect(nameElement, nameLabel, `Invalid ${nameTypeString}!`);
        throw new Error(`Input missmatch!`);
    }

    if (nameElement.value.length > 12) {
        errorEffect(nameElement, nameLabel, `${nameTypeString} is way too long!`);
        throw new Error(`Input missmatch!`);
    }

    return formatNameInput(nameElement.value);
}

//Checks whether the email matches a regex pattern or not
const emailMathcesRegexPattern = () => {
    return String(emailAddress.value)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

//Parse and format the email input
const formatEmailInput = () => {
    return emailAddress.value.toLowerCase();
}

//Validation for the email address field
const validateEmailAddress = () => {

    if (emailAddress.value === "") {
        errorEffect(emailAddress, emailAddressLabel, "Email cannot be empty!");
        throw new Error("Input mismatch!");
    }

    if (!emailMathcesRegexPattern()) {
        errorEffect(emailAddress, emailAddressLabel, "Invalid email address!");
        throw new Error("Input mismatch!");
    }

    return formatEmailInput();

};

//Form validation for the options list included in the form
const validateDropDownMenu = () => {
    const option = dropdownList[dropdownList.selectedIndex].value;

    if (option === 'default') {
        errorEffect(dropdownList, dropdownLabel, "None of the options in the list below have been selected!");
        throw new Error("Form validation error!");
    }
};

//Form validation for the textarea included inside the form
const validateTextMessage = () => {
    if (message.value === '') {
        errorEffect(message, messageLabel, "You cannot send an empty message!");
        throw new Error("Form validation error!");
    }

    if (message.value.split(" ").length < 10) {
        errorEffect(message, messageLabel, "That's not a valid message!");
        throw new Error("Form validation error!");
    }
}

//Form validation for the GDPR checkbox
const validateGDPRCheckbox = () => {
    if (!checkbox.checked) {
        errorEffect(checkbox, checkboxLabel, "You must agree out GDPR terms and conditions in order to submit the form!");
        throw new Error("Form validation error!");
    }
};

//Gradually decrease the opacity of a given HTML element in such a way that it creates a fade-out animation effect
const decreaseTheOpacity = (element, duration) => {
    let opp2Array = ["0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1", "0"];
    let y = 0;
    (next = () => {
        element.style.opacity = opp2Array[y];
        if (y++ < opp2Array.length) {
            setTimeout(next, duration);
        }
    })();
}

//Use the above function in order to obtain that fade effect
const fadeOutAnimationForWarningCard = () => {
    setTimeout(() => {
        decreaseTheOpacity(errorMsg, 80);
        errorMsg.classList.add('invisibleCard');
    }, 4000);
}

//Event listener that will get triggered when the user submits the form
submit.addEventListener('click', (e) => {
    e.preventDefault();
    try {
        firstName.value = validateName(firstName, firstNameLabel, nameType[0]) ?? "";
        lastName.value = validateName(lastName, lastNameLabel, nameType[1]) ?? "";
        emailAddress.value = validateEmailAddress(emailAddress, emailAddressLabel) ?? "";
        validateDropDownMenu();
        validateTextMessage();
        validateGDPRCheckbox();
    } catch (error) {
        if (errorMsg.classList.contains('success')) {
            errorMsg.classList.remove('success');
        }
        errorMsgText.innerHTML = 'Cannot send form because of an input mismatch';
        errorMsg.classList.add('error');
        errorMsg.classList.remove('invisibleCard');
        fadeOutAnimationForWarningCard();
        return;
    }

    errorMsgText.innerHTML = 'Form sent successfully!';
    errorMsg.classList.remove('invisibleCard');
    errorMsg.classList.add('success');
    setTimeout(() => {
        decreaseTheOpacity(errorMsg, 80);
        errorMsg.classList.add('invisibleCard');
    }, 4000);

});

//Event listener that will trigger when the user focuses the first name input field.
firstName.addEventListener('focus', () => {
    if (firstName.style.border === '4px solid red')
        resetFormStyles(firstName, firstNameLabel, nameType[0])
});

//Event listener that will trigger when the user focuses the last name input field.
lastName.addEventListener('focus', () => {
    if (lastName.style.border === '4px solid red')
        resetFormStyles(lastName, lastNameLabel, nameType[1]);
});

//Event listener that will trigger when the user focuses the email address input field.
emailAddress.addEventListener('focus', () => {
    if (emailAddress.style.border === '4px solid red')
        resetFormStyles(emailAddress, emailAddressLabel, "Email")
});

//Event listener that will trigger when the user focuses the options list field
dropdownList.addEventListener('focus', () => {
    if (dropdownList.style.border === '4px solid red')
        resetFormStyles(dropdownList, dropdownLabel, "Which topic matches your message?");
    dropdownList.value = "default";
});

//Event listener that will trigger when the user focuses the texarea input
message.addEventListener('focus', () => {
    if (message.style.border === '4px solid red')
        resetFormStyles(message, messageLabel, "Message");
});

//Event listener that will trigger when the user focuses the GDPR checkbox
checkbox.addEventListener('focus', () => {
    if (checkbox.style.border === '4px solid red')
        resetFormStyles(checkbox, checkboxLabel, "");
});

//Event listener that will trigger when the user focuses the first name input field using the TAB key.
firstName.addEventListener('keyup', (e) => {
    if (e.key === 'Tab') {
        if (firstName.style.border === '4px solid red')
            resetFormStyles(firstName, firstNameLabel, nameType[0]);
    }
});

//Event listener that will trigger when the user focuses the last name input field using the TAB key.
lastName.addEventListener('keyup', (e) => {
    if (e.key === 'Tab') {
        if (lastName.style.border === '4px solid red')
            resetFormStyles(lastName, lastNameLabel, nameType[1]);
    }
});

//Event listener that will trigger when the user focuses the email address input field using the TAB key.
emailAddress.addEventListener('keyup', (e) => {
    if (e.key === 'Tab') {
        if (emailAddress.style.border === '4px solid red')
            resetFormStyles(emailAddress, emailAddressLabel, 'Email');
    }
})

//Event listener that will trigger when the user focuses the dropdown list field using the TAB key.
dropdownList.addEventListener('keyup', (e) => {
    if (e.key === 'Tab') {
        if (dropdownList.style.border === '4px solid red')
            resetFormStyles(dropdownList, dropdownLabel, "Which topic matches your message?");
    }

    dropdownList.value = "default";
})

//Event listener that will trigger when the user focuses the textarea input field using the TAB key.
message.addEventListener('keyup', (e) => {
    if (e.key === 'Tab') {
        if (message.style.color === '4px solid red')
            resetFormStyles(message, messageLabel, "Message");
    }
});

//Event listener that will trigger when the user focuses the checkbox field using the TAB key.
checkbox.addEventListener('keyup', () => {
    if (e.key === 'Tab') {
        if (checkbox.style.color === '4px solid red')
            resetFormStyles(checkbox, checkboxLabel, "");
    }
});

