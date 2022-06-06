const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.style.borderBottom = '1px solid red';
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__profile-error_active');
}

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.style.borderBottom = '1px solid rgba(0, 0, 0, 0.2)';
  errorElement.textContent = '';
  errorElement.classList.remove('popup__profile-error_active');
}

const setCustomErrorMessage = (inputElement, errorMessage) => {
  if(inputElement.type.toString() === 'url') {
      switch (inputElement.validity.typeMismatch) {
        case true: errorMessage = 'Введите адрес сайта.';
        break;
        case false: errorMessage = '';
        break;
      } 
    } else if (inputElement.validity.valueMissing) {
      errorMessage = 'Вы пропустили это поле.'
    } else { 
      errorMessage = inputElement.validationMessage;
    }
    return errorMessage;
}

const checkInputValidaty = (formElement, inputElement) => {
  let errorWarning = '';
  if(!inputElement.validity.valid) {
    showError(formElement, inputElement, setCustomErrorMessage(inputElement, errorWarning));
  } else {
    hideError(formElement, inputElement);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, submitButton) => {
  if (hasInvalidInput(inputList)) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  const submitButton = formElement.querySelector('.popup__submit-button');
  toggleButtonState(inputList, submitButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidaty(formElement, inputElement);
      toggleButtonState(inputList, submitButton);
    });
  });
};
  
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};


export {enableValidation};