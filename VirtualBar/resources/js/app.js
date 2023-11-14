import '../css/app.css'
import 'bootstrap/dist/js/bootstrap.esm'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/js/bootstrap.js'


var cout = 0;

function incrementCout() {
    document.getElementById("cout").innerHTML = cout;
    cout++;
   
}