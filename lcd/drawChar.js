 drawChar(x, y, ch, color, bg, size) {
    //  bg = bg || color;
    size = size || 1;
    if (
      x >= this.width || // Clip right
      y >= this.height || // Clip bottom
      x + 6 * size - 1 < 0 || // Clip left
      y + 8 * size - 1 < 0
    )
      // Clip top
      return;

    let pixels = new Array(6 * 8 * size * size);
    let c = ch.charCodeAt(0);
    for (let i = 0; i < 6; i++) {
      let line = i == 5 ? 0 : font[c * 5 + i];
      for (let j = 0; j < 8; j++) {
        /*
        if (line & 0x1) {
          if (size == 1)
            // default size
            this.drawPixel(x + i, y + j, color);
          else {
            // big size
            this.fillRect(x + i * size, y + j * size, size, size, color);
          }
        } else if (bg != color) {
          if (size == 1)
            // default size
            this.drawPixel(x + i, y + j, bg);
          else {
            // big size
            this.fillRect(x + i * size, y + j * size, size, size, bg);
          }
        }
        */
       let cl = (line & 0x1) ? color : bg;
       console.log(`[i: ${i}, j: ${j}] line:${line} fillRect(${x + i * size}, ${y + j * size}, ${size}, ${size}, ${class})`);
       for (let w = 0; w < size; w++) {
         for (let h = 0; h < size; h++) {
           console.log(`\t[w: ${w}, h: ${h}] pixels[${((i * (1 * size) + w)) + (j * (6 * size * size) + h * (6 * size))}]=${cl}`);
           pixels[(i * (1 * size) + w) + (j * (6 * size * size) + h * (6 * size))] = cl;
         }
       }
       line >>= 1;
     }
   }
   console.log(`rawBound16(${x}, ${y}, ${size}, ${size}, [${pixels}])`);
   rawBound16(x, y, size, size, pixels);
  }
  rawBound16(x, y, width, height, pixels) {
    let rgb = [];
    pixels.forEach(function(v) {
      rgb.push((v & 0xff00) >> 8);
      rgb.push(v & 0xff);
    });
    this.setAddrWindow(x, y, x + width - 1, y + height - 1);
    this._writeBuffer(rgb);
    this._writeBuffer(); //for flush
  }
