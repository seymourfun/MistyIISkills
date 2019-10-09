/*
 *  MIT License
 *
 *
 *  Copyright (c) 2019 Scott Hakeem
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 * 
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
*/

//Checks Air Quality in local area based on Breezometer. Need to update API key and Lat/Lon in .json file

//Build Breeze URL
let breezeURL = "https://api.breezometer.com/air-quality/v2/current-conditions?lat=" + _params.Lat + "&lon=" + _params.Lon + "&key=" + _params.breezeApiKey

misty.SendExternalRequest("GET",breezeURL);


function _SendExternalRequest(data) {
    _data = JSON.parse(data.Result.ResponseObject.Data)
    _dataThere = _data.data.data_available
    _airQ = _data.data.indexes.baqi.aqi
    _airQVr = _data.data.indexes.baqi.aqi_display
    let MyAirQ = _airQ;
    
    if(MyAirQ < 19){
        misty.Debug("Poor")
        misty.ChangeLED(100, 0, 0);
        misty.DisplayImage("e_Contempt.jpg");
        misty.PlayAudio("s_Disgust.wav", 50);
    } else if (MyAirQ < 39){
        misty.Debug("Low")
        misty.ChangeLED(255, 162, 23);
        misty.DisplayImage("e_ApprehensionConcerned.jpg");
        misty.PlayAudio("s_Disapproval.wav", 60);
    } else if (MyAirQ < 59){
        misty.Debug("Moderate")
        misty.ChangeLED(56, 81, 255);
        misty.DisplayImage("e_ContentRight.jpg");
        misty.PlayAudio("s_Boredom.wav", 70);
    } else if (MyAirQ < 79){
        misty.Debug("Good")
        misty.ChangeLED(203, 255, 14);
        misty.DisplayImage("e_Joy.jpg");
        misty.PlayAudio("s_Joy2.wav", 80);
    } else if (MyAirQ < 100){
        misty.Debug("Excellent")
        misty.ChangeLED(19, 255, 36);
        misty.DisplayImage("e_Admiration.jpg");
        misty.PlayAudio("s_Love.wav", 100);
    };
  
    misty.Debug("Misty here! The air quality is at " + _airQ);
}




