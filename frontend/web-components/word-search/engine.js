export class WordSearchEngine {
  constructor() {
    this.grid = [];
    this.words = [];
    this.placedWords = [];
  }

  generate(options) {
    const {
      gridSize = 10,
      words = [],
      directions = { horizontal: true, vertical: true, diagonal: false, backwards: false }
    } = options;

    // Initialize grid with empty cells
    this.grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    this.words = words.map(w => w.toUpperCase().replace(/[^A-Z]/g, ''));
    this.placedWords = [];

    // Sort words by length (longer first for better placement)
    const sortedWords = [...this.words].sort((a, b) => b.length - a.length);

    // Place each word
    for (const word of sortedWords) {
      this.placeWord(word, directions, gridSize);
    }

    // Fill empty cells with random letters
    this.fillEmptyCells();

    return {
      grid: this.grid,
      words: this.words,
      placedWords: this.placedWords,
      gridSize
    };
  }

  placeWord(word, directions, gridSize) {
    const maxAttempts = 100;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const direction = this.getRandomDirection(directions);
      const position = this.getRandomPosition(word, direction, gridSize);

      if (this.canPlaceWord(word, position, direction)) {
        this.doPlaceWord(word, position, direction);
        this.placedWords.push({
          word,
          start: position,
          direction
        });
        return true;
      }

      attempts++;
    }

    console.warn(`Could not place word: ${word}`);
    return false;
  }

  getRandomDirection(directions) {
    const available = [];
    
    if (directions.horizontal) {
      available.push({ dx: 1, dy: 0, name: 'horizontal' });
      if (directions.backwards) {
        available.push({ dx: -1, dy: 0, name: 'horizontal-reverse' });
      }
    }
    
    if (directions.vertical) {
      available.push({ dx: 0, dy: 1, name: 'vertical' });
      if (directions.backwards) {
        available.push({ dx: 0, dy: -1, name: 'vertical-reverse' });
      }
    }
    
    if (directions.diagonal) {
      available.push({ dx: 1, dy: 1, name: 'diagonal-down' });
      available.push({ dx: 1, dy: -1, name: 'diagonal-up' });
      if (directions.backwards) {
        available.push({ dx: -1, dy: 1, name: 'diagonal-down-reverse' });
        available.push({ dx: -1, dy: -1, name: 'diagonal-up-reverse' });
      }
    }

    return available[Math.floor(Math.random() * available.length)];
  }

  getRandomPosition(word, direction, gridSize) {
    let x, y;

    if (direction.dx > 0) {
      x = Math.floor(Math.random() * (gridSize - word.length + 1));
    } else if (direction.dx < 0) {
      x = word.length - 1 + Math.floor(Math.random() * (gridSize - word.length + 1));
    } else {
      x = Math.floor(Math.random() * gridSize);
    }

    if (direction.dy > 0) {
      y = Math.floor(Math.random() * (gridSize - word.length + 1));
    } else if (direction.dy < 0) {
      y = word.length - 1 + Math.floor(Math.random() * (gridSize - word.length + 1));
    } else {
      y = Math.floor(Math.random() * gridSize);
    }

    return { x, y };
  }

  canPlaceWord(word, position, direction) {
    let { x, y } = position;

    for (let i = 0; i < word.length; i++) {
      if (x < 0 || x >= this.grid.length || y < 0 || y >= this.grid.length) {
        return false;
      }

      const currentCell = this.grid[y][x];
      if (currentCell !== '' && currentCell !== word[i]) {
        return false;
      }

      x += direction.dx;
      y += direction.dy;
    }

    return true;
  }

  doPlaceWord(word, position, direction) {
    let { x, y } = position;

    for (let i = 0; i < word.length; i++) {
      this.grid[y][x] = word[i];
      x += direction.dx;
      y += direction.dy;
    }
  }

  fillEmptyCells() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (this.grid[y][x] === '') {
          this.grid[y][x] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }
  }
}