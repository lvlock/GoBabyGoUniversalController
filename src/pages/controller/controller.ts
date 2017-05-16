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
  private emergencyStopActivated: boolean;

  constructor(private ble: BLE, public navCtrl: NavController, public navParams: NavParams) {
      this.device_id = navParams.get("device_id");
      this.service = navParams.get("service");
      this.characteristic = navParams.get("characteristic");
      this.speed = 100;
      this.emergencyStopActivated = false;
  }


  setSpeed(event) {
    //console.log("Speed set to %" + this.speed + ".");
    if (this.speed == 0) {
      var pwmSpeed = 9;
      var data = new Uint8Array(1);
      data[0] = pwmSpeed;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    } 
    else if (this.speed == 25) {
      var pwmSpeed = 25;
      var data = new Uint8Array(1);
      data[0] = pwmSpeed;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    } 
    else if (this.speed == 50) {
      var pwmSpeed = 50;
      var data = new Uint8Array(1);
      data[0] = pwmSpeed;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    } 
    else if (this.speed == 75) {
      var pwmSpeed = 75;
      var data = new Uint8Array(1);
      data[0] = pwmSpeed;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    } 
    else if (this.speed == 100) {
      var pwmSpeed = 100;
      var data = new Uint8Array(1);
      data[0] = pwmSpeed;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    }
  }


  emergencyStop() {
    if (this.device_id != undefined) {
      // change the button
      var el = document.getElementById("stop");
      if (el.textContent == "EMERGENCY STOP") {
          el.textContent = "GO";
          el.style.background = "green";
          //console.log("Stop!");
      } else {
          el.textContent = "EMERGENCY STOP";
          el.style.backgroundColor = "red";
          //console.log("Go!");
      }
      // send data
      var data = new Uint8Array(1);
      data[0] = 10;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
      this.brake();
      this.emergencyStopActivated = true;
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
      data[0] = 5;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    }
  }


  forwardRight() {
    if (this.device_id != undefined) {
      var data = new Uint8Array(1);
      data[0] = 6;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    }
  }


  right() {
    if (this.device_id != undefined) {
      var data = new Uint8Array(1);
      data[0] = 4;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    }
  }


  left() {
    if (this.device_id != undefined) {
      var data = new Uint8Array(1);
      data[0] = 3;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    }
  }


  backward() {
    if (this.device_id != undefined) {
      var data = new Uint8Array(1);
      data[0] = 2;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    }
  }


  backwardLeft() {
    if (this.device_id != undefined) {
      var data = new Uint8Array(1);
      data[0] = 7;
      this.ble.writeWithoutResponse(this.device_id, this.service, this.characteristic, data.buffer);
    }
  }


  backwardRight() {
    if (this.device_id != undefined) {
      var data = new Uint8Array(1);
      data[0] = 8;
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
