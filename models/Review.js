const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide rating'],
    },
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide review title'],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, 'Please provide review text'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    pet: {
      type: mongoose.Schema.ObjectId,
      ref: 'Pet',
      required: true,
    },
  },
  { timestamps: true }
);
ReviewSchema.index({ pet: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (petId) {
  const result = await this.aggregate([
    { $match: { pet: petId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    await this.model('Pet').findOneAndUpdate(
      { _id: petId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.pet);
});

ReviewSchema.post('remove', async function () {
  await this.constructor.calculateAverageRating(this.pet);
});

module.exports = mongoose.model('Review', ReviewSchema);
