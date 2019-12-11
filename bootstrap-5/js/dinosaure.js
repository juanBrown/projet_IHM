var mainMessage= {
    'fr': [
                "Bienvenu à vous !",
                ["Tout au long de cette visite vous allez découvrir un monde étonnant, qui aujoud'huit n'existe plus.",
                "Pour commencer l'immersion cliquer sur la page suivante",
                "Déclenchez l'annimation en cliquant sur le dinosaure",
                "Pour accèder aux videos du dinosaure cliquez sur les liens"],
                ["Faites votre choix",
                "Vous pouvez désormais faire le quizz ou passer au dinosaure suivant !",
                "Faire le quiz"],
                "Suivant"
          ],

    'en': [
                "Welcome to you !",
                ["Throughout this visit you will discover an astonishing world, which  no longer exists today.",
                "To start the immersion click on the following page",
                "Trigger the annimation by clicking on the dinosaur",
                "To access the videos of the dinosaur click on the links"],
                ["Make your choice",
                "You can do the quiz now or move on to the next dinosaur !",
                "Do the quiz"],
                "Next"
          ],
    'dino':{
            'squelette':["image.jpg","20269988.jpg"],
            'reel': ["dmytro-teslenko-t-rex-001.jpg","Camarasaurus-Paul-Heaston1_f596.jpg"]
            }

} ;


//window.location.href="page/login.html";
var video=[];
var lang=getParamUrl('lang');
var numDino=1;
chargementPage();

function animation(){
    afficheCache("dinoSquelette");
    $("#dinoReel").fadeIn("slow");
    afficheCache("lang",false);
    numDino++;

}


function afficheLecteur(e){
    afficheCache("lang");
    afficheCache("videoPlayer",true);
    var nbrLiens=$(".lienVideo").length;

    var pos=video.indexOf(e);
    if(pos===-1){
        video.push(e);
    }
    if(video.length===nbrLiens){
        document.querySelector("#videoPlayer img").addEventListener('click',function () {
            fermerLonglet();
            afficheCache("dinoReel");
            afficheCacheQuiz(true);
        });
    }

}


function fermerLonglet() {
    afficheCache("videoPlayer",false);
}

function afficheCache(e,v=false,s=false){
    var x= "none";
    if(v==true){
        x="block";
    }
    if(!s){
        document.getElementById(e).style.display=x;
    }else{
        document.querySelector(e).style.display=x;
    }

}

function getParamUrl(e){
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(e);
}


function changeLangue(e){
    if(e==='en'| e==='fr') {
        lang = e;
        window.location.search="?lang="+lang;
    }
}



function afficheInstuction(){

    document.querySelector("html").setAttribute("lang",lang);

    document.getElementById("instruction").innerHTML=
        "<h1>"+mainMessage[lang][0]+"</h1>";

    for (var i=0;i<mainMessage[lang][1].length;i++){
        document.getElementById("instruction").innerHTML+=
            "<p>"+mainMessage[lang][1][i]+"</p>";
    }

    document.getElementById("instruction").innerHTML+=
            "<button type=\'button\' class=\'btn btn-success\' >"+mainMessage[lang][3]+"</button>";


    document.querySelector('#instruction > .btn').addEventListener('click',function () {
        afficheCache("lang");
        afficheCache("information");
        afficheCache("dinosaure",true);
    })

}

function afficheCacheQuiz(v=false){
    $("#exampleModalCenter").modal("hide");
    if(v==true){
        $("#exampleModalCenter").modal("show");
        langQuiz();
    }
  // afficheCache("#lancerQuiz",v,true);
}

function langQuiz(){
    document.querySelector(".modal-title").innerHTML=mainMessage[lang][2][0];
    document.querySelector(".modal-body").innerHTML=mainMessage[lang][2][1];
    document.querySelector(".modal .btn-primary").innerHTML=mainMessage[lang][2][2];
    document.querySelector(".modal .btn-success").innerHTML=mainMessage[lang][3];
}

function quiz(numDino) {
    window.location.href="page/quiz.php?lang="+lang+"&nom="+nom+"&dino="+numDino;
}

function chargementPage(){
    afficheCacheQuiz();
    afficheCache("dinoReel");
    afficheCache("dinosaure");
    fermerLonglet();
    afficheInstuction();

    document.querySelector(".modal .btn-primary").addEventListener('click',function () {
        quiz(numDino);
    });
    document.querySelector(".modal .btn-success").addEventListener('click',function () {
        animation();
    });

}