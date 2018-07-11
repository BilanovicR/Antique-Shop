var podaci = [{naziv:"Sat", opis:"opis sata", kategorija:"satovi", cena:"25000", stanje:"ocuvano", kolicina:"1", dostava:"na adresu", slika:"../images/oglas.jpg"},
{naziv:"Mašina za kucanje", opis:"opis masine", kategorija:"razno", cena:"21000", stanje:"ocuvano", kolicina:"1", dostava:"licno", slika:"../images/oglas1.jpg"},
{naziv:"Singer, mašina za šivenje", opis:"opis masine", kategorija:"razno", cena:"45000", stanje:"ocuvano", kolicina:"2", dostava:"licno", slika:"../images/oglas2.jpg"},
{naziv:"Polaroid fotoaparat", opis:"opis fotoaparata", kategorija:"razno", cena:"28000", stanje:"osteceno", kolicina:"1", dostava:"na adresu", slika:"../images/oglas3.jpg"}];

function napraviOglas(param, id) {
    var sviOglasi = document.getElementById("oglasiKategorije");

    var oglas = document.createElement("div");
	oglas.classList.add("oglas");
	oglas.setAttribute("id", id);

	var naziv = document.createElement("div");
	naziv.appendChild(document.createTextNode(param["naziv"]));
	naziv.classList.add("naziv");

	var cena = document.createElement("div");
	cena.appendChild(document.createTextNode(param["cena"]))
	cena.classList.add("cena");

	var slika = document.createElement("img");
	slika.setAttribute("src", param["slika"]);
	slika.classList.add("oglslika");
    
    var a = document.createElement("a");
    a.appendChild(slika);
    a.appendChild(naziv);
	a.appendChild(cena);
	a.setAttribute("href","../html/Oglas.html" );
	
	oglas.appendChild(a);
	sviOglasi.appendChild(oglas);
    return sviOglasi;

}
 function izbrisiRezultate() {//izbrisem sve rezultate prethodne pretrage po kategorijama
	 var x = document.getElementById("oglasiKategorije");
	 while (x.firstChild) {
		 x.removeChild(x.firstChild);
	 }
 }
function prikazOglasa(par) {
	var brojacOglasa= 0;
		izbrisiRezultate();
		for (var i = 0; i < localStorage.length; i++) {
		var k = localStorage.key(i);
		var kljuc = k.startsWith("oglas");		
		if (kljuc == true) {
            var pronadjenOglas = JSON.parse(localStorage.getItem(k));
            if (pronadjenOglas["kategorija"] == par) {
                napraviOglas(pronadjenOglas, k);
				brojacOglasa++;
            }
		} else {
			continue;
		}
	} 
	if (brojacOglasa == 0){
		var x= document.getElementById("oglasiKategorije");
		x.appendChild(document.createTextNode("Nije pronađen ni jedan oglas u ovoj kategoriji"));
		}
}

function prijaviSe() {
	var indikator = 0;
	var korIme = document.getElementById("logIme");
	var pass = document.getElementById("logPass");
	for (var i = 0; i < localStorage.length; i++) {
		var k = localStorage.key(i);
		var kljuc = k.startsWith("kor");		
		if (kljuc == true) {
            var pronadjenKor = JSON.parse(localStorage.getItem(k));
            if (pronadjenKor["username"] == korIme.value && pronadjenKor["sifra"] == pass.value) {
				sessionStorage.setItem("ulogovan", pronadjenKor["username"]);
				window.alert("Uspešno ste se ulogovali kao " + pronadjenKor["ime"] + " " + pronadjenKor["prezime"]);
				dobroDosli(pronadjenKor["ime"]);
				indikator = 1;
			} 
		}
	}
	if (indikator == 0) {
		window.alert("Pogrešno korisničko ime ili sifra");
	}
}
function dobroDosli() {
	var div = document.getElementById("login");
	var dd = document.getElementById("logovanje");
	var log = document.getElementById("logOut");
	if (localStorage.getItem("ulogovanKorisnik") == null){
		dd.style.visibility = "visible";
		div.removeChild(log);//log.style.visibility = "hidden";
	} else {
		div.removeChild(dd);//dd.style.visibility = "hidden";
		log.style.visibility = "visible";
		var korisnik = JSON.parse(localStorage.getItem(localStorage.getItem("ulogovanKorisnik")));
		document.getElementById("pozdrav").innerHTML = "Dobrodošli " + korisnik["ime"];
	}	
}
function pretraga() { 
		var brojac = 0;
		var unos = document.getElementById("pretrazi").value;
		var u = unos.toLowerCase();
		var sviOglasi = document.getElementById("oglasiKategorije");
		if (unos == "" || unos == " ") {
			alert("Neodgovarajući unos za pretragu, pokušajte ponovo");
		}
		for (var i=0; i<sviOglasi.childNodes.length; i++) {
			//console.log(sviOglasi.childNodes.length);
			//console.log(i);
			var idOgl = sviOglasi.childNodes[i].id;//dobijam id za svaki od prikazanih oglasa
			//console.log(idOgl);
			var oglasiLocal = JSON.parse(localStorage.getItem(idOgl));//pronadje oglas u LS prema id
			//koji je isti kao i kljuc pod kojim je sačuvan oglas
			var provera = oglasiLocal["naziv"].toLowerCase();
			if (provera.includes(u)) {
					document.getElementById(idOgl).style.visibility = "visible";
					brojac++;
				} else {
					document.getElementById(idOgl).style.display = "none";
				}
		}
		if (brojac == 0){
			var x = document.getElementById("oglasiKategorije");
			x.appendChild(document.createTextNode("Nije pronađen ni jedan oglas koji odgovara zahtevima pretrage"));
		}
}