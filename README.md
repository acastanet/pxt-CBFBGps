![Icon](https://github.com/sntlpdn/pxt-CBFBGps/blob/master/icon.png)
# CBFBGPS

makecode gps grove package for micro:bit, auteurs : Mme BOHN et M. BOSSAERT juillet 2019

 
 


## Add extension

Ouvrir votre projet microbit makecode , dans Extension, coller  

https://github.com/sntlpdn/pxt-CBFBGps 

dans rechercher.

## Usage de base

```
let tt = ""
CBFBGPS.initGPS(SerialPin.P16)
basic.forever(function () {
    tt = CBFBGPS.readGPS(sendUSB.True)
    
})
```

## API

- initGPS(RX: SerialPin)  
Initial le port serie avec le pin 16 en entrée et le port USB en sortie avec un débit de 9600 bits par seconde 
 

- readGPS(envoiUSB: sendUSB)  
envoiUSB prend deux valeurs soir vraie, soir faux
si la valeur est vraie alors les trame du gps sont redirigées vers l'usb
sinon la fonction renvoie une chaine de caractère comportant une trame ou une chaine vide si problème de reception  

- recupLatLong(trame: string): number[]
Recupère la latitude et longitude des trame GPGGA en renvoyant
une liste des deux valeurs ou une liste vide sinon  


## License

MIT

Copyright (c) 2019, microbit/micropython

## Supported targets

* for PXT/microbit


[From microbit LPDN]
