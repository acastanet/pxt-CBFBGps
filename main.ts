

/**
 * Gps grove utilitaire
 */
//% color="#2c3e50" weight=10
namespace CBFBGps {
    /**
     * Lire une trame GPS
     * @param RX pin
     * @param TX pin
     * @param vitesse (default is 9600)
     */
    //% blockId="readGPS" block="readGPS rx %rx|tx %tx|vitesse %vitesse"
    export function readGPS(rx: SerialPin, tx: SerialPin, vitesse: number): string {
        
     PinName txn;
      PinName rxn;
      if (serial.tryResolvePin(tx, txn) && serial.tryResolvePin(rx, rxn))
	  {
        uBit.serial.redirect(txn, rxn);
      uBit.serial.baud((int)vitesse);}
     /* int n = uBit.serial.getRxBufferSize();
     if (n > 0) return PSTR(uBit.serial.read(1, MicroBitSerialMode::ASYNC))*/
	  return "coucou";
        
    }
}
