let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,
  cards: null,

  souls: [
    "artorias",
    "catarina",
    "cinder",
    "firekeeper",
    "gwyn",
    "havel",
    "lautrec",
    "ornstein",
    "smough",
    "solaire",
  ],

  setCard: function (id) {
    let card = this.cards.filter((card) => card.id == id)[0];

    if (card.flipped || this.lockMode) {
      return false;
    }

    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  checkMatch: function () {
    if (!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },

  clearCards: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  unflipCards() {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checkGameOver() {
    return this.cards.filter((card) => !card.flipped).length == 0;
  },

  //Função cria as cartas.
  createCardFromSouls: function () {
    this.cards = [];

    this.souls.forEach((soul) => {
      this.cards.push(this.createPairFromSoul(soul));
    });

    this.cards = this.cards.flatMap((pair) => pair);
    this.shuffleCards();

    return this.cards;
  },

  //Função cria os dois estados da carta, frente e verso com id.
  createPairFromSoul: function (soul) {
    return [
      {
        id: this.createIdWithSoul(soul),
        icon: soul,
        flipped: false,
      },
      {
        id: this.createIdWithSoul(soul),
        icon: soul,
        flipped: false,
      },
    ];
  },

  //Função criar id cartas.
  createIdWithSoul: function (soul) {
    return soul + parseInt(Math.random() * 1000);
  },

  //Função para embaralhar as cartas: A lógica para embaralhar as cartas é pegar o ultimo item do array e trocar de posição com algum item aleatório, depois fazer o mesmo com a penúltima carta e assim por diante até que todos tenham sido trocados de posição.
  shuffleCards: function (cards) {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[randomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        this.cards[randomIndex],
      ]; //inverte os valores.
    }
  },
};
