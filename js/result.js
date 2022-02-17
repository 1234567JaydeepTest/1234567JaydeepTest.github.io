(() => {
  /**
   * Gets an object and sets its content into the result card in the result page
   * If there's no content in the JSON object, makes sure to tell the user
   */
  if (window.localStorage && localStorage.userObject) {
    let retreivedObject = JSON.parse(localStorage.getItem('userObject')), //parses the retrieved object into an JSON object
        resultCount = document.querySelector('#result-count');
    if (JSON.stringify(retreivedObject) === "[]") {
      resultCount.innerHTML = '0 Results';
      document.querySelector('.result-desc').innerHTML = 'Try starting a new search below';
    } else {
      resultCount.innerHTML = '1 Result';
      document.querySelector('#result-subtext').innerHTML = 'Look at the result below to see the details of the person you’re searched for.';
      document.querySelector('.name').innerHTML = `${retreivedObject.first_name} ${retreivedObject.last_name}`;
      document.querySelector('.user-description').innerHTML = retreivedObject.description;
      document.querySelector('#address').innerHTML = `<p>${retreivedObject.address}</p>`;
      document.querySelector('.email').innerHTML = `<p>${retreivedObject.email}</p>`;

      for (const phone_number in retreivedObject.phone_numbers) {
        let phone = retreivedObject.phone_numbers[phone_number],
            formatted_phone = `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 10)}`;

          document.querySelector('.phone-num').insertAdjacentHTML('beforeend',
            `<a href=tel:${phone} style='display: block;color: #004A80;'>${formatted_phone}</a>`
          );
      }

      for (const relative in retreivedObject.relatives) {
        document.querySelector('.relatives').insertAdjacentHTML('beforeend',
          `<p style='margin-bottom: 0'>${retreivedObject.relatives[relative]}</p>`
        );
      }

      show(document.querySelector('.result-wrap'));
    }
  }

  //function shows the element
  function show(element) {
    element.style.display = 'block';
  }
})();
