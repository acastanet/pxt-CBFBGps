let tt = ""
CBFBGPS.initGPS(SerialPin.P16)
basic.forever(function () {
    tt = CBFBGPS.readGPS(sendUSB.True)
    
})