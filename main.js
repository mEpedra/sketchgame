var quickdraw =["Airplane","Basket","cake","book", "bucket", "cat", "dog","lion"]
var random_number= Math.floor((Math.random()* quickdraw.length)+1)
sketch= quickdraw[random_number]
document.getElementById("sketchtobedrawn").innerHTML="sketch to be drawn-"+sketch;
var timercounter=0
var timercheck=""
var answerhold=""
var score=0
var drawnsketch=""
function updatecanvas(){
    background("white")
    var random_number= Math.floor((Math.random()* quickdraw.length)+1)
sketch= quickdraw[random_number]
document.getElementById("sketchtobedrawn").innerHTML="sketch to be drawn-"+sketch;
} 
function setup() {
    canvas =createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}
function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}
function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY, mouseX, mouseY);
    }
    checksketch()
    if(drawnsketch==sketch){
        answerhold="set"
        score++
        document.getElementById("score").innerHTML="score_"+score;
    }
}
function clearCanvas(){

    background("white");
}
function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}
function gotResult(error, results){
    if(error) {
        console.error(error);
    }

console.log(results);
document.getElementById('label').innerHTML ='Label: ' + results[0].label;

document.getElementById('confidence').innerHTML = 'Confidence:' + Math.round(results[0].confidence*100) + '%';
utterThis - new SpeechSynthesisUtterance(results[0].label);
synth.speak(utterThis);
}
function checksketch(){
    timercounter++;
    document.getElementById("time").innerHTML="timer_"+timercounter;
    if (timercounter>400) {
        timercounter=0;
        timercheck="completed";
    }
    if (timercheck=="completed"||answerhold=="set") {
        timercheck="";
        answerhold="";
        updatecanvas();
    }
}
