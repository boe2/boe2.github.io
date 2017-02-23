var items;
var totalusage;

select = document.getElementById("select");
var value = select.options[select.selectedIndex].value;

updateFormatInfo(value);

var mon;
var tab = 0;
var tabnum = 44;

var tabnames = ["Moves", "Items", "Abilities", "Natures", "Moves when victorious", "Opponents when victorious", "Moves when defeated", "Opponents when defeated", "Teammates"];
var tabnums = [44, 4, 84, 90, 130, 170, 190, 230, 250];
var datanames = [1, 2, 3, 4, 6, 8, 10, 12, 14, 16, 18, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 84, 86, 88];

var ps = false;


function createButtons() {

    for (i = 0; i < items.length; i++) {
        try{
            var div = document.createElement("div");

            var pokedexNo;

			if (ps){
				name = items[i][1];
			} else {
				name = dict[items[i][0]];
			}           

            if (name.substring(name.length - 6) == "-Alola") {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "-a";
            } else if (name == "Rotom-Wash") {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "w";
            } else if (name == "Rotom-Heat") {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "h";
            } else if (name == "Rotom-Fan") {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "s";
            } else if (name == "Rotom-Frost") {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "f";
            } else if (name == "Rotom-Mow") {
				pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "m";
			} else if (name == "Ash-Greninja") {
				pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "-a";
			} else if (name == "Lycanroc-Midday") {
				pokedexNo = items[i][0].substring(0, items[i][0].length - 2);
			} else if (name == "Lycanroc-Midnight") {
				pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "-m";
			} else if (name.includes("-T")){
				pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "-s";				
			} else if (name.includes("Silvally") && items[i][0].length == 6) { 
                pokedexNo = items[i][0].substring(0, items[i][0].length - 3);		
			} else {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2);
            }

            if (pokedexNo == "") {
                pokedexNo = "undefined";
            }

            div.innerHTML = "<img src=\"images/" + pokedexNo + ".png\"><span class=\"pokemonbutton\">#" + (1 + i) + " - " + name + "</span>";

            if (i == mon) {
                div.setAttribute("class", "clickedbutton");
            } else {
                div.setAttribute("class", "button");
            }
            div.setAttribute("onClick", "resetData(" + i + "), false");
            div.setAttribute("id", "button" + i);
            if (div.innerHTML != "<img src=\"images/undefined.png\"><span class=\"pokemonbutton\">#" + (1 + i) + " - undefined</span>") {
                document.getElementById("buttonlist").appendChild(div);

            }
        }catch (err){
			
		}
    }
}


function setData(number) {

    mon = number;

    var type;
    type = "<img class=\"typeimage\" src=\"images\\" + items[number][2].toLowerCase() + ".png\"><img class=\"typeimage\" src=\"images\\" + items[number][3].toLowerCase() + "\.png\">";
    if (items[number]["3"] == "null") {
		type = "<img class=\"typeimage\" src=\"images\\" + items[number][2].toLowerCase() + ".png\">";
    }
    pokedexNo = items[number][0].substring(0, items[number][0].length - 2);
	
	if (!ps){
		document.getElementById("monsinfo2").innerHTML = "#" + pokedexNo + " - " + items[number][1] + " - " + type + " - Estimated usage: " + Math.round(items[number][items[number].length - 1] / totalusage * 600000) / 1000 + "%";
	}else{
		document.getElementById("monsinfo2").innerHTML = "#" + pokedexNo + " - " + items[number][1] + " - " + type + " - Usage: " + Math.round(items[number][items[number].length-1] * 100000) / 1000 + "%";
	}
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
			if (name != undefined){
				
				var text = "<div onClick=\"lookForMon(\'" + name + "\'); emptysearch();\">" + name + "</div>";
				document.getElementById("td" + (3 * (i + 1) - 1).toString()).innerHTML = text;
				document.getElementById("td" + (3 * (i + 1)).toString()).innerHTML = "";
			}else{				
				document.getElementById("td" + (3 * (i + 1) - 1).toString()).innerHTML = "";
				document.getElementById("td" + (3 * (i + 1)).toString()).innerHTML = "";
			}
        }
    }

    for (i = 0; i < 20; i++) {
        if (document.getElementById("td" + ((i + 1) * 3 - 1).toString()).innerHTML == "null" && tab != 2) {
            document.getElementById("td" + ((i + 1) * 3).toString()).innerHTML = "";
            document.getElementById("td" + ((i + 1) * 3 - 1).toString()).innerHTML = "";
            document.getElementById("td" + ((i + 1) * 3 - 2).toString()).innerHTML = "";
        }
    }

    if (tab == 2) {
		var j = 3;
		if (document.getElementById("td8").innerHTML == "null"){
			j = 2;
		}
		if (document.getElementById("td5").innerHTML == "null"){
			j = 1;
		}
        for (i = j; i < 20; i++) {
            document.getElementById("td" + ((i + 1) * 3).toString()).innerHTML = "";
            document.getElementById("td" + ((i + 1) * 3 - 1).toString()).innerHTML = "";
            document.getElementById("td" + ((i + 1) * 3 - 2).toString()).innerHTML = "";
        }
    }
    

    var total = 400;
    if (tab == 4 || tab == 3 || tab == 1) {
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

    for (i = 0; i < 20; i++) {
        document.getElementById("td" + ((i + 1) * 3 - 2).toString()).innerHTML = "";        
        if (document.getElementById("td" + ((i + 1) * 3 - 1).toString()).innerHTML != "") {
            document.getElementById("td" + ((i + 1) * 3 - 2).toString()).innerHTML = "#" + (i + 1);
        }
    }
	
	if (document.getElementById("td1").innerHTML == "" && tab == 1) {
		document.getElementById("noitems").innerHTML = "Held item data for this Pokemon is unavailable, presumably because this Pokemon has not used any held items, or because the competition/ladder didn't allow the use of held items.";

		document.getElementById("td62").innerHTML = "";
		document.getElementById("td63").innerHTML = "";
	}else if (tab == 5 || tab == 7 || tab == 8 && document.getElementById("td2").innerHTML != ""){
		document.getElementById("noitems").innerHTML = "Note: click on a Pokemon's name to view its stats.";
	}else if (tab == 4 || tab == 5){
		if (document.getElementById("td2").innerHTML == ""){
			document.getElementById("noitems").innerHTML = "This Pokemon does not appear to be particularly successful in battles...";
		}		
	}else{
		document.getElementById("noitems").innerHTML = "";
	}

}

function setTab(number) {
    tab = number;
    var buttonname;

    for (var i = 0; i < 9; i++) {
        buttonname = "tabbutton" + i.toString();
		if (ps){
			if (!(i == 4 || i == 5 || i == 6 || i == 7 || i == 8)){				
				document.getElementById(buttonname).className = "coloredbutton";
			}
		}else{
			document.getElementById(buttonname).className = "coloredbutton";
		}
    }

    buttonname = "tabbutton" + tab.toString();
    tabnum = tabnums[tab];
    document.getElementById("tabnamespan").innerHTML = tabnames[tab];
	if (document.getElementById("tabnamespan").innerHTML == "Natures" && ps){
		document.getElementById("tabnamespan").innerHTML = "Spreads";
	}
    document.getElementById(buttonname).className = "coloredclickedbutton";

    setData(mon);
}
function resetData(number, resetsearch) {

    var value = select.options[select.selectedIndex].value;
	
	if (value.substring(0,2) == "ps"){
		ps = true;
		document.getElementById("psnotabs").innerHTML = "<span id=\"tabbutton0\" class=\"coloredbutton\" onclick=\"setTab(0)\">Moves</span> | <span id=\"tabbutton1\" class=\"coloredbutton\" onclick=\"setTab(1)\">Items</span> | <span id=\"tabbutton2\" class=\"coloredbutton\" onclick=\"setTab(2)\">Abilities</span> | <span id=\"tabbutton3\" class=\"coloredbutton\" onclick=\"setTab(3)\">Natures</span>";
		
		document.getElementById("tabbutton3").innerHTML = "Spreads";
	}else{
		ps = false;
		document.getElementById("psnotabs").innerHTML = "<span id=\"tabbutton0\" class=\"coloredbutton\" onclick=\"setTab(0)\">Moves</span> | <span id=\"tabbutton1\" class=\"coloredbutton\" onclick=\"setTab(1)\">Items</span> | <span id=\"tabbutton2\" class=\"coloredbutton\" onclick=\"setTab(2)\">Abilities</span> | <span id=\"tabbutton3\" class=\"coloredbutton\" onclick=\"setTab(3)\">Natures</span> | <span id=\"tabbutton4\" class=\"coloredbutton\" onclick=\"setTab(4)\">Moves when victorious</span> | <span id=\"tabbutton5\" class=\"coloredbutton\" onclick=\"setTab(5)\">Opponents when victorious</span> | <span id=\"tabbutton6\" class=\"coloredbutton\" onclick=\"setTab(6)\">Moves when defeated</span> | <span id=\"tabbutton7\" class=\"coloredbutton\" onclick=\"setTab(7)\">Opponents when defeated</span> | <span id=\"tabbutton8\" class=\"coloredbutton\" onclick=\"setTab(8)\">Teammates</span></span>";
		
		document.getElementById("tabbutton3").innerHTML = "Natures";
	}
			
    updateFormatInfo(value);
    mon = number;
    setTab(0);
    setData(mon);
    updateSearch(false);

}

function updateSearch(cleared) {
	document.getElementById("buttonlist").innerHTML = "";
	createButtons();
	
	var value = document.getElementById("searchbox").value;
	
	if (cleared){
		value = "";
		document.getElementById("searchbox").value = "";
	}
	
	if (value == ""){
		document.getElementById("searchtext").innerHTML = "Search:";
	}else{
		document.getElementById("searchtext").innerHTML = "<div style=\"padding:0px 1px 0px 2px\"><button onClick=(emptysearch())>Clear</button></div>";
	}
	
    for (var i = 0; i < items.length; i++) {

        try {
            pokename = dict[items[i][0]];
            pokeid = items[i][0];
        } catch (e) {
        }
        if (pokename != null) {
            var valueLowerCase = value.toLowerCase();
            var pokenameLowerCase = pokename.toLowerCase();
        }

        var include = false;

        if (pokenameLowerCase.includes(valueLowerCase) || pokeid.includes(value) || (i + 1).toString().includes(value)) {
            include = true;
        }
		
		for (var j = 0; j < datanames.length; j++){
			try {
				if (items[i][datanames[j]].toLowerCase().includes(valueLowerCase)){
					include = true;
				}
			}catch (e){
				
			}
			
		}
		
        for (var alias in aliases) {
            if (alias.includes(value) && pokeid == aliases[alias]) {
                include = true;
            }
        }
		
		for (var alias in aliases) {
            if (alias.includes(value) && pokeid == aliases[alias]) {
                include = true;
            }
        }
		
		for (var alias in aliases) {
            if (alias.includes(value) && pokeid == aliases[alias]) {
                include = true;
            }
        }

        if (include == false) {
            try {
                document.getElementById("button" + i.toString()).style.display = "none";
            } catch (e) {

            }
        } else if (include == true && document.getElementById("buttonbutton" + i.toString()) != null) {
            document.getElementById("button" + i.toString()).style.display = "block";
        }

    }

}

function updateFormatInfo(format) {
    var formatinfo = "";
    items = window[format];
    totalusage = window[format + "_totalusage"];
    formatinfo = formatinfodict[format];
    document.getElementById("formatinfo").innerHTML = "Selected format: " + formatinfo;
}

function lookForMon (name){
	if (name.includes("-Mega-Y") || name.includes("-Mega-X")){
		name = name.substring(0, name.length-7);
	}
	if (name.includes("-Mega") || name.includes("-Mega")){
		name = name.substring(0, name.length-5);
	}
	
	for (var i = 0; i < items.length - 2; i++){
		try {
			var buttonhtml = document.getElementById("button" + i.toString()).innerHTML;	
			if (buttonhtml.includes(name)){			
				setTab(0);
				setData(i);
				document.getElementById("button" + i.toString()).className = "clickedbutton";		
			}else{	
				document.getElementById("button" + i.toString()).className = "button";
			}
		}catch (err){
			var buttonhtml = null;
		}	
	}
}

function emptysearch(){
	updateSearch(true);
}

resetData(0);