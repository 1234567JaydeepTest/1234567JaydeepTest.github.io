(()=> {

  let btnEmail = document.getElementById('btn-email'),
      btnPhone = document.getElementById('btn-phone'),
      btnSearch = document.getElementById('btn-search'),
      inputField = document.getElementsByName('inputField')[0];

  if (inputField)
    inputField.searchType = 'email'; //searchType will be use to identify the type of search, default to email

  btnEmail.addEventListener("click", e => {
    setRequiredValues( 'Please enter a valid email address', 'ENTER AN EMAIL ADDRESS', 'email', btnEmail, btnPhone);
  });

  btnPhone.addEventListener("click", e => {
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
    document.getElementsByClassName('error-msg')[0].innerHTML = errorMessage;
    inputField.placeholder = placeHolder;
    inputField.searchType = searchType;
    inputField.value = '';
    activeBtn.classList.add('activeTab');
    nonActiveBtn.classList.remove('activeTab');
  }

  btnSearch.addEventListener("click", e => {
    createUrl(e);
  });

  inputField.addEventListener('keypress', e => {
    if (e.keycode === '13') { //Search will trigger if enter key is pressed
      createUrl(e);
    }
  });

  /**
   * function validates the input and creates the url according to selected search
   * @param {object} e
   */
  function createUrl (e) {
    e.preventDefault();
    localStorage.clear();
    let inputValue = inputField.value;
    if (inputField.searchType === 'email') {
      inputValue = inputValue.toLowerCase();

      if (inputValue.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) { //checks if email id entered is valid or not
        document.querySelector('input[type="text"]').parentNode.classList.remove("error");
        displayResult(`https://ltv-data-api.herokuapp.com/api/v1/records.json?email=${inputValue}`);
      } else {
        document.querySelector('input[type="text"]').parentNode.classList.add("error");
      }
    } else if (inputField.searchType === 'phone') {
      if (inputValue.match(/^[0-9]{10}$/)) {  //checks if phone number entered is valid or not
        document.querySelector('input[type="text"]').parentNode.classList.remove("error");
        displayResult(`https://ltv-data-api.herokuapp.com/api/v1/records.json?phone=${inputValue}`);
      } else {
        document.querySelector('input[type="text"]').parentNode.classList.add("error");
      }
    }
  }

  /**
   * function makes the API call and redirects to result.html page
   * @param {String} url
   */
  function displayResult (url) {
    fetch(url)
        .then(response => response.text())
        .then(contents => {
          localStorage.setItem("userObject", contents); //store details in localStorage
          window.location.href = "result.html";
        })
        .catch((e) => console.log(e));
  }

})();
