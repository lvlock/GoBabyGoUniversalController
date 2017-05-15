import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

@Component({
  selector: 'page-controller',
  templateUrl: 'controller.html'
})
export class ControllerPage {

  private device_id: string;
  private service: string;
  private characteristic: string;
  private speed: number;

  constructor(private ble: BLE, public navCtrl: NavController, public navParams: NavParams) {
      this.device_id = navParams.get("device_id");
      this.service = navParams.get("service");
      this.characteristic = navParams.get("characteristic");
      this.speed = 100;
  }


  setSpeed(event) {
    console.log("Speed set to %" + this.speed + ".");
    var pwmSpeed = 255;
    var data = new Uint8Array(1);
    data[0] = pwmSpeed;
  }


  emergencyStop() {
    if (this.device_id != undefined) {
      var data = new Uint8Array(1);
      data[0] = 10;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    }
  }


  forward() {
    if (this.device_id != undefined) {
      var data = new Uint8Array(1);
      data[0] = 1;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    }
  }


  forwardLeft() {
    if (this.device_id != undefined) {
      var data = new Uint8Array(1);
      data[0] = 1;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    }
  }


  forwardRight() {
    if (this.device_id != undefined) {
      var data = new Uint8Array(1);
      data[0] = 1;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    }
  }


  right() {
    if (this.device_id != undefined) {
      var data = new Uint8Array(1);
      data[0] = 1;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    }
  }


  left() {
    if (this.device_id != undefined) {
      var data = new Uint8Array(1);
      data[0] = 1;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    }
  }


  backward() {
    if (this.device_id != undefined) {
      var data = new Uint8Array(1);
      data[0] = 1;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    }
  }


  backwardLeft() {
    if (this.device_id != undefined) {
      var data = new Uint8Array(1);
      data[0] = 1;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    }
  }


  backwardRight() {
    if (this.device_id != undefined) {
      var data = new Uint8Array(1);
      data[0] = 1;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    }
  }


  brake() {
    if (this.device_id != undefined) {
      var data = new Uint8Array(1);
      data[0] = 0;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    }
  }
}
