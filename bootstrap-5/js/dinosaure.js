var mainMessage= {
    'fr': [
                "Bienvenu à vous !",
                ["Tout au long de cette visite vous allez découvrir un monde étonnant, qui aujoud'huit n'existe plus.",
                    "Pour commencer l'immersion cliquer sur la page suivante",
                    "Déclenchez l'annimation en cliquant sur le dinosaure",
                    "Pour accèder aux videos du dinosaure cliquez sur les liens"],
                "Suivant"
            ],
    'en': [
                "Welcome to you !",
                ["Throughout this visit you will discover an astonishing world, which  no longer exists today.",
                "To start the immersion click on the following page",
                "Trigger the annimation by clicking on the dinosaur",
                "To access the videos of the dinosaur click on the links"],
                "Next"
          ]

} ;





function animation(){
    $(".dinosaureSquelette").hide();
    $(".dinosaureReel").fadeIn("slow");
    afficheCache("lang",false);

}

var video=[];
function affichePlayer(e){
    afficheCache("lang",false);
    afficheCache("videoPlayer",true);

    var nbrLiens=$(".lienVideo").length;

    var pos=video.indexOf(e);
    if(pos===-1){
        video.push(e);
    }
    if(video.length===nbrLiens){
        quiz();
    }

}


function fermerLonglet() {
    afficheCache("videoPlayer",false);
}
function quiz() {

}
function afficheCache(e,v,s){
    var x= "hidden";
    if(v==true){
        x="visible";
    }
    if(s==null){
        document.getElementById(e).style.visibility=x;
    }else{
        document.querySelector(e).style.visibility=x;
    }

}

function getParamUrl(e){
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(e);
}
var lang=getParamUrl('lang');

function changeLangue(e){
    if(e==='en'| e==='fr') {
        lang = e;
        window.location.search="?lang="+lang;
    }
}


afficheInstuction();

function afficheInstuction(){

    $(".dinosaureReel").hide();
    fermerLonglet();

    afficheCache("div[class^='dino_']",false,true);

    document.getElementById("instruction").innerHTML=
        "<h1>"+mainMessage[lang][0]+"</h1>";

    for (var i=0;i<mainMessage[lang][1].length;i++){
        document.getElementById("instruction").innerHTML+=
            "<p>"+mainMessage[lang][1][i]+"</p>";
    }

    document.getElementById("instruction").innerHTML+=
            "<button type=\'button\' class=\'btn btn-success\' >"+mainMessage[lang][2]+"</button>";


    document.querySelector('#instruction > .btn').addEventListener('click',function () {
        afficheCache("lang",false);
        afficheCache("information",false);
        afficheCache("div[class^='dino_']",true,true);
    })
}

