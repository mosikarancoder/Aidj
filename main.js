song_h="";
song = "";
song_b="";
rightWristX = 0;
leftWristX = 0;
rightWristY = 0;
leftWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song_h = loadSound("music.mp3");
    song_b = loadSound("song_2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('poseNet is intialized !');
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

  

if(scoreRightWrist > 0.2){

circle(rightWristX,rightWristY,20);

if(rightWristY > 0 && rightWristY <= 100){
    document.getElementById("speed").innerHTML="speed = 0.5X";
    song.rate(0.5);
}
else if(rightWristY > 100 && rightWristY <= 200){
    document.getElementById("speed").innerHTML="speed = 1X";
    song.rate(1);
}
else if(rightWristY > 200 && rightWristY <= 300){
    document.getElementById("speed").innerHTML="speed = 1.5X";
    song.rate(1.5);
}
else if(rightWristY > 300 && rightWristY <= 400){
    document.getElementById("speed").innerHTML="speed = 2X";
    song.rate(2);
}
else if(rightWristY > 400 && rightWristY <= 500){
    document.getElementById("speed").innerHTML="speed = 2.5X";
    song.rate(2.5);
}
}
if (scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_Decimal = floor(InNumberleftWristY);
    volume = remove_Decimal / 500;
    document.getElementById("volume").innerHTML = "Volume =" + volume;
    song.setVolume(volume);
}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause() {
    song.pause();
}

function stop() {
    song.stop();
}
function song_1(){
    song = song_h;
    
    //song.play();
}
function song_2(){
    song = song_b;

}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist =" + scoreLeftWrist + "scoreRightWrist" + scoreRightWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);


    }
}