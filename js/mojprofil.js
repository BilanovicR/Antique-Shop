function loadProfil() {
    if (localStorage.getItem("ulogovanKorisnik") == null){
        alert("Morate prvo napraviti profil");
        window.location = "../html/Registracija.html";
    }
	 
    var ulogovanKor = localStorage.getItem("ulogovanKorisnik");
    var ulogovan = JSON.parse(localStorage.getItem(ulogovanKor));
	document.getElementById("prikazSlike").src = ulogovan["korSlika"];
    document.getElementById("ime").value = ulogovan["ime"];
    document.getElementById("prezime").value = ulogovan["prezime"];
    document.getElementById(ulogovan["pol"]).checked = true;
    //document.getElementById("datumrodj").value = ulogovan["datumrodj"];  ovo ne moye da ocita jer u startu sacuva u drugacijem formatu, mora se promeniti a nemam vremenaaa
    document.getElementById("ulica").value = ulogovan["ulica"];
    document.getElementById("broj").value = ulogovan["ulBroj"];
    document.getElementById("mesto").value = ulogovan["mesto"];
    document.getElementById("postbroj").value = ulogovan["postbroj"];
    document.getElementById("email").value = ulogovan["mejl"];
    document.getElementById("telefon").value = ulogovan["telefon"];
    document.getElementById("username").value = ulogovan["username"];
    document.getElementById("sifra").value = ulogovan["sifra"];

}

function izmeniProfil() {
    var ime = document.getElementById("ime");
	var prezime = document.getElementById("prezime");
	var pol = document.querySelector(".pol:checked");
	var datumrodj = document.getElementById("datumrodj");
	var ulica = document.getElementById("ulica");
	var ulBroj = document.getElementById("broj");
	var mesto = document.getElementById("mesto");
	var postbroj = document.getElementById("postbroj");
	var mejl = document.getElementById("email");
	var tel = document.getElementById("telefon");
	var user = document.getElementById("username");
    var sifra = document.getElementById("sifra").value;
    var profilna = document.getElementById("profilna");

    var izmenaKorisnik = {"ime": ime.value,
	"prezime": prezime.value,
	"pol": pol.value,
	"datum_rodjenja": datumrodj,
	"ulica": ulica.value,
	"ulBroj": ulBroj.value,
	"mesto": mesto.value,
	"postbroj": postbroj.value,
	"mejl": mejl.value,
	"telefon": tel.value,
	"username": user.value,
	"sifra": sifra,
    "korSlika": "../images/" + profilna.files[0].name,
    };

 var ulogovan = localStorage.getItem("ulogovanKorisnik");
 var korisnici = localStorage.setItem(ulogovan, JSON.stringify(izmenaKorisnik));
 window.alert("Uspešno ste izmenili Vaše podatke!");
 window.location = "../html/Pocetna.html";
 }