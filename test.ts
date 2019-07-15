basic.forever(() => {
    let p = CBFBGps.readGPS(SerialPin.P15, SerialPin.P16, 9600);
    
})
