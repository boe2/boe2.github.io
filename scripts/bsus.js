var items;
var totalusage;

select = document.getElementById("select");
var value = select.options[select.selectedIndex].value;

setTotalUsage(value);

var mon;
var tab = 0;
var tabnum = 44;

function createButtons() {

	for (i = 0; i < items.length; i++) {
		
		var dontadd = false;
		
		var div = document.createElement("div");
		
		var pokedexNo;
		var name = "";
		if (dict[items[i][0]].substring(dict[items[i][0]].length-6) != "-Alola"){
			pokedexNo = items[i][0].substring(0, items[i][0].length - 2);	
		}else{
			pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "-a";
		}
		
		try {
			name = dict[items[i][0]];	
		}catch(err){
			dontadd = true;
		}
		
		div.innerHTML = "<img src=\"images/" + pokedexNo + ".png\"><span class=\"pokemonbutton\">#" + (1 + i) + " - " + name + "</span>";
		
		if (i == mon) {
			div.setAttribute("class", "clickedbutton");
		} else {
			div.setAttribute("class", "button");
		}
		div.setAttribute("onClick", "resetData(" + i + "), false");
		div.setAttribute("id", "button" + i);
		if (dontadd == false){
			document.getElementById("buttonlist").appendChild(div);
			
		}
	}
}


function setData(number) {

    mon = number;

    var type;
    type = items[number][2] + "/" + items[number][3];
    if (items[number]["3"] == "null") {
        type = items[number][2];
    }
    pokedexNo = items[number][0].substring(0, items[number][0].length - 2);
    document.getElementById("monsinfo2").innerHTML = "#" + pokedexNo + " - " + dict[items[number][0]] + " - " + type + " type" + " - Estimated usage: " + Math.round(items[number][items[number].length - 1] / totalusage * 60000) / 100 + "%";
    if (tab == 0 || tab == 1 || tab == 2 || tab == 3 || tab == 4 || tab == 6) {
        var totalperc = 0;
        var stop = 20;
        for (i = 0; i < stop; i++) {
            document.getElementById("td" + (3 * (i + 1) - 1).toString()).innerHTML = items[number][tabnum + 2 * i];
            totalperc += parseFloat(items[number][tabnum + 1 + 2 * i]);
            document.getElementById("td" + (3 * (i + 1)).toString()).innerHTML = items[number][tabnum + 1 + 2 * i] + "%";
        }

    }

    if (tab == 5 || tab == 7 || tab == 8) {
        for (i = 0; i < 20; i++) {
            var id = items[number][tabnum + i];
            var name = dict[id];
            document.getElementById("td" + (3 * (i + 1) - 1).toString()).innerHTML = name;
            document.getElementById("td" + (3 * (i + 1)).toString()).innerHTML = "";
        }
    }

    for (i = 0; i < 20; i++) {
        if (document.getElementById("td" + ((i + 1) * 3 - 1).toString()).innerHTML == "null") {
            document.getElementById("td" + ((i + 1) * 3).toString()).innerHTML = "";
            document.getElementById("td" + ((i + 1) * 3 - 1).toString()).innerHTML = "";
            document.getElementById("td" + ((i + 1) * 3 - 2).toString()).innerHTML = "";
        }
    }

    for (i = 0; i < 20; i++) {
        if (document.getElementById("td" + ((i + 1) * 3 - 1).toString()).innerHTML == "undefined") {
            document.getElementById("td" + ((i + 1) * 3).toString()).innerHTML = "";
            document.getElementById("td" + ((i + 1) * 3 - 1).toString()).innerHTML = "";
            document.getElementById("td" + ((i + 1) * 3 - 2).toString()).innerHTML = "";
        }
    }

    for (i = 0; i < 20; i++) {
        if (document.getElementById("td" + ((i + 1) * 3 - 1).toString()).innerHTML != "") {
            document.getElementById("td" + ((i + 1) * 3 - 2).toString()).innerHTML = "#" + (i + 1);
        }
    }

    if (tab == 2) {
        for (i = 3; i < 20; i++) {
            document.getElementById("td" + ((i + 1) * 3).toString()).innerHTML = "";
            document.getElementById("td" + ((i + 1) * 3 - 1).toString()).innerHTML = "";
            document.getElementById("td" + ((i + 1) * 3 - 2).toString()).innerHTML = "";
        }
    }

    if (tab == 1) {
        if (document.getElementById("td1").innerHTML == "") {
            document.getElementById("noitems").innerHTML = "Held item data for this Pokemon is unavailable, presumably because this Pokemon has not used any held items, or because the competition/ladder didn't allow the use of held items.";

            document.getElementById("td62").innerHTML = "";
            document.getElementById("td63").innerHTML = "";
        }
    }

    if (tab != 1) {
        document.getElementById("noitems").innerHTML = "";
    }

    var total = 400;
    if (tab == 4 || tab == 3) {
        total = 100;
    }

    var other = total - totalperc;
    if (tab == 2 || tab == 6) {
        other = 0;
    }

    document.getElementById("td62").innerHTML = "Other";
    document.getElementById("td63").innerHTML = other + "%";

    if ((document.getElementById("td59").innerHTML == "")) {
        document.getElementById("td62").innerHTML = "";
        document.getElementById("td63").innerHTML = "";
    }


    if (tab == 2 || tab == 5 || tab == 7 || tab == 8) {
        document.getElementById("td62").innerHTML = "";
        document.getElementById("td63").innerHTML = "";
    }


}

function setTab(number) {
    tab = number;

    document.getElementById("tabbutton0").className = "coloredbutton";
    document.getElementById("tabbutton1").className = "coloredbutton";
    document.getElementById("tabbutton2").className = "coloredbutton";
    document.getElementById("tabbutton3").className = "coloredbutton";
    document.getElementById("tabbutton4").className = "coloredbutton";
    document.getElementById("tabbutton5").className = "coloredbutton";
    document.getElementById("tabbutton6").className = "coloredbutton";
    document.getElementById("tabbutton7").className = "coloredbutton";
    document.getElementById("tabbutton8").className = "coloredbutton";

    if (tab == 0) {
        tabnum = 44;
        document.getElementById("tabnamespan").innerHTML = "Moves";
        document.getElementById("tabbutton0").className = "coloredclickedbutton";
    }
    if (tab == 1) {
        tabnum = 4;
        document.getElementById("tabnamespan").innerHTML = "Items";
        document.getElementById("tabbutton1").className = "coloredclickedbutton";
    }
    if (tab == 2) {
        tabnum = 84;
        document.getElementById("tabnamespan").innerHTML = "Abilities";
        document.getElementById("tabbutton2").className = "coloredclickedbutton";
    }
    if (tab == 3) {
        tabnum = 90;
        document.getElementById("tabnamespan").innerHTML = "Natures";
        document.getElementById("tabbutton3").className = "coloredclickedbutton";
    }
    if (tab == 4) {
        tabnum = 130;
        document.getElementById("tabnamespan").innerHTML = "Moves when victorious";
        document.getElementById("tabbutton4").className = "coloredclickedbutton";
    }
    if (tab == 5) {
        tabnum = 170;
        document.getElementById("tabnamespan").innerHTML = "Opponents when victorious";
        document.getElementById("tabbutton5").className = "coloredclickedbutton";
    }
    if (tab == 6) {
        tabnum = 190;
        document.getElementById("tabnamespan").innerHTML = "Moves when defeated";
        document.getElementById("tabbutton6").className = "coloredclickedbutton";
    }
    if (tab == 7) {
        tabnum = 230;
        document.getElementById("tabnamespan").innerHTML = "Opponents when defeated";
        document.getElementById("tabbutton7").className = "coloredclickedbutton";
    }
    if (tab == 8) {
        tabnum = 250;
        document.getElementById("tabnamespan").innerHTML = "Teammates";
        document.getElementById("tabbutton8").className = "coloredclickedbutton";
    }

    setData(mon);
}

function resetData(number, resetsearch) {
	
	if (resetsearch == true){
		document.getElementById("searchbox").value = "";		
	}

    document.getElementById("buttonlist").innerHTML = "";

    var value = select.options[select.selectedIndex].value;

	setTotalUsage(value);
    mon = number;
    setTab(0);
    createButtons();
    setData(mon);
	updateSearch();

}

function updateSearch(){
	
	var value = document.getElementById("searchbox").value;
	
		if(items[i] != undefined){
			
			for (var i = 0; i < items.length; i++){
				pokename = dict[items[i][0]];
				pokeid = items[i][0];
				
				if (pokename == undefined){			
					document.getElementById("button" + i.toString()).style.display = "none";	
				}else{		
					valueLowerCase = value.toLowerCase();
					pokenameLowerCase = pokename.toLowerCase();
				}
				
				var include = false;
				
				if (pokenameLowerCase.includes(valueLowerCase)){
					include = true;
				}
				if (pokeid.includes(value)){
					include = true;
				}
				if ((i+1).toString().includes(value)){
					include = true;
				}		

				for (var alias in aliases){
					if (alias.includes(value) && pokeid == aliases[alias]){
						include = true;
					}			
				}			
				
				if (include == false){
					document.getElementById("button" + i.toString()).style.display = "none";			
				}
				if (include == true){
					document.getElementById("button" + i.toString()).style.display = "block";			
				}
				
			}
	}
	
	
}

function setTotalUsage(value){
	var formatinfo = "";
	if (value == "competition4101") {
        items = competition4101;
        totalusage = competition4101_totalusage;
		formatinfo = "Battle of Alola - Junior Division - <a target=\"blank\" href=\"https://3ds.pokemon-gl.com/competitions/4101/\"> info about this competition </a>";
    }
    if (value == "competition4102") {
        items = competition4102;
        totalusage = competition4102_totalusage;
		formatinfo = "Battle of Alola - Masters Division - <a target=\"blank\" href=\"https://3ds.pokemon-gl.com/competitions/4102/\"> info about this competition </a>";
    }
    if (value == "oras_117_1") {
        items = oras_117_1;
        totalusage = oras_117_1_totalusage;
		formatinfo = "ORAS Season 17 - Singles";
    }
    if (value == "oras_117_2") {
        items = oras_117_2;
        totalusage = oras_117_2_totalusage;
		formatinfo = "ORAS Season 17 - Doubles";
    }
    if (value == "oras_117_3") {
        items = oras_117_3;
        totalusage = oras_117_3_totalusage;
		formatinfo = "ORAS Season 17 - Triples";
    }
    if (value == "oras_117_4") {
        items = oras_117_4;
        totalusage = oras_117_4_totalusage;
		formatinfo = "ORAS Season 17 - Rotations";
    }
	document.getElementById("formatinfo").innerHTML = "Selected format: " + formatinfo;
}

resetData(0);