objects=[];
img="";
status="";
random_r= 0;
random_g= 0;
random_b= 0;


function preload() {
    alertSound=loadSound("warning_alert.mp3");
    

}

function setup() {
    canvas=createCanvas(380,380);
    canvas.center();
 //seting up web cam live view
      video=createCapture(VIDEO);
      video.size(380,380);
      video.hide();
//cordinates for canvas use this 'canvas.position(x,y);'
    objectDetector=ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML="Status: Dectecting Objects";
}





function modelLoaded() {
    console.log("Model Loaded!");
    //change status
    status=true;
    objectDetector.detect(img,gotResults);
}

function gotResults(error , results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects=results;
    }
}


function draw() {

  //placing  web cam live in canvas in canvas
    image(video,0 , 0 , 380 , 380);

  if (status != "") {
          objectDetector.detect(video,gotResults);
          random_r= random(254)+1;
          random_g= random(254)+1;
          random_b= random(254)+1;
      for ( i = 0; i < objects.length; i++) {
         document.getElementById("status").innerHTML="Status: Objects Detected";   
         fill(random_r, random_g, random_b );
         pc=Math.floor(objects[i].confidence * 100);
         text(objects[i].label + " " + pc + "%" , objects[i].x + 5 ,objects[i].y + 13);
         noFill();
         stroke(random_r, random_g, random_b);
         rect(objects[i].x , objects[i].y ,objects[i].width ,objects[i].height);
         if (objects[i].label == "person") {
             document.getElementById("length").innerHTML="Baby Detected";
             alertSound.stop()
         }else{
            document.getElementById("length").innerHTML="Baby not Detected!";

            alertSound.play()
         }
         if (objects.length <= 0) {
            document.getElementById("length").innerHTML="Baby not Detected!";
            alertSound.play()
         } 

      }
  }
    
}

  