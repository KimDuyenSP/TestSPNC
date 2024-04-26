class GameScene extends Phaser.Scene {
  values = [];
  value = null;
  bars = [];
  valueText = null;
  resultText = null;
  comparisonText = null; 


  constructor() {
    super('GameScene');
  }

  preload() {
    console.log('preload');
  }

  create() {
    this.game.events.on('start', ({ values, value }) =>
      this.start({ values, value })
    );
  }

  update() {
    console.log('update');
  }

  start({ values, value }) {
    // clear existing bars
    this.bars.forEach((bar) => {
      bar.rect.destroy(true);
      bar.valueText.destroy(true);
      bar.indexText.destroy(true);
      bar.barNoteText?.destroy(true);
    });
    this.bars = [];

    // Destroy existing text if it exists
    this.valueText?.destroy(true);
    this.resultText?.destroy(true);
    this.comparisonText?.destroy(true); // Clear comparison text

    this.valueText = null;
    this.resultText = null;

    // Assign new values
    this.values = values;
    this.value = value;

    // Draw the bars for values
    this.draw();
    this.run();
  }

  draw() {
    // Display the value we are searching for
    this.valueText = this.add.text(50, 50, `Tìm kiếm giá trị: ${this.value}`, {
      color: '#fff',
      fontSize: 20,
    });
    this.comparisonText = this.add.text(50, 80, '', {
      color: '#f88',
      fontSize: '20px',
      fontFamily: 'Arial'
    });
    // Draw bars for each value
    this.values.forEach((value, index) => {
      const rect = this.add.rectangle(
        50 + index * 30,
        400,
        25,
        value * 3,
        0xffffff,
        1
      );
      rect.setOrigin(0, 1);

      const valueText = this.add.text(
        50 + index * 30 + 12,
        400 - value * 3 - 10,
        `${value}`,
        { color: '#fff', fontSize: 12 }
      );
      valueText.setOrigin(0.5, 0.5);

      const indexText = this.add.text(50 + index * 30 + 12, 410, `${index}`, {
        color: '#fff',
        fontSize: 12,
      });
      indexText.setOrigin(0.5, 0.5);

      this.bars[index] = {
        rect,
        valueText,
        indexText,
        x: 50 + index * 30,
        y: 400,
      };
    });
  }

  clearBarNote() {
    this.bars.forEach((bar) => {
      bar.barNoteText?.destroy(true);
      bar.rect.setFillStyle(0xffffff, 1);
      bar.valueText.setColor('#fff');
      bar.indexText.setColor('#fff');
    });
  }
  async findIndex() {
    
    for (let i = 0; i < this.values.length; i++) {
      this.comparisonText.setText(`So sánh : ${this.values[i]} với ${this.value}`);
      this.bars[i].rect.setFillStyle(0xff0000, 1); 
  
      await this.highlight(1); 
  
      await this.highlight(2);
  
      if (this.values[i] === this.value) {
        this.bars[i].rect.setFillStyle(0x00ff00, 1); 
        await this.highlight(3); 
        return i; 
      }
      this.bars[i].rect.setFillStyle(0xffffff, 1);
      await this.delay(300); 
    }
    await this.highlight(4);
    return -1; 
  }
  
  async highlight(code) {
    this.game.events.emit('highlight', code);
    await this.delay(200); 
  }
  

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async run() {
    const index = await this.findIndex();
    if (index === -1) {
      this.resultText = this.add.text(350, 470, `Không tìm thấy!`, {
        color: '#fff',
        fontSize: 20,
      });
    } else {
      this.resultText = this.add.text(350, 470, `Giá trị được tìm thấy ở index : ${index}`, {
        color: '#fff',
        fontSize: 20,
      });
    }
    this.resultText.setOrigin(0.5, 0.5);
  }
}
