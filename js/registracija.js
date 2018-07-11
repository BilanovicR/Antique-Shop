var korisnici =[{ime: "Ime1", prezime: "Prezime1", pol: "Ženski", datum_rodjenja: "1992-09-26", ulica:"Ulicaaa", ulBroj:"13", mesto:"Mestoo", postbroj:"123123", mejl:"r@gmail.com",telefon:"060123456",username: "imeprez1", sifra: "sif1", korSlika: "../images/profil.png"},
{ime: "Ime2", prezime: "Prezime2", pol: "Ženski", datum_rodjenja: "1992-09-26",ulica:"Ulicaa1", ulBroj:"123", mesto:"Mesto2", postbroj:"12123",mejl:"asdfa@gmail.com",telefon:"060121256", username: "imeprez2", sifra: "sif2", korSlika: "../images/profil.png"},
{ime: "Ime3", prezime: "Prezime3", pol: "Muški", datum_rodjenja: "1992-09-26", ulica:"Ulica2", ulBroj:"13", mesto:"Mesto1", postbroj:"123123",mejl:"asd@gmail.com",telefon:"060124856", username: "imeprez3", sifra: "sif3", korSlika: "../images/profil.png"}];

function sacuvajKorisnike() {
	for (kor in korisnici) {
		localStorage.setItem("kor"+ kor, JSON.stringify(korisnici[kor]));
	}
} 

function prebrojKorisnike() {
	brojKor = 0;
	for (var i = 0; i < localStorage.length; i++) {
		var k = localStorage.key(i);
		var kljuc = k.startsWith("kor");		
		if (kljuc == true) {
			brojKor++;
		} else {
			continue;
		}
	}
	return brojKor;
}

function proveraUser(user){
	ind = 1; 
	for (var i = 0; i < localStorage.length; i++) {
		var k = localStorage.key(i);
		var kljuc = k.startsWith("kor");		
		if (kljuc == true) {
			kor = JSON.parse(localStorage.getItem(k));
			if (kor["username"]==user){
				ind = 0;
				return ind;
			}
		} 
	}
}

function registrujSe() {
	var profilna = document.getElementById("profilna");
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
	var user = document.getElementById("username").value;	
	var sifra = document.getElementById("sifra").value;
	var sifra2 = document.getElementById("sifra2").value;
	proveraUser(user);
	if (sifra != sifra2) {
		 alert("Sifre se ne poklapaju, pokušajte ponovo");  
	} else if (ind == 0) {
		 alert ("Korisničko ime je već zauzeto, pokušajte ponovo");
	} else {
	var korisnik = {"ime": ime.value,
	"prezime": prezime.value,
	"pol": pol.value,
	"datum_rodjenja": datumrodj.value,
	"ulica": ulica.value,
	"ulBroj": ulBroj.value,
	"mesto": mesto.value,
	"postbroj": postbroj.value,
	"mejl": mejl.value,
	"telefon": tel.value,
	"username": user,
	"sifra": sifra,
	"korSlika": "../images/" + profilna.files[0].name,};
	prebrojKorisnike();
	korisnici = localStorage.setItem("kor" + brojKor, JSON.stringify(korisnik));
	localStorage.setItem("ulogovanKorisnik","kor"+ brojKor);
	alert("Uspešno ste se registrovali na sajtu!");
	window.location = "../html/Pocetna.html";
	}
}

