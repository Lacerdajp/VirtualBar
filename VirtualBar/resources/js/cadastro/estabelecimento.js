var emailInput = document.getElementById('email');
  var emailFeedback = document.getElementById('emailFeedback');

  emailInput.addEventListener('input', function() {
    var email = this.value.trim();

    // Expressão regular para validar o formato do email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      // Email válido
      emailInput.classList.remove('is-invalid');
      emailFeedback.style.display = 'none';
    } else {
      // Email inválido
      emailInput.classList.add('is-invalid');
      emailFeedback.style.display = 'block';
    }
  });


    var cnpj=document.getElementById('cnpj')
    if(cnpj!=null){
    cnpj.addEventListener('input', function() {
    var cnpjValue = this.value.replace(/\D/g, '');
    this.value=cnpjValue
    cnpjValue = cnpjValue.substr(0, 14);
    if (cnpjValue.length <= 2) {
    } else if (cnpjValue.length <= 5) {
      this.value = cnpjValue.substr(0, 2) + '.' + cnpjValue.substr(2);
    } else if (cnpjValue.length <= 8) {
      this.value = cnpjValue.substr(0, 2) + '.' + cnpjValue.substr(2, 3) + '.' + cnpjValue.substr(5);
    } else if (cnpjValue.length <= 12) {
      this.value = cnpjValue.substr(0, 2) + '.' + cnpjValue.substr(2, 3) + '.' + cnpjValue.substr(5, 3) + '/' + cnpjValue.substr(8);
    } else {
      this.value = cnpjValue.substr(0, 2) + '.' + cnpjValue.substr(2, 3) + '.' + cnpjValue.substr(5, 3) + '/' + cnpjValue.substr(8, 4) + '-' + cnpjValue.substr(12);
    }
  });
}

