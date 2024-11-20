import { Schema, model, models } from 'mongoose';

const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  number: {
    type: Number,
    required: true,
    unique: true
  },
  position: {
    type: String,
    required: true
  },
  hometown: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  shoots: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  stats: [
    {
      year: {
        type: Number,
        required: true,
      },
      points: {
        type: Number,
        required: true
      },
      goals: {
        type: Number,
        required: true
      },
      assists: {
        type: Number,
        required: true
      },
      pim: {
        type: Number,
        required: true
      },
      gamesPlayed: {
        type: Number,
        required: true
      }
    }
  ]
})

const Player = models.players || model('players', playerSchema);

export default Player;