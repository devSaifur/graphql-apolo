import db from './db.js'

export const resolvers = {
  Query: {
    games() {
      return db.games
    },
    game(_: any, arg: { id: string }) {
      return db.games.find((game) => game.id === arg.id)
    },

    authors() {
      return db.authors
    },
    author(_: any, arg: { id: string }) {
      return db.authors.find((author) => author.id === arg.id)
    },

    reviews() {
      return db.reviews
    },
    review(_: any, arg: { id: string }) {
      return db.reviews.find((review) => review.id === arg.id)
    },
  },

  Game: {
    reviews(parent: { id: string }) {
      return db.reviews.filter((review) => review.game_id === parent.id)
    },
  },

  Author: {
    reviews(parent: { id: string }) {
      return db.reviews.filter((review) => review.author_id === parent.id)
    },
  },

  Review: {
    author(parent: { author_id: string }) {
      return db.authors.find((author) => author.id === parent.author_id)
    },
    game(parent: { game_id: string }) {
      return db.games.find((game) => game.id === parent.game_id)
    },
  },

  Mutation: {
    addGame(_: any, arg: { game: { title: string; platform: string[] } }) {
      let newGame = {
        ...arg.game,
        id: Math.floor(Math.random() * 1000).toString(),
      }
      db.games.push(newGame)
      return newGame
    },

    deleteGame(_: any, arg: { id: string }) {
      db.games = db.games.filter((game) => game.id !== arg.id)
      return db.games
    },

    updateGame(
      _: any,
      arg: { id: string; edits: { title: string; platform: string[] } }
    ) {
      db.games = db.games.map((game) => {
        if (game.id === arg.id) {
          let editedGame = {
            ...game,
            ...arg.edits,
          }
          return editedGame
        }
        return game
      })
      const editedGame = db.games.find((game) => game.id === arg.id)
      return editedGame
    },
  },
}
