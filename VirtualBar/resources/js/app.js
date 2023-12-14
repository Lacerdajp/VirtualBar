import '../css/app.css'
import 'bootstrap/dist/js/bootstrap.esm'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/js/bootstrap.js'

var cnpj = document.getElementById('cnpj')
if (cnpj != null) {
  cnpj.addEventListener('input', function () {
    var cnpjValue = this.value.replace(/\D/g, '');
    this.value = cnpjValue
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

