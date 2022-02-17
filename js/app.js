(()=> {

  let btnEmail = document.querySelector('#btn-email'),
      btnPhone = document.querySelector('#btn-phone'),
      btnSearch = document.querySelector('#btn-search'),
      inputField = document.querySelector('input[name="inputField"]'),
      inputText = document.querySelector('input[type="text"]');

  if (inputField)
    inputField.searchType = 'email'; //searchType will be use to identify the type of search, default to email

  btnEmail.addEventListener('click', e => {
    setRequiredValues( 'Please enter a valid email address', 'ENTER AN EMAIL ADDRESS', 'email', btnEmail, btnPhone);
  });

  btnPhone.addEventListener('click', e => {
    setRequiredValues('Please enter a valid phone number', 'ENTER A PHONE NUMBER', 'phone', btnPhone, btnEmail);
  });

  /**
   * function sets the error message, placeholder and searchType value as per selected search
   * also adds the activeTab class to the classlist of active search button and removes the same from non active button
   * @param {String} errorMessage - Error message to be displayed if invalid email/phone number entered
   * @param {String} placeHolder - place holder value for respective search
   * @param {String} searchType - type of search
   * @param {Object} activeBtn - selected search button
   * @param {Object} nonActiveBtn - non selected search button
  */
  function setRequiredValues(errorMessage, placeHolder, searchType, activeBtn, nonActiveBtn) {
    if (searchType !== inputField.searchType) { //if clicked on same button values should persist
      document.querySelector('.error-msg').innerHTML = errorMessage;
      inputField.placeholder = placeHolder;
      inputField.searchType = searchType;
      inputField.value = ''; //clears field on tab btn change
      activeBtn.classList.add('activeTab');
      nonActiveBtn.classList.remove('activeTab');
      inputText.parentNode.classList.remove('error'); //clears error on tab change
    }
  }

  btnSearch.addEventListener('click', e => {
    createUrl(e);
  });

  inputField.addEventListener('keydown', e => {
    if (e.keycode === '13') { //Search will trigger if enter key is pressed
      createUrl(e);
    }
  });

  /**
   * function passes the values to validate according to search type
   * @param {object} e
   */
  function createUrl (e) {
    e.preventDefault();
    localStorage.clear();
    let inputValue = inputField.value;
    if (inputField.searchType === 'email') {
      validateInput(inputValue.toLowerCase(), /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, inputField.searchType);
    } else if (inputField.searchType === 'phone') {
      validateInput(inputValue, /^[0-9]{10}$/, inputField.searchType);
    }
  }

  /**
   * function validates the input and creates the url according to selected search
   * @param {String} inputValue - value entered by user
   * @param {String} regex - regex pattern for required search
   * @param {String} inputType - search type i.e email/phone
   */
  function validateInput(inputValue, regex, inputType) {
    if (inputValue.match(regex)) { //checks if input entered is valid or not
      let URL = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?';
      inputText.parentNode.classList.remove('error');
      fetchResult(`${URL}${inputType}=${inputValue}`);
    } else {
      inputText.parentNode.classList.add('error');
    }
  }

  /**
   * function makes the API call and redirects to result.html page
   * @param {String} url
   */
  function fetchResult (url) {
    document.querySelector('.mainPage').classList.add('d-none'); //hide main area - feedback 4
    document.querySelector('.loader').classList.remove('d-none'); //display loader - feedback 4
    fetch(url)
        .then(response => response.text())
        .then(contents => {
          localStorage.setItem('userObject', contents); //store details in localStorage
          window.location.href = 'result.html';
        })
        .catch((e) => console.log(e));
  }

})();
