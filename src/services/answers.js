class Answers {
  constructor(bookshelf) {
    this.Answer = bookshelf.model('Answer');
  }

  create(params) {
    const answer = new this.Answer(
      Object.assign({ position: 0 }, params)
    );

    return answer.save();
  }
}

module.exports = Answers;
