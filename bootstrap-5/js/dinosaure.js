var tabMessage= {
    'fr': [
                "Bienvenue à vous !",
                [" Tout au long de cette visite vous allez découvrir un monde étonnant, qui aujourd'hui n'existe plus.",
                " Pour commencer l'immersion cliquer sur la page suivante.",
                " Déclenchez l'animation en cliquant sur le dinosaure.",
                " Pour accèder aux videos du dinosaure cliquez sur les liens."],
                ["Faites votre choix : ",
                " Vous pouvez désormais faire le quizz ou passer au dinosaure suivant !",
                " Faire le quiz"],
                "Suivant"
          ],

    'en': [
                "Welcome to you !",
                ["Throughout this visit you will discover an astonishing world, which  no longer exists today.",
                " To start the immersion click on the following page.",
                " Trigger the animation by clicking on the dinosaur.",
                " To access the videos of the dinosaur click on the links."],
                ["Make your choice :",
                "You can do the quiz now or move on to the next dinosaur !",
                "Do the quiz"],
                "Next"
          ],
    'dino':{
            'squelette':[
                        ["image.jpg",4],
                        ["20269988.jpg",2]
                        ],
            'reel' : [
                         ["dmytro-teslenko-t-rex-001.jpg",[
                                                                ["100px","150px"],["220px","440px"],["10px","450px"],["280px","650px"]
                                                          ]
                         ],
                         ["Camarasaurus-Paul-Heaston1_f596.jpg",[
                                                                     ["220px","300px"],["150px","440px"]
                                                                ]
                        ]
                    ]
            },
    'video':["vhCOB1ara3k"]


} ;


var video=[];
var lang=getParamUrl('lang');
var numDino=getParamUrl('dino');

if(numDino===null) {
    numDino=1;
}

chargementPage();

function animation(){
    afficheCache("dinoSquelette");
    $("#dinoReel").fadeIn("slow");
    afficheCache("lang",false);
}


function afficheLecteur(e){
    afficheCache("lang");
    afficheCache("videoPlayer",true);
    var youtubeUrl='https://www.youtube.com/embed/'+tabMessage['video'][0];
    document.querySelector("iframe").setAttribute("src",youtubeUrl);
    var lienVideo= document.querySelector("#videoPlayer img");


    var pos=video.indexOf(e);
    if(pos===-1){
        video.push(e);

    }
    var nbrLiens=$("#videos img").length;
    if(video.length===nbrLiens){
        lienVideo.addEventListener('click',function () {
            fermerLonglet();
            afficheCache("dinoReel");
            afficheCacheQuiz(true);
        });

        lienVideo.addEventListener('click',function () {
            alert("test");
        });
    }

}


function fermerLonglet() {
    afficheCache("videoPlayer",false);
    document.querySelector("#videoPlayer iframe").setAttribute("src","");
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
    document.querySelector("#instruction h1").innerHTML= tabMessage[lang][0];
    document.querySelector("#instruction p").innerHTML="";

    for (var i=0;i<tabMessage[lang][1].length;i++){
        document.querySelector("#instruction p").innerHTML+=tabMessage[lang][1][i];
    }

    document.querySelector("#instruction .btn-success").innerHTML=tabMessage[lang][3];

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
    document.querySelector(".modal-title").innerHTML=tabMessage[lang][2][0];
    document.querySelector(".modal-body").innerHTML=tabMessage[lang][2][1];
    document.querySelector(".modal .btn-primary").innerHTML=tabMessage[lang][2][2];
    document.querySelector(".modal .btn-success").innerHTML=tabMessage[lang][3];
}

function quiz(numDino) {
    window.location.href="page/quiz.php?lang="+lang+"&nom="+nom+"&dino="+numDino;
}

function chargementPage(){
    if(lang==null){
        window.location.href="page/login.html";
    }

    afficheCacheQuiz();
    afficheCache("dinoReel");
    afficheCache("dinosaure");
    fermerLonglet();
    afficheInstuction();
    changeDino(tabMessage['dino']['squelette'][numDino-1][0],tabMessage['dino']['reel'][numDino-1][0]);

    document.querySelector(".modal .btn-primary").addEventListener('click',function () {
        quiz(numDino);
    });

    document.querySelector(".modal .btn-success").addEventListener('click',function () {
        var nbLiens=tabMessage['dino']['squelette'][numDino-1][1];
        var lienVideo=document.querySelector("#videos img");

        changeDino(tabMessage['dino']['squelette'][numDino-1][0],tabMessage['dino']['reel'][numDino-1][0],true);

        $(".modal").modal('hide');

      //  animation();
    });
}

function changeDino(imgSquelette,imgReel,affiche=false){
    video=[];
    var urlSqueltte='./img/'+imgSquelette;
    var urlReel='./img/'+imgReel;
    document.querySelector("#dinoSquelette .dino").setAttribute("src",urlSqueltte);
    document.querySelector("#dinoReel .dino").setAttribute("src",urlReel);
    var nbLiens=tabMessage['dino']['squelette'][numDino-1][1];
    var lienVideo=document.querySelector("#videos > .col-md-12");

    lienVideo.innerHTML="";

    for(var i=0;i<nbLiens;i++){
        var bottom=tabMessage['dino']['reel'][numDino-1][1][i][0];
        var left=tabMessage['dino']['reel'][numDino-1][1][i][1];
        lienVideo.innerHTML+=
            "<img  src='./img/tyrannosaurus-rex.png' onclick='afficheLecteur("+(i+1)+")' style='bottom:"+bottom+"; left:"+left+";'>";
        
    }

    if(tabMessage['dino']['squelette'].length >= numDino){
        numDino++;
    }

    if(affiche===true){
        afficheCache("dinosaure",true);
        afficheCache("dinoSquelette",true);
    }
}

