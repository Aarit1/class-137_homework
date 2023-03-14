status = "";
video = "";
objects=[];

function setup() { 
    canvas = createCanvas(500,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function start() 
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("model_status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("input").value;
}

function modelLoaded() { 
    console.log("model loaded");
    status = "true";
}

function draw() {
    image(video, 0, 0, 500, 400);

    if(status != "")
    {
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("model_status").innerHTML = 'Status: Objects Detected';

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y +15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label = object_name) {
                video.stop;        
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = object_name + " Found";
                
            }
            else {
                document.getElementById("object_status").innerHTML = object_name + " Not Found";
            }
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = [results];
}
