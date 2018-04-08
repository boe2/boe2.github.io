var items;
var totalusage;

select = document.getElementById("select");
var value = select.options[select.selectedIndex].value;

var mon;
var tab = 0;
var tabnum = 44;

var tabnames = ["Moves", "Items", "Abilities", "Natures", "Moves when victorious", "Opponents when victorious", "Moves when defeated", "Opponents when defeated", "Teammates"];
var tabnums = [44, 4, 84, 90, 130, 170, 190, 230, 250];
var datanames = [0, 1, 2, 3, 4, 6, 8, 10, 12, 14, 16, 18, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 84, 86, 88];

var ps = false;
var japanese = false;

var l = location.search;

if (l === "?l=jp") {
    document.getElementById("title").innerHTML = "バトルスポット使用率 - ポケモンウルトラサン・ムーンレート";
    document.getElementById("headertext").innerHTML = "Battle Spot使用率（ベータ） | <a href=\"https://boe2.github.io/bsus.html\" id=\"languagelink\"> English</a>";
    document.getElementById("aboutpage").innerHTML = "このページについて";
    document.getElementById("credits").innerHTML = "<img id=\"leftswablu\" src=\"images/swabluicon.png\">製作者 <strong>boe</strong><img id=\"rightswablu\" src=\"images/swabluicon.png\"><br><br>ポケモンサン・ムーンのレートバトルとインターネット大会の完璧な使用率を表示できるページです。<br> 使用率はPokemon Global Linkから集められています。<br><br> このページを作るにあたってプログラミングを手伝ってくれた<strong>Fischgrat</strong>、<strong>Lego</strong>、<strong>Alpha Ninja</strong>、翻訳を手伝ってくれた<strong>Yosshi</strong>、<strong>hz1016hz</strong>、<strong>youmu@poke</strong>、そして元となるbattlespotstats.comの製作者<strong>hetoord</strong>に改めて感謝を。<br> <br> 問題があれば、 boehijt@gmail.comか<a id=\"link\" href=\"http://www.smogon.com/forums/members/boehijt.228496/\">Smogon</a>かPokemon Showdown!にお問い合わせください。<br> <br> <strong>Pokemon</strong> is © 1995-2017 <strong> Nintendo</strong>";
    tabnames = ["技", "持ち物", "特性", "性格", "倒した時の技", "倒した相手", "倒された時の技", "倒された相手", "チームメイト"];
    document.getElementById("pokemonbyranking").innerHTML = "ポケモンランキング";
    document.getElementById("showstats").innerHTML = "使用率表示";
    document.getElementById("selectformat").innerHTML = "ルールを選んでください";

    var selector = document.getElementById("select").innerHTML;
    selector = replaceAll(selector, "Current USUM Ladder", "現在のUSUMレート");
    selector = replaceAll(selector, "Current Ladders", "現在のレート");
    selector = replaceAll(selector, "Current Season", "現在のシーズン");
    selector = replaceAll(selector, "Past Seasons", "前のシーズン");
    selector = replaceAll(selector, "Season", "シーズン");
    selector = replaceAll(selector, "Singles", "シングル");
    selector = replaceAll(selector, "Doubles", "ダブル");
    selector = replaceAll(selector, "Special", "スペシャル");
    selector = replaceAll(selector, "Triples", "トリプル");
    selector = replaceAll(selector, "Rotations", "ローテーション");
    selector = replaceAll(selector, "VGC", "ＷＣＳ");
    selector = replaceAll(selector, "All", "全て");
    selector = replaceAll(selector, "Sun and Moon", "サンムーン");
    selector = replaceAll(selector, "Ladders", "レート");
    selector = replaceAll(selector, "Rating", "レート");
    selector = replaceAll(selector, "Competitions", "インターネット大会");

    document.getElementById("select").innerHTML　 = selector;

    japanese = true;
}


function createButtons() {

    var error = 0;

    for (i = 0; i < items.length; i++) {
        try {
            var div = document.createElement("div");

            var pokedexNo;
            var englishname;


            if (japanese) {
                if (ps) {
                    englishname = items[i][1];
                    try {
                        name = passfilter(englishname);
                    } catch (err) {}
                } else {
                    englishname = dict[items[i][0]];
                    try {
                        name = passfilter(englishname);
                    } catch (err) {}
                }
            } else {
                if (ps) {
                    englishname = items[i][1];
                    name = englishname;

                } else {
                    englishname = dict[items[i][0]];
                    name = englishname;
                }
            }

            if (englishname.substring(englishname.length - 6) === "-Alola") {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "-a";
            } else if (englishname === "Rotom-Wash") {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "w";
            } else if (englishname === "Rotom-Heat") {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "h";
            } else if (englishname === "Rotom-Fan") {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "s";
            } else if (englishname === "Rotom-Frost") {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "f";
            } else if (englishname === "Rotom-Mow") {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "m";
            } else if (englishname === "Ash-Greninja") {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "-a";
            } else if (englishname === "Lycanroc-Night") {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "-m";
            } else if (englishname === "Lycanroc-Midday") {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2);
            } else if (englishname === "Lycanroc-Dusk") {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "-d";
            } else if (englishname === "Necrozma-Dusk Mane") {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "-dm";
            } else if (englishname === "Necrozma-Dawn Wings") {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "-dw";
            } else if (englishname === "Necrozma-Ultra") {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "-u";
            } else if (englishname.indexOf("-T") >= 0) {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2) + "-s";
            } else if (englishname.indexOf("Silvally") >= 0 && items[i][0].length === 6) {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 3);
            } else {
                pokedexNo = items[i][0].substring(0, items[i][0].length - 2);
            }


            if (pokedexNo === "" || pokedexNo === "null") {
                pokedexNo = "undefined";
            }

            div.innerHTML = "<img src=\"images/" + pokedexNo + ".png\"><span class=\"pokemonbutton\">#" + (1 + i) + " - " + name + "</span>";

            if (i === mon) {
                div.setAttribute("class", "clickedbutton");
            } else {
                div.setAttribute("class", "button");
            }
            div.setAttribute("onClick", "setData(" + i + "); document.getElementById(\"buttonlist\").innerHTML = null; createButtons(); updateSearch();");
            div.setAttribute("id", "button" + (i - error));
            if (div.innerHTML === "<img src=\"images/undefined.png\"><span class=\"pokemonbutton\">#" + (1 + i) + " - undefined</span>") {
                console.log("1");
            } else {

                document.getElementById("buttonlist").appendChild(div);
            }
        } catch (err) {

        }
    }
}


function setData(number) {

    mon = number;

    var type;
    try {
        type = "<img class=\"typeimage\" src=\"images\\" + items[number][2].toLowerCase() + ".png\"><img class=\"typeimage\" src=\"images\\" + items[number][3].toLowerCase() + "\.png\">";
    } catch (err) {

    }
    if (items[number]["3"] === "null") {
        type = "<img class=\"typeimage\" src=\"images\\" + items[number][2].toLowerCase() + ".png\">";
    }
    pokedexNo = items[number][0].substring(0, items[number][0].length - 2);

    if (!ps) {
        if (japanese) {
            document.getElementById("monsinfo2").innerHTML = "#" + pokedexNo + " - " + passfilter(items[number][1]) + " - " + type + " - 推定使用率： " + Math.round(items[number][items[number].length - 1] / totalusage * 600000) / 1000 + "%";
        } else {
            document.getElementById("monsinfo2").innerHTML = "#" + pokedexNo + " - " + items[number][1] + " - " + type + " - Estimated usage: " + Math.round(items[number][items[number].length - 1] / totalusage * 600000) / 1000 + "%";
        }
    } else {
        if (japanese) {
            document.getElementById("monsinfo2").innerHTML = "#" + pokedexNo + " - " + passfilter(items[number][1]) + " - " + type + " - 使用率： " + Math.round(items[number][items[number].length - 1] / totalusage * 100000) / 1000 + "%";
        } else {
            document.getElementById("monsinfo2").innerHTML = "#" + pokedexNo + " - " + items[number][1] + " - " + type + " - Usage: " + Math.round(items[number][items[number].length - 1] * 100000) / 1000 + "%";
        }
    }
    if (tab === 0 || tab === 1 || tab === 2 || tab === 3 || tab === 4 || tab === 6) {
        var totalperc = 0;
        var stop = 20;
        for (i = 0; i < stop; i++) {
            if (japanese) {
                document.getElementById("td" + (3 * (i + 1) - 1).toString()).innerHTML = passfilter(items[number][tabnum + 2 * i]);
            } else {
                document.getElementById("td" + (3 * (i + 1) - 1).toString()).innerHTML = items[number][tabnum + 2 * i];
            }
            totalperc += parseFloat(items[number][tabnum + 1 + 2 * i]);
            document.getElementById("td" + (3 * (i + 1)).toString()).innerHTML = items[number][tabnum + 1 + 2 * i] + "%";
        }

    }

    if (tab === 5 || tab === 7 || tab === 8) {
        for (i = 0; i < 20; i++) {
            var id = items[number][tabnum + i];
            if (japanese) {
                var name = passfilter(dict[id]);
            } else {
                var name = dict[id];
            }
            if (name !== undefined) {

                var text = "<div onClick=\"lookForMon(\'" + name + "\'); emptysearch();\">" + name + "</div>";
                document.getElementById("td" + (3 * (i + 1) - 1).toString()).innerHTML = text;
                document.getElementById("td" + (3 * (i + 1)).toString()).innerHTML = "";
            } else {
                document.getElementById("td" + (3 * (i + 1) - 1).toString()).innerHTML = "";
                document.getElementById("td" + (3 * (i + 1)).toString()).innerHTML = "";
            }
        }
    }

    for (i = 0; i < 20; i++) {
        if (document.getElementById("td" + ((i + 1) * 3 - 1).toString()).innerHTML === "null" && tab !== 2) {
            document.getElementById("td" + ((i + 1) * 3).toString()).innerHTML = "";
            document.getElementById("td" + ((i + 1) * 3 - 1).toString()).innerHTML = "";
            document.getElementById("td" + ((i + 1) * 3 - 2).toString()).innerHTML = "";
        }
    }

    if (tab === 2) {
        var j = 3;
        if (document.getElementById("td8").innerHTML === "null") {
            j = 2;
        }
        if (document.getElementById("td5").innerHTML === "null") {
            j = 1;
        }
        for (i = j; i < 20; i++) {
            document.getElementById("td" + ((i + 1) * 3).toString()).innerHTML = "";
            document.getElementById("td" + ((i + 1) * 3 - 1).toString()).innerHTML = "";
            document.getElementById("td" + ((i + 1) * 3 - 2).toString()).innerHTML = "";
        }
    }

    var total = 400;

    if (tab === 4 || tab === 3 || tab === 1 || tab === 6) {
        total = 100;
    }

    var other = total - totalperc;
    if (tab === 2) {
        other = 0;
    }

    if (japanese) {
        document.getElementById("td62").innerHTML = "その他";
    } else {
        document.getElementById("td62").innerHTML = "Other";
    }
    document.getElementById("td63").innerHTML = other + "%";

    if ((document.getElementById("td59").innerHTML === "")) {
        document.getElementById("td62").innerHTML = "";
        document.getElementById("td63").innerHTML = "";
    }


    if (tab === 2 || tab === 5 || tab === 7 || tab === 8) {
        document.getElementById("td62").innerHTML = "";
        document.getElementById("td63").innerHTML = "";
    }

    for (i = 0; i < 20; i++) {
        document.getElementById("td" + ((i + 1) * 3 - 2).toString()).innerHTML = "";
        if (document.getElementById("td" + ((i + 1) * 3 - 1).toString()).innerHTML !== "") {
            document.getElementById("td" + ((i + 1) * 3 - 2).toString()).innerHTML = "#" + (i + 1);
        }
    }

    if (document.getElementById("td1").innerHTML === "" && tab === 1) {
        document.getElementById("noitems").innerHTML = "Held item data for this Pokemon is unavailable, presumably because this Pokemon has not used any held items, or because the competition/ladder didn't allow the use of held items.";

        document.getElementById("td62").innerHTML = "";
        document.getElementById("td63").innerHTML = "";
        document.getElementById("noitems").innerHTML = "";
    } else if (tab === 5 || tab === 7 || tab === 8 && document.getElementById("td2").innerHTML !== "") {

        document.getElementById("noitems").innerHTML = "";
        if (japanese) {
            document.getElementById("noitems").innerHTML = "注記：ポケモンの使用率を見たいときは、名前をクリックしてください";
        } else {
            document.getElementById("noitems").innerHTML = "Note: click on a Pokemon's name to view its stats.";
        }
    } else {
        document.getElementById("noitems").innerHTML = "";
    }

    document.getElementById("noitems").innerHTML = "";
    if (tab === 4 || tab === 5) {
        if (document.getElementById("td2").innerHTML === "") {
            if (japanese) {
                document.getElementById("noitems").innerHTML = "このポケモンは対戦であまり強くないらしいです・・・";
            } else {
                document.getElementById("noitems").innerHTML = "This Pokemon does not appear to be particularly successful in battles...";
            }
        }
    }

}

function setTab(number) {
    tab = number;
    var buttonname;

    for (var i = 0; i < 9; i++) {
        buttonname = "tabbutton" + i.toString();
        if (ps) {
            if (!(i === 4 || i === 5 || i === 6 || i === 7 || i === 8)) {
                document.getElementById(buttonname).className = "coloredbutton";
            }
        } else {
            document.getElementById(buttonname).className = "coloredbutton";
        }
    }

    buttonname = "tabbutton" + tab.toString();
    tabnum = tabnums[tab];
    document.getElementById("tabnamespan").innerHTML = tabnames[tab];
    if (document.getElementById("tabnamespan").innerHTML === "Natures" && ps) {
        document.getElementById("tabnamespan").innerHTML = "Spreads";
    }
    document.getElementById(buttonname).className = "coloredclickedbutton";

    setData(mon);
}

function resetData(number, resetsearch) {

    var value = select.options[select.selectedIndex].value;

    if (value.substring(0, 2) === "ps") {
        ps = true;
        if (japanese) {
            document.getElementById("psnotabs").innerHTML = "<span id=\"tabbutton0\" class=\"coloredbutton\" onclick=\"setTab(0)\">技</span> | <span id=\"tabbutton1\" class=\"coloredbutton\" onclick=\"setTab(1)\">持ち物</span> | <span id=\"tabbutton2\" class=\"coloredbutton\" onclick=\"setTab(2)\">特性</span> | <span id=\"tabbutton3\" class=\"coloredbutton\" onclick=\"setTab(3)\">性格</span>";

            document.getElementById("tabbutton3").innerHTML = "努力値配分";

        } else {
            document.getElementById("psnotabs").innerHTML = "<span id=\"tabbutton0\" class=\"coloredbutton\" onclick=\"setTab(0)\">Moves</span> | <span id=\"tabbutton1\" class=\"coloredbutton\" onclick=\"setTab(1)\">Items</span> | <span id=\"tabbutton2\" class=\"coloredbutton\" onclick=\"setTab(2)\">Abilities</span> | <span id=\"tabbutton3\" class=\"coloredbutton\" onclick=\"setTab(3)\">Natures</span>";

            document.getElementById("tabbutton3").innerHTML = "Spreads";

        }
    } else {
        ps = false;
        if (japanese) {
            document.getElementById("psnotabs").innerHTML = "<span id=\"tabbutton0\" class=\"coloredbutton\" onclick=\"setTab(0)\">技</span> | <span id=\"tabbutton1\" class=\"coloredbutton\" onclick=\"setTab(1)\">持ち物</span> | <span id=\"tabbutton2\" class=\"coloredbutton\" onclick=\"setTab(2)\">特性</span> | <span id=\"tabbutton3\" class=\"coloredbutton\" onclick=\"setTab(3)\">性格</span> | <span id=\"tabbutton4\" class=\"coloredbutton\" onclick=\"setTab(4)\">倒した時の技</span> | <span id=\"tabbutton5\" class=\"coloredbutton\" onclick=\"setTab(5)\">倒した相手</span> | <span id=\"tabbutton6\" class=\"coloredbutton\" onclick=\"setTab(6)\">倒された時の技</span> | <span id=\"tabbutton7\" class=\"coloredbutton\" onclick=\"setTab(7)\">倒された相手</span> | <span id=\"tabbutton8\" class=\"coloredbutton\" onclick=\"setTab(8)\">チームメイト</span></span>";

            document.getElementById("tabbutton3").innerHTML = "性格";
        } else {
            document.getElementById("psnotabs").innerHTML = "<span id=\"tabbutton0\" class=\"coloredbutton\" onclick=\"setTab(0)\">Moves</span> | <span id=\"tabbutton1\" class=\"coloredbutton\" onclick=\"setTab(1)\">Items</span> | <span id=\"tabbutton2\" class=\"coloredbutton\" onclick=\"setTab(2)\">Abilities</span> | <span id=\"tabbutton3\" class=\"coloredbutton\" onclick=\"setTab(3)\">Natures</span> | <span id=\"tabbutton4\" class=\"coloredbutton\" onclick=\"setTab(4)\">Moves when victorious</span> | <span id=\"tabbutton5\" class=\"coloredbutton\" onclick=\"setTab(5)\">Opponents when victorious</span> | <span id=\"tabbutton6\" class=\"coloredbutton\" onclick=\"setTab(6)\">Moves when defeated</span> | <span id=\"tabbutton7\" class=\"coloredbutton\" onclick=\"setTab(7)\">Opponents when defeated</span> | <span id=\"tabbutton8\" class=\"coloredbutton\" onclick=\"setTab(8)\">Teammates</span></span>";

            document.getElementById("tabbutton3").innerHTML = "Natures";
        }
    }

    updateFormatInfo(value, number);

}

function updateSearch(cleared) {
    document.getElementById("buttonlist").innerHTML = "";
    createButtons();

    var value = document.getElementById("searchbox").value;

    if (cleared) {
        value = "";
        document.getElementById("searchbox").value = "";
    }

    if (value === "") {
        if (japanese) {
            document.getElementById("searchtext").innerHTML = "検索：";

        } else {
            document.getElementById("searchtext").innerHTML = "Search:";
        }
    } else {
        document.getElementById("searchtext").innerHTML = "<div style=\"padding:0px 1px 0px 2px\"><button onClick=(emptysearch())>Clear</button></div>";
    }

    document.getElementById("jpsearchresults").innerHTML = "";

    for (var i = 0; i < items.length; i++) {

        var include = false;

        for (var j = 0; j < datanames.length; j++) {
            var data = items[i][datanames[j]];

            if (data !== undefined && !japanese) {
                if (data.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                    include = true;
                }
            }
            if (data !== undefined && japanese) {
                if (data.toLowerCase().indexOf(value.toLowerCase()) >= 0 || passfilter(data).indexOf(value.toLowerCase()) >= 0) {
                    include = true;
                }
            }
        }
        if (include === false && document.getElementById("button" + i.toString()) !== undefined) {
            document.getElementById("button" + i.toString()).style.display = "none";
        } else if (include === true && document.getElementById("buttonbutton" + i.toString()) !== null) {
            document.getElementById("button" + i.toString()).style.display = "block";
        }
    }

    if (!japanese) {
        for (var entry in jpdict) {
            if (jpdict[entry].indexOf(value) >= 0 && value.length > 0) {
                document.getElementById("jpsearchresults").innerHTML += jpdict[entry] + " - " + entry + "<br>";
            }
        }
    }
}


function updateFormatInfo(format, number) {


    var formatFile;

    if (format.indexOf("sm") === 0) {
        formatFile = format.substring(3);
    } else if (format.indexOf("oras") === 0) {
        formatFile = format.substring(5);
    } else if (format.indexOf("usum") === 0) {
        formatFile = format.substring(5);
    } else {
        formatFile = format;
    }

    $.getScript("data/" + formatFile + ".js", function () {
        try {
            totalusage = window[format + "_totalusage"];
            items = window[format];

            mon = number;
            setTab(0);
            updateSearch(false);

            var lastupdate = "";
            if (window[format + "_lastupdate"] !== undefined) {
                if (!japanese) {
                    lastupdate = "Last update: " + window[format + "_lastupdate"] + " CET";
                }
                if (japanese) {
                    lastupdate = "最後の更新: " + window[format + "_lastupdate"] + " CET";
                }
            }
            document.getElementById("formatinfo").innerHTML = lastupdate;

        } catch (e) {

        }
    });


}

function lookForMon(name) {
    if (name.indexOf("-Mega-Y") >= 0 || name.indexOf("-Mega-X") >= 0) {
        name = name.substring(0, name.length - 7);
    }
    if (name.indexOf("-Mega") >= 0) {
        name = name.substring(0, name.length - 5);
    }
    if (name.indexOf("メガ") >= 0) {
        name = name.substring(2, name.length);
    }
    if (name.indexOf("Ｙ") >= 0 || name.indexOf("Ｘ") >= 0) {
        name = name.substring(2, name.length - 1);
    }

    for (var i = 0; i < items.length - 2; i++) {
        try {
            var buttonhtml = document.getElementById("button" + i.toString()).innerHTML;
            if (buttonhtml.indexOf(name) >= 0) {
                setTab(0);
                setData(i);
                document.getElementById("button" + i.toString()).className = "clickedbutton";
            } else {
                document.getElementById("button" + i.toString()).className = "button";
            }
        } catch (err) {
            var buttonhtml = null;
        }
    }
}

function emptysearch() {
    updateSearch(true);
}

function passfilter(string) {
    if (string === undefined) {
        return null;
    }
    var mega = "";
    var megaafter = "";
    if (japanese) {
        if (string.indexOf(" Forme") >= 0) {
            string = string.substring(0, string.length - 6);
        }
        if (string.indexOf("-Mega-Y") >= 0) {
            string = string.substring(0, string.length - 7);
            mega = "メガ";
            megaafter = "Ｙ";
        }
        if (string.indexOf("-Mega-X") >= 0) {
            string = string.substring(0, string.length - 7);
            mega = "メガ";
            megaafter = "Ｘ";
        }
        if (string.indexOf("-Mega") >= 0) {
            string = string.substring(0, string.length - 5);
            mega = "メガ";
        }
        if (string.indexOf(" Type") >= 0 || string.indexOf(" Form") >= 0) {
            string = string.substring(0, string.length - 5);
        }
    }

    if (tab === 0 && string === "Metronome") {
        string = "Metronomemove";
    }
    var jp = jpdict[string];
    if (string === "" || string === " ") {
        jp = "";
    }
    if (jp === undefined) {
        jp = string;
    }
    jp = mega + jp + megaafter;
    return jp;
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, "g"), replace);
}

resetData(0);