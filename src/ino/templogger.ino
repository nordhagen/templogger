/* Sensor test sketch
  for more information see http://www.ladyada.net/make/logshield/lighttemp.html
  */

#define aref_voltage 5.0         // we tie 3.3V to ARef and measure it with a multimeter!
 
/*
  TMP36 Pin Variables
  the analog pin the TMP36's Vout (sense) pin is connected to
  the resolution is 10 mV / degree centigrade with a
  500 mV offset to allow for negative temperatures
  */
int tempPin = 0;

// the analog reading from the sensor        
int tempReading;
 
void setup(void) {
  // We'll send debugging information via the Serial monitor
  Serial.begin(9600);   
 
  // If you want to set the aref to something other than 5v
  // analogReference(EXTERNAL);
}
 
void loop(void) {
  // Send reading every minute
  float reading = analogRead(tempPin);  
 
  // Converting that reading to voltage, which is based off the reference voltage
  float voltage = reading / 1024 * aref_voltage;
 
  // Converting from 10 mv per degree wit 500 mV offset
  // to degrees ((volatge - 500mV) times 100)
  float temperatureC = (voltage - 0.5) * 100 ;  
                                                
  Serial.print("{ \"tempC\": ");
  Serial.print(temperatureC);
  Serial.println(" }");
  delay(60000);
}
