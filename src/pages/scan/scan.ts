import { Component } from '@angular/core';
import { BLE } from '@ionic-native/ble';

@Component({
    selector: 'page-scan',
    templateUrl: 'scan.html'
})

export class ScanPage {

    public devices = [];

    constructor(
        public ble: BLE
    ) {

    }

    // functions
    ble_scan(event) {
		document.getElementById("action").innerHTML = "Scanning for BLE devices";

		this.ble.scan([], 15).subscribe(
			(device) => {
				this.devices.push(device);
				document.getElementById("data").innerHTML = "Scan successful";
			},
			(reason) => {
				document.getElementById("data").innerHTML = "BLE scan failed: " + reason;
			}
		);
    }

    connect(device) {

    }

    disconnect(event) {

    }
}