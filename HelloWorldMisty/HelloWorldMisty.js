//My Version of the Misty II first mission. Hello world. Brought in the Misty License from the file as I only updated pieces  
//
/*********************************************************************
Copyright 2019 Misty Robotics, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at:
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
implied.
   
See the License for the specific language governing permissions and
limitations under the License.
**********************************************************************/




misty.Debug("The Hello World Misty skill is starting!");


// Returns a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// The look_around timer event invokes this callback function. Change
// the value of repeat to false if Misty should only move her head once.
function _look_around(repeat = false) {

    // Moves Misty's head to a random position. 
    misty.MoveHeadDegrees(
        getRandomInt(-40, 20), 
        getRandomInt(-30, 30), 
        getRandomInt(-40, 40), 
        30); 

      
        if (repeat) misty.RegisterTimerEvent(
        "look_around",
        getRandomInt(8, 10) * 1000,
        false);
}


misty.RegisterTimerEvent("look_around", getRandomInt(8, 10) * 1000, false);


//Changing Misty's LED


// The breathingLED timer event invokes this callback function.
function _breathingLED() {

    var red = 140 / 10.0;
    var green = 0 / 10.0;
    var blue = 220 / 10.0;

    // Incrementally DECREASES the intensity of each color in the LED
    for (var i = 10; i >= 0; i = i - 1) {
        misty.ChangeLED(
            Math.floor(i * red), 
            Math.floor(i * green), 
            Math.floor(i * blue)); 
       
        misty.Pause(150);
    }

    // Incrementally INCREASES the intensity of each color in the LED
    for (var i = 0; i <= 10; i = i + 1) {
        misty.ChangeLED(
            Math.floor(i * red), // red intensity
            Math.floor(i * green), // green intensity
            Math.floor(i * blue)); // blue intensity
      
        misty.Pause(150);
    }
   
    misty.RegisterTimerEvent("breathingLED", 1, false);
}

misty.RegisterTimerEvent("breathingLED", 1, false);


// Plays an audio file at max volume.
misty.PlayAudio("s_Amazement.wav", 100);
misty.Pause(3000);

misty.Debug("Drivetime ++++++++++++++++++++++++");
misty.DriveTime(0, 30, 5000);
misty.Pause(5000);
misty.DriveTime(0, -30, 5000);
misty.Pause(5000);
misty.Stop();


// Waves Misty's right arm!
function waveRightArm() {
    misty.MoveArmDegrees("right", -80, 30); 
    misty.Pause(3000); 
    misty.MoveArmDegrees("both", 80, 30); 
}

waveRightArm();


//Using Face Recognition

// Invoke this function to start Misty recognizing faces.
function _registerFaceRec() {
    misty.StopFaceRecognition();
    misty.StartFaceRecognition();
    misty.AddPropertyTest("FaceRec", "PersonName", "exists", "", "string");
    misty.RegisterEvent("FaceRec", "FaceRecognition", 1000, false);
}

// FaceRec events invoke this callback function.
function _FaceRec(data) {
    var faceDetected = data.PropertyTestResults[0].PropertyValue;
    misty.Debug("Misty sees " + faceDetected);

//Replace <Name 1> and <Name 2> with your names. Also custom .Wav  files recorded with names. 
//Those files need to be selcted to add with skill

    if (faceDetected == "<Name 1>") {
        misty.DisplayImage("e_Joy.jpg");
        misty.PlayAudio("<Name 1.wav>");
        waveRightArm();
    }
    else if (faceDetected == "<Name 2>") {
        misty.DisplayImage("e_EcstacyStarryEyed.jpg");
        misty.PlayAudio("<Name 2.wav>");

    }
        // If misty sees someone she doesn't know, she raises her eyebrow
    // and plays a different sound.
    else if (faceDetected == "unknown person") {
        misty.DisplayImage("e_Contempt.jpg");
        misty.PlayAudio("s_DisorientedConfused4.wav");
    };

    // Register for a timer event to invoke the _registerFaceRec
    // callback function loop through the _registerFaceRec() again
    // after 7000 milliseconds pass.
    misty.RegisterTimerEvent("registerFaceRec", 7000, false);
}

// Starts Misty recognizing faces!
_registerFaceRec();