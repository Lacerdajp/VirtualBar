import  '../../css/cadastro/cadastro.css'
import'./cliente'
import'./estabelecimento'
import 'bootstrap/dist/js/bootstrap.esm'
document.addEventListener('DOMContentLoaded', () => {
  var url_atual = window.location.href;
  var clientId = document.getElementById('nav-cliente');
  var classesCliente = Array.from(clientId.classList);
  var estabelecimentoid = document.getElementById('nav-estabelecimento');
  var classesEstabelecimento = Array.from(estabelecimentoid.classList);

  if (url_atual.includes('estabelecimento')) {
    classesCliente = classesCliente.filter((id) => id !== 'active');
    classesEstabelecimento.push('active');
  } else {
    classesEstabelecimento = classesEstabelecimento.filter((id) => id !== 'active');
    classesCliente.push('active');
  }

  clientId.className = classesCliente.join(' ');
  estabelecimentoid.className = classesEstabelecimento.join(' ');

});
