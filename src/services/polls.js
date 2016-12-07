class Polls {
  constructor(bookshelf) {
    this.Model = bookshelf.model('Poll');
  }
}

module.exports = Polls;
