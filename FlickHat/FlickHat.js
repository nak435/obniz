class FlickHat {
  constructor() {
    this.keys = ['vcc', 'gnd', 'sda', 'scl', 'reset', 'ts', 'led1', 'led2'];
    this.requiredKeys = ['gnd', 'sda', 'scl', 'reset', 'ts'];

    this.displayIoNames = {
      //vcc: 'vcc', //5v
      sda: 'sda',
      scl: 'scl',
      gnd: 'gnd',
      reset: 'reset',
      ts: 'ts',
    };
  }

  static info() {
    return {
      name: 'FlickHat',
    };
  }

  wired(obniz) {
    this.obniz = obniz;

    this.address = 0x42;

    if (this.obniz.isValidIO(this.params.vcc)) {
      this.obniz.getIO(this.params.vcc).drive('5v');
      this.obniz.getIO(this.params.vcc).output(true);
    }
    this.obniz.getIO(this.params.gnd).output(false);

    this.io_reset = this.obniz.getIO(this.params.reset);
    this.io_reset.drive('3v');
    this.io_reset.output(true);

    this.io_ts = this.obniz.getIO(this.params.ts);
    this.io_ts.drive('open-drain');
    this.io_ts.pull('3v');

    this.params.mode = 'master';
    this.params.pull = '3v';
    this.params.clock = 100 * 1000; //100KHz

    //PeripheralI2C
    this.i2c = this.obniz.getI2CWithConfig(this.params);

    if (this.obniz.isValidIO(this.params.led1)) {
      this.led1 = this.obniz.wired("LED", { anode: this.params.led1 });
    }
    if (this.obniz.isValidIO(this.params.led2)) {
      this.led2 = this.obniz.wired("LED", { anode: this.params.led2 });
    }

  }

  async _reset() {
    this.io_reset.output(false);
      await this.obniz.wait(50);
    this.io_reset.output(true);
      await this.obniz.wait(200);
  }

  async start(callbackFwInfo) {

    this.onfwinfo = callbackFwInfo;
    this.fwInfo = {
      fwValid: 0,
      fwInfoReceived: false,
    };
    this.rotation = 0;
    this.lastRotation = 0;

    await this._reset();

    let data = await this._readMsg(132);
    let msgID = data[3];
    if (msgID != 0x83) {
      throw new Error(`Did not receive firmware information. msgID:0x${msgID.toString(16)}`);
    }

    this._firmwareInfo(data);          
    await this.obniz.wait(40);

    this.i2c.write(this.address, [
      0x10,
      0x00,
      0x00,
      0xa2,
      0xa1,
      0x00,
      0x00,
      0x00,
      0x1f,
      0x00,
      0x00,
      0x00,
      0xff,
      0xff,
      0xff,
      0xff,
    ]);
    await this.obniz.wait(100);

    this.i2c.write(this.address, [
      0x10,
      0x00,
      0x00,
      0xa2,
      0x80,
      0x00,
      0x00,
      0x00,
      0x3f,
      0x00,
      0x00,
      0x00,
      0x3f,
      0x00,
      0x00,
      0x00,
    ]);
  }

  _dataArray2string(data) {
    let result = '';
    for (let n of data) {
      result += String.fromCharCode(n);
    }
    return result;
  }

  async _readMsg(readSize) {
    let ts = await this.io_ts.inputWait();
    if (!ts) {
      this.io_ts.pull('0v');
      //await this.obniz.wait(1);

      try {
        let data = await this.i2c.readWait(this.address, readSize);
        let size = data[0];
        // let flag = data[1];
        // let seq = data[2];
        // let msgID = data[3];
  
        if (size != 0xff && size > 0) {
          if (this.debugprint || this.obniz.debugprint) {
            console.log(
              'flickHat: ' + data.slice(0, size).map(v => '0x' + v.toString(16))
            );
          }
          return data;
        } else return [0, 0, 0, 0, 0, 0, 0, 0, 0];

      } finally {
        this.io_ts.pull('3v');
        //await this.obniz.wait(1);
      }

    } else return [0, 0, 0, 0];
  }

  _sensorData(data) {
  //DataOutputConfigMask	2byte
    // const maskDSPStatus = 1;
    const maskGestureInfo = 1 << 1;
    const maskTouchInfo = 1 << 2;
    const maskAirWheelInfo = 1 << 3;
    const maskXYZPosition = 1 << 4;

    //SystemInfo	1byte
    const sysPositionValid = 1;
    const sysAirWheelValid = 1 << 1;
    // const sysDSPRunning = 1 << 7;

    let seq = data[2];

    let configmask = data[4] | (data[5] << 8); //little endian
    // let timestamp = data[6]; // 200hz, 8-bit counter, max ~1.25sec
    let sysinfo = data[7];
    // let dspstatus = data.slice(8, 10);
    let gesture = data.slice(10, 14);
    let touch = data.slice(14, 18);
    let airwheel = data.slice(18, 20);
    // let noisepow = data.slice(27, 30);
    if (
      gesture[0] == 255 &&
      gesture[1] == 255 &&
      gesture[2] == 255 &&
      gesture[3] == 255
    ) return;

    if (configmask & maskXYZPosition && sysinfo & sysPositionValid) {
      let xyz = {
        //little endian
        x: (data[20] | (data[21] << 8)) / 65536,
        y: (data[22] | (data[23] << 8)) / 65536,
        z: (data[24] | (data[25] << 8)) / 65536,
        seq: seq,
      };
      this.xyz = xyz;
      if (typeof this.onxyz == 'function') this.onxyz(xyz);
    }

    if (configmask & maskGestureInfo && gesture[0] > 0) {
      this.lastGesture = gesture[0];
      const gestures = [
        ['', '', ''], //no gesture
        ['garbage', '', ''],
        ['flick', 'west', 'east'], //2
        ['flick', 'east', 'west'], //3
        ['flick', 'south', 'north'], //4
        ['flick', 'north', 'south'], //5
        ['circle', 'clockwise', ''],
        ['circle', 'counter-clockwise', ''][('wave', 'x', '')],
        ['wave', 'y', ''],
        ['hold', '', ''],
      ];
      for (let index in gestures) {
        if (
          index == gesture[0] &&
          typeof this.ongestureall == 'function'
        )
          this.ongestureall({
            action: gestures[index][0],
            from: gestures[index][1],
            to: gestures[index][2],
            raw: gesture,
            seq: seq,
          });
        if (
          index == gesture[0] &&
          gestures[index][0] == 'flick' &&
          typeof this.ongesture == 'function'
        )
          this.ongesture({
            action: 'gesture',
            from: gestures[index][1],
            to: gestures[index][2],
            raw: gesture,
            seq: seq,
          });
      }
    }

    if (
      configmask & maskTouchInfo &&
      !(touch[0] == 0 && touch[1] == 0) &&
      touch[3] == 0
    ) {
      //console.log('touch: ' + touch.map(v => '0x' + v.toString(16)));
      let touchAction = touch[0] | (touch[1] << 8); //little endian
      if (touchAction == 0xffff) return;

      // let touchCount = touch[2] * 5; // touch counter value * 5[ms]
      const actions = [
        ['touch', 'south'], //0
        ['touch', 'west'], //1
        ['touch', 'north'], //2
        ['touch', 'east'], //3
        ['touch', 'center'], //4
        ['tap', 'south'], //5
        ['tap', 'west'], //6
        ['tap', 'north'], //7
        ['tap', 'east'], //8
        ['tap', 'center'], //9
        ['doubletap', 'south'], //10
        ['doubletap', 'west'], //11
        ['doubletap', 'north'], //12
        ['doubletap', 'east'], //13
        ['doubletap', 'center'], //14
      ];

      let touches = [];
      let taps = [];
      let doubletaps = [];
      this.lastTouch = touchAction;

      let comp = 1;
      for (let index in actions) {
        let value = actions[index];
        if (touchAction & comp) {
          //console.log(`touchAction:${touchAction.toString(16)}, comp:${comp.toString(16)}, index:${index}, group:${group}`);
          switch (value[0]) {
            case 'touch':
              touches.push(value[1]);
              break;
            case 'tap':
              taps.push(value[1]);
              break;
            case 'doubletap':
              doubletaps.push(value[1]);
              break;
            default:
          }
        }
        comp <<= 1;
      }

      if (touches.length > 0 && typeof this.ontouch == 'function')
        this.ontouch({
          action: 'touch',
          positions: touches,
          raw: touch,
          seq: seq,
        });

      if (taps.length > 0 && typeof this.ontap == 'function')
        this.ontap({
          action: 'tap',
          positions: taps,
          raw: touch,
          seq: seq,
        });

      if (
        doubletaps.length > 0 &&
        typeof this.ondoubletap == 'function'
      )
        this.ondoubletap({
          action: 'doubletap',
          positions: doubletaps,
          raw: touch,
          seq: seq,
        });
    }

    if (configmask & maskAirWheelInfo && sysinfo & sysAirWheelValid) {
      let delta = (airwheel[0] - this.lastRotation) / 32.0;
      this.rotation += delta * 360.0;
      this.rotation %= 360;
      if (delta != 0 && delta > -0.5 && delta < 0.5) {
        if (typeof this.onairwheel == 'function')
          this.onairwheel({
            delta: delta * 360.0,
            rotation: this.rotation,
            raw: airwheel,
            seq: seq,
          });
      }
      this.lastRotation = airwheel[0];
    }
  }
  _systemStatus(data) {
    let statusInfo = {
      msgId: data[4],
      maxCmdSize: data[5],
      error: data[6] | (data[7] << 8), //little endian
    };
    this.statusInfo = statusInfo;
    if (this.debugprint || this.obniz.debugprint) {
      console.log(
        `flickHat: system status: {msgId: ${
          statusInfo.msgId
        }, maxCmdSize: ${statusInfo.maxCmdSize}, error: ${
          statusInfo.error
        }}`
      );
    }
  }
  _firmwareInfo(data) {
    let fwInfo = {
      fwValid: data[4] == 0xaa,
      hwRev: [data[5], data[6]],
      paramStartAddr: data[7] * 128,
      libLoaderVer: [data[8], data[9]],
      libLoaderPlatform: data[10],
      fwStartAddr: data[11] * 128,
      fwVersion: this._dataArray2string(data.slice(12, 132)).split(
        '\0'
      )[0],
      fwInfoReceived: true,
    };
    this.fwInfo = fwInfo;
    if (typeof this.onfwinfo == 'function') this.onfwinfo(fwInfo);
  }

  async polling(timeout) {
    timeout = timeout || 3000; //default: 3s

    let data;
    let size = 0;
    let startTime = new Date();
    while (size == 0 && new Date() - startTime < timeout) {
      data = await this._readMsg(26);
      size = data[0];
    }
    if (data[0] != 0) {
      // let flag = data[1];
      // let seq = data[2];
      let msgID = data[3];

      switch (msgID) {
        case 0x91: //sensor data output
          this._sensorData(data);
          break;

        case 0x15: //system status
          this._systemStatus(data);
          break;

        case 0x83: // firmware information
          this._firmwareInfo(data);
          break;

        default:
          console.error(`unknown message: 0x${msgID.toString(16)}, data:${data.slice(0, size).map(v => '0x' + v.toString(16))}`);
      }
    }
  }
}

if (typeof module === 'object') {
  module.exports = FlickHat;
}