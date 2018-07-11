function prebrojOglase() {
	brojOglasa = 0;
	for (var i = 0; i < localStorage.length; i++) {
		var k = localStorage.key(i);
		var kljuc = k.startsWith("oglas");		
		if (kljuc == true) {
			brojOglasa++;
		} else {
			continue;
		}
	}
	return brojOglasa;
}
function provera() {
	if (localStorage.getItem("ulogovanKorisnik") == null){//ovako sprecavam obavestenje da je polje obavezno ako u startu nisam ulogovala korisnika, 
			//da ne bi prvo zahtevao unos podataka ya oglas pa onda provera da li je ulogovan
        	alert("Morate se prvo registrovati da biste postavili oglas!");
        	window.location = "../html/Registracija.html";
    	} 
}

function sacuvajOglas() {
				var indikator = 0;
		prebrojOglase();
		
		var naziv = document.getElementById('naziv');
		var opis = document.getElementById('opis');
		var kategorija = document.querySelector('.kategorija:checked');
		var cena = document.querySelector('.cena');
		var stanje = document.querySelector('.stanje:checked');
		var kolicina = document.getElementById('kolicina');
		var dostava = document.querySelector('.dostava:checked');
		var slika = document.getElementById('oglslika');
		var autor = localStorage.getItem("ulogovanKorisnik");
		var oglas = {"naziv": naziv.value,
		 "opis": opis.value,
		 "kategorija": kategorija.value, 
		 "cena": cena.value,
		 "stanje": stanje.value, 
		 "kolicina": kolicina.value,
		 "datum": new Date,
		 "dostava": dostava.value, 
		 "slika": "../images/" + slika.files[0].name,
		 "autor": autor,
		};

		
		if (localStorage.getItem("ulogovanKorisnik") !== null) {
			localStorage.setItem("oglas"+ brojOglasa, JSON.stringify(oglas));
			alert("Uspešno ste postavili Vas oglas!");
			indikator = 1;
			} 	 
		if (indikator == 0) {
			alert("Morate se prvo registrovati da biste postavili oglas!");
			window.location = "../html/Registracija.html";
		}
}