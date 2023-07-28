

const HabitSchema = new mongoose.Schema({ 
  habit: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  habitColor: {
    type: String,
    required: true,
  },
  currentStreak: {
    type: Number,
    required: true,
  },
//   frequencyDaily: {
//     type: Number,
//     required: true,
//   },
//   frequencyUnits: {
//     type: String,
//     required: true,
//   },
//   timesCompletedToday: {
//     type: Number,
//     required: true,
//   },
  completed: {
    type: Boolean,
    required: true,
  }
})

module.exports = mongoose.model('Habit', HabitSchema)