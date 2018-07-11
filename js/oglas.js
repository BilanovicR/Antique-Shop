function otvoriOglas(id) {
	var uzmiOglas = JSON.parse(localStorage.getItem(id));
	console.log(uzmiOglas);
	for (i in uzmiOglas) {
		console.log(Object.keys(uzmiOglas)[i]);
		var upisi = document.getElementById(Object.keys(uzmiOglas)[i]);//ovako dobijem id za svaki element gde cu upisati i vrednost kljuceva koji su isti kao i sam id (naziv, kategorija...)
		upisi.innerHTML = uzmiOglas[i];
		alert(uzmiOglas[i]); //dobijam prave podatke ali kako ih upisati u prethodno odredjeno mesto jer innerhtml ne valja
	}
}

function naruci() {
	if (localStorage.getItem("ulogovanKorisnik") == null) {
		alert("Morate se registrovati na sajtu kako biste vršili kupovinu!");
	} else {
	var naziv = localStorage.getItem(x);
	var kol = document.getElementById("kol").value;
	var dos = document.querySelector('.dostava:checked').value;
	var pl = document.querySelector('.placanje:checked').value;
	var porudzbina = {"kolicina": kol, "dostava": dos, "placanje": pl}
	localStorage.setItem("porudzbina "+ naziv, stringify(porudzbina));
	}
}
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