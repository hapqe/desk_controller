if (localStorage.getItem('active-eruda') != 'true') {
    document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
    document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
}

const serviceUuid = "05794d9b-199e-4c1d-a76b-696dd27ff203";
const characterisicUuid = "100ecb4d-74ba-4dfe-8590-a4faafc1cc2e";

function connect() {
    navigator.bluetooth.requestDevice({ filters: [{ services: [serviceUuid] }] })
        .then(device => {
            if (!device) {
                console.log("No Device Chosen!");
                return;
            }

            Array.prototype.map.call(document.getElementsByClassName("move-button"), (button) => {
                button.disabled = false;
            })

            return device.gatt.connect();
        })
        .then(server => {
            return server.getPrimaryService(serviceUuid);
        })
        .then(service => {
            return service.getCharacteristic(characterisicUuid);
        })
        .then(characterisic => {
            document.getElementById("stop").onclick = () => {
                characterisic.writeValue(Uint8Array.of(0)).catch(error => { console.error(error); });
            }
            document.getElementById("down").onclick = () => {
                characterisic.writeValue(Uint8Array.of(1)).catch(error => { console.error(error); });
            }
            document.getElementById("up").onclick = () => {
                characterisic.writeValue(Uint8Array.of(2)).catch(error => { console.error(error); });
            }
        })

}

document.getElementById("connect").onclick = connect;
