import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { ControllerPage } from '../controller/controller';

@Component({
    selector: 'page-scan',
    templateUrl: 'scan.html'
})

export class ScanPage {

    private devices = [];
    //private isScanning: Boolean;
    private connected: Boolean;
    private device_id: string;
    private service: string;
    private characteristic: string;

    constructor(
        public ble: BLE,
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        //this.isScanning = false;
        this.connected = false;
        this.device_id = null;
        this.service = null;
        this.characteristic = null;
        
    }


    ble_scan(event) {
        this.devices = [];
        document.getElementById("status").innerHTML = "Scanning..."
		this.ble.startScanWithOptions([], { reportDuplicates: false }).subscribe(
            (device) => {
                this.devices.push(device);
                //document.getElementById("state").innerHTML = "Started Scanning...";
                //document.getElementById("action").innerHTML = "startScan()";
                //document.getElementById("data").innerHTML = JSON.stringify(this.devices);
                //document.getElementById("test").innerHTML = "test";
            },
            (error) => {
                //document.getElementById("state").innerHTML = "ERROR";
                //document.getElementById("action").innerHTML = "ERROR: startScan()";
                //document.getElementById("data").innerHTML = JSON.stringify(this.devices);
                //document.getElementById("test").innerHTML = "ERROR: " + error;
            }
        );
        
        /*
        this.ble.startScan([]).subscribe(
            (device) => {
                this.devices.push(device);
                document.getElementById("state").innerHTML = "Started Scanning...";
                document.getElementById("action").innerHTML = "startScan()";
                document.getElementById("data").innerHTML = JSON.stringify(this.devices);
                document.getElementById("test").innerHTML = "test";
            },
            (error) => {
                document.getElementById("state").innerHTML = "ERROR";
                document.getElementById("action").innerHTML = "ERROR: startScan()";
                document.getElementById("data").innerHTML = JSON.stringify(this.devices);
                document.getElementById("test").innerHTML = "ERROR: " + error;
            }
        );
        */

        setTimeout(() => {
            document.getElementById("status").innerHTML = "";
            this.ble.stopScan().then(
                (success) => {
                    //document.getElementById("state").innerHTML = "Scan successful";
                    //document.getElementById("action").innerHTML = "stopScan()";
                    //document.getElementById("test").innerHTML = "SUCCESS: " + success;
                    //this.isScanning = false;
                    
                    for (var i = 0; i < this.devices.length; i++) {
                        if (this.devices[i].name == undefined) {
                            this.devices.splice(i, 1);
                            //document.getElementById("data").innerHTML = JSON.stringify(this.devices);
                        }
                    }
                    
                },
                (reason) => {
                    //document.getElementById("state").innerHTML = "ERROR: ble_scan.setTimeout()";
                    //document.getElementById("action").innerHTML = "stopScan()";
                    //document.getElementById("test").innerHTML = "ERROR: " + reason;
                    //this.isScanning = false;
                }
            );
        }, 3000);
    }


    connect(device) {
        
        document.getElementById("status").innerHTML = "Attempting to connect to " + device.name;
        this.ble.connect(device.id).subscribe(
            (success) => {
                this.device_id = device.id;
                this.get_IDs(success);
                document.getElementById("status").innerHTML = "Connected!";
                //document.getElementById("state").innerHTML = "Connected";
                //document.getElementById("action").innerHTML = "connect(device)";
                //document.getElementById("test").innerHTML = "SUCCESS: " + success;
                
            },
            (reason) => {
                document.getElementById("status").innerHTML = "Failed to connect!";
                //document.getElementById("state").innerHTML = "ERROR";
                //document.getElementById("action").innerHTML = "connect(device)";
                //document.getElementById("test").innerHTML = "ERROR: " + reason;
            }
        );
        
    }


    // Parse through the connected object and get the serviceUUID and characteristicUUID of the device
    get_IDs(device) {
        // Look at each service ID value in the list of offered services...
        device.services.forEach(service => {
            // For each characteristic object (item) in the list of characteristics...
            device.characteristics.forEach(item => {
                // If the characteristic's service ID matches one of the offered services
                if (item.service == service) {
                    // Find out if the properties of the characteristic containing "WriteWithoutResponse"
                    item.properties.forEach(property => {
                        // If the characteristic contains the "WriteWithoutResponse"
                        if (property == "WriteWithoutResponse") {
                            // Save the characteristic and service UUIDs
                            this.service = item.service;
                            this.characteristic = item.characteristic;
                            
                        }
                    });						
                }
            });
        });
        //document.getElementById("data").innerHTML = "device_id: " + this.device_id + ", service: " + this.service + ", characteristic: " + this.characteristic;
    }

    /*
	Device Object:

		Android:
			{
				"name": "",
				"id": "",
				"advertising": {},
				"rssi": -0,
				"services":["","","ffe0"],	// use this: for each (service = device.services) -> for each ([service])
				"characteristics":				// device.characteristics -> [{},{},..}].item -> {}.service === devices
					[
						{	// This is the one we need
							"service": "ffe0",
							"characteristic": "ffe1",
							"properties": ["Read","WriteWithoutResponse","Notify"],
							// optional:
							"descriptors": [{"uuid": ""}, {"uuid": ""}]
						},
						{
							"service": "",
							"characteristic": "",
							"properties": ["","",""],
						},
						.
						.
						.
					]
			}

		iOS:
			{
				"characteristics":
					[
						{	// this is the one we want
							"properites": ["Read", "WriteWithoutResponse", "Notify"],
							"isNotifying": false,
							"characteristic": "FFE1",
							"service": "FFE0"
						},
						{
							"properties": ["", ""],
							"isNotifying": boolean,
							"characteristic": "",
							"service": ""
						},
						.
						.
						.
					],
				"id": "",
				"rssi": -0,
				"advertising": 
					{
						"kCBAdvDataLocalName": "",
						"kCBAdvDataServiceUUIDs": [""],	// could be useful, but doesn't exist in android object
						"kCBAdvDataTxPowerLevel": 0,
						"kCBAdvDataIsConnectable": boolean
					},
				"name": "",
				"services": ["","ffe0"]	// use this: for each (service = device.services) -> for each (["service"])
											// device.characteristics -> [{},{},...].item -> {}.service == service
			}
    */


    disconnect(event) {
        document.getElementById("status").innerHTML = "Attempting to disconnect...";
        this.ble.disconnect(this.device_id).then(
            (success) => {
                this.device_id = null;
                this.service = null;
                this.characteristic = null;
                document.getElementById("status").innerHTML = "Disconnected!";
                //document.getElementById("state").innerHTML = "Disconnected";
                //document.getElementById("action").innerHTML = "disconnect()";
                //document.getElementById("data").innerHTML = "device_id: " + this.device_id + ", service: " + this.service + ", characteristic: " + this.characteristic;
                //document.getElementById("test").innerHTML = "SUCCESS: " + success;
            },
            (reason) => {
                document.getElementById("status").innerHTML = "Failed to disconnect!";
                //document.getElementById("state").innerHTML = "ERROR";
                //document.getElementById("action").innerHTML = "disconnect()";
                //document.getElementById("test").innerHTML = "ERROR: " + reason;
            }
        );
    }

    goToController(event) {
        if (this.device_id != null) {
            this.navCtrl.push(
                ControllerPage,
                {
                    device_id: this.device_id,
                    service: this.service,
                    characteristic: this.characteristic
                }
            );
        }
    }
}