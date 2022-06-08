const showError = (formElement, inputElement, errorMessage, {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

const hideError = (formElement, inputElement, {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
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

const checkInputValidaty = (formElement, inputElement, {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  let errorWarning = '';
  if(!inputElement.validity.valid) {
    showError(formElement, inputElement, setCustomErrorMessage(inputElement, errorWarning), {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass});
  } else {
    hideError(formElement, inputElement, {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass});
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

const setEventListeners = (formElement, {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, submitButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidaty(formElement, inputElement, {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass});
      toggleButtonState(inputList, submitButton, {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass});
    });
  });
};
  
const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass});
  });
};


export {enableValidation};