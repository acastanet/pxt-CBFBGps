

/**
 * Gps grove utilitaire
 */
enum sendUSB {
    //% block="Vrai"
    True,
    //% block="Faux"
    False
}

/**
 * Custom blocks
 */
//% color="#2c3e50" weight=10 icon="\uf279"

namespace CBFBGPS {

    let varTemp = "";
    /**
     * Lire une trame GPS
     * @param RX pin
     * @param TX pin
     * @param vitesse (default is 9600)
     */
    //% blockId="readGPS" block="readGPS envoiUSB %envoiUSB"
    export function readGPS(envoiUSB: sendUSB): any {


        let tt = serial.readBuffer(64);
        if (envoiUSB == sendUSB.False) {
            let gg = "";
            let i = 0
            gg = String.fromCharCode(tt[0])
            for (i = 1; (i < 64); i++)
                gg = gg + String.fromCharCode(tt[i])

            let decoupe = gg.split("$")
            let nbc = decoupe.length
            switch (nbc) {
                case 0:
                    return "";
                    break;
                case 1:
                    if (varTemp.length > 0)
                        varTemp = varTemp + decoupe[0];
                    return "";
                    break;
                case 2:
                    if (decoupe[0].length == 0) {
                        let temp = varTemp
                        varTemp = "$" + decoupe[1]
                        return temp
                    }
                    else {
                        if (varTemp.length > 0) {
                            let temp = varTemp + decoupe[0];
                            varTemp = "$" + decoupe[1]
                            return temp
                        }
                        else {
                            varTemp = "$" + decoupe[1]
                            return ""
                        }
                    }
                    break;
                case 3:
                    // cas ou gg=$X$Y ou X$Y$Z

                    varTemp = "$" + decoupe[2]
                    return "$" + decoupe[1]

                    break;
                default:
                    varTemp = "$" + decoupe[nbc - 1];
                    return "$" + decoupe[nbc - 2];

            }
        }
        else serial.writeBuffer(tt)


    }

    function convertDegre(deg: string): number {

        let dd = parseFloat(deg);
        dd = dd / 100;
        let d = Math.trunc(dd)
        dd = (dd - d) * 100
        dd = dd / 60

        let reconst = (d + dd)
        return reconst

    }
    /**
     * Recupération de la laitude et de la longitude de trame GPGGA 
     * @param trame
     */
    //% blockId="recupLatLong" block="recupLatLong RX %RX"
    export function recupLatLong(trame: string): number[] {
        let c: number[] = [];
        let decoupe = trame.split(",")
        if (decoupe.length > 5) {
            if (decoupe[0].compare("$GPGGA") == 0) {


                c.push(convertDegre(decoupe[2]))
                c.push(convertDegre(decoupe[4]))


            }
        }

        return c;

    }

    /**
     * initTialisation GPS
     * @param RX
     */
    //% blockId="initGPS" block="initGPS RX %RX"
    export function initGPS(RX: SerialPin) {
        serial.setRxBufferSize(120)
        serial.setTxBufferSize(120)
        serial.redirect(SerialPin.USB_TX, RX, 9600)

    }

}