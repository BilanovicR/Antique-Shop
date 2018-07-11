var podaci = [{naziv:"Sat", opis:"opis sata", kategorija:"satovi", cena:"25000", stanje:"ocuvano", kolicina:"1", dostava:"na adresu", slika:"../images/oglas.jpg"},
{naziv:"Mašina za kucanje", opis:"opis masine", kategorija:"razno", cena:"21000", stanje:"ocuvano", kolicina:"1", dostava:"licno", slika:"../images/oglas1.jpg"},
{naziv:"Singer, mašina za šivenje", opis:"opis masine", kategorija:"razno", cena:"45000", stanje:"ocuvano", kolicina:"2", dostava:"licno", slika:"../images/oglas2.jpg"},
{naziv:"Polaroid fotoaparat", opis:"opis fotoaparata", kategorija:"razno", cena:"28000", stanje:"osteceno", kolicina:"1", dostava:"na adresu", slika:"../images/oglas3.jpg"}];

function sacuvajOglase() {//cuvanje oglasa iz liste u localstorage
	for (ogl in podaci) {
		localStorage.setItem("oglas"+ ogl, JSON.stringify(podaci[ogl]));
	}
} 


function napraviOglas(sadrzaj, id) {//pravljenje oglasa na osnovu liste u localstorage

	var oglas = document.createElement("div");
	oglas.classList.add("oglas");
	oglas.setAttribute("id", id );

	var naziv = document.createElement("div");
	naziv.appendChild(document.createTextNode(sadrzaj["naziv"]));
	naziv.classList.add("naziv");

	var cena = document.createElement("div");
	cena.appendChild(document.createTextNode(sadrzaj["cena"]))
	cena.classList.add("cena");

	var slika = document.createElement("img");
	slika.setAttribute("src", sadrzaj["slika"]);
	slika.classList.add("oglslika");
    
    var a = document.createElement("a");
    a.appendChild(slika);
    a.appendChild(naziv);
	a.appendChild(cena);
	a.setAttribute("href","../html/Oglas.html" );
	//a.addEventListener("onclick", otvoriOglas(id));
	
	oglas.appendChild(a);//ovako je ceo oglas link
	return oglas;
}

function ucitaj() {//ucitavanje svih oglasa iz localStorage
	var oglasi = document.getElementById("oglasnik");
	for (var i = 0; i < localStorage.length; i++) {
		//console.log(i);
		var ajtem = localStorage.key(i);
		var tacno = ajtem.startsWith("oglas");
		//console.log(localStorage.key(i));
		//console.log(ajtem);
		if (tacno == true){
			oglasi.appendChild(napraviOglas(JSON.parse(localStorage.getItem(ajtem)), ajtem));
		}
	}		
}

	
function pretraga() { 
	var brojac = 0;
		var unos = document.getElementById("pretrazi").value;
		var u = unos.toLowerCase();
		var sviOglasi = document.getElementById("oglasnik");
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
			var x = document.getElementById("oglasnik");
			x.appendChild(document.createTextNode("Nije pronađen ni jedan oglas koji odgovara zahtevima pretrage"));
		}
}

/*function otvoriOglas(id) {//podesi da se prikaze oglas
	prikaz = document.getElementById("oglasnik");
	oglasdetail = JSON.parse(localStorage.getItem(id));
	for (data in oglasdetail) {
		podatak = document.createElement("li");
		podatak.appendChild(document.createTextNode(oglasdetail[data]));
		prikaz.appendChild(podatak);
		}
	return prikaz;
	}*/

function izlogujSe() {
	localStorage.removeItem("ulogovanKorisnik");
	alert("Uspešno ste se izlogovali");
	window.location = "../html/Pocetna.html";
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
				localStorage.setItem("ulogovanKorisnik", k);
				window.alert("Uspešno ste se ulogovali kao " + pronadjenKor["ime"] + " " + pronadjenKor["prezime"]);
				document.getElementById("login").style.display = "none";
				indikator = 1;
			} 
		}
	}
	if (indikator == 0) {
		window.alert("Pogrešno korisničko ime ili sifra");
	}
}