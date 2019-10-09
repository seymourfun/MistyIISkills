This Misty II skill checks Breezometer.com's Air Quality API and animates Misty's response.

Prerequisites: Create an API account on Breezometer.com. This utilizes the free Air Quality API which is free for a 14 day trial. 

After you have signed up for your account you will need to update the key in the skills .json file
"breezeApiKey": "<Your API Key From Breezometer",
      
Also for your location right now you must set the Lat and Lon keys in the skills .json file. There are plenty of places to convert your location to Lat and Lon. I was using https://www.latlong.net/convert-address-to-lat-long.html but you can also get it form Google Maps. The default at the moment is the city of San Jose

"Lat":"37.334789",
"Lon":"-121.888138",


Next Steps: So I started this to complete the External API Skill Mission.  Still lots can be done with this. Ideas for next steps:
- Loop every 30 minutes to update the quality check. 
- Add in data for Sensors attached ot Misty or other indoor devices with Air Quality Sensors
- Include lookup of Lat/Lon by city or pull from other GPS device. 
