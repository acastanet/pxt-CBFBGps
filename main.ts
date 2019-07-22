
/**
 * Gps grove utilitaire
 */
enum sendUSB {
    //% block="Serie"
    True,
    //% block="Bleutooth"
    False
}

/**
 * Custom blocks
 */
//% color="#2c3e50" weight=10 icon="\uf279"

namespace CBFBGPS {


    /**
     * Lire une trame GPS
     * @param RX pin
     * @param TX pin
     * @param vitesse (default is 9600)
     */
    //% blockId="readGPS" block="readGPS envoi %envoiUSB"
    export function readGPS(envoiUSB: sendUSB) {

        basic.showNumber(0)

        if (envoiUSB == sendUSB.False) {

            serial.setRxBufferSize(64)
            serial.setTxBufferSize(0)
            let l1 = serial.readBuffer(64)





            basic.showNumber(l1[41])
            if (l1[28] == 78) bluetooth.uartWriteBuffer(l1.slice(18, 11))
            if (l1[41] == 69) bluetooth.uartWriteBuffer(l1.slice(30, 12))

        }
        else serial.writeBuffer(serial.readBuffer(64))


    }

    /**
     * initTialisation GPS
     * @param RX
     */
    //% blockId="initGPS" block="initGPS RX %RX"
    export function initGPS(RX: SerialPin) {
        serial.setRxBufferSize(64)
        serial.setTxBufferSize(64)
        serial.redirect(SerialPin.USB_TX, RX, 9600)

    }

}