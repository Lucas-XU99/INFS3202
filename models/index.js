const sequelize = require("./config").sequelize;
const { Answer } = require("./answer");
const { Category } = require("./category");
const { Course } = require("./course");
const { Question } = require("./question");
const { User } = require("./users");
const { Review } = require("./review");
const { Like } = require("./like");
const { Wishlist } = require("./wishlist");
const { WishlistAnswer } = require("./WishlistAnswer");

Course.belongsTo(User);

Answer.belongsTo(User);
Answer.belongsTo(Question);
Answer.hasMany(Review);

Question.belongsTo(Course);
Question.belongsTo(Category);
Question.belongsTo(User);

Review.belongsTo(Answer);
Review.belongsTo(User);

Like.belongsTo(Answer);
Like.belongsTo(User);

Wishlist.belongsTo(User);

WishlistAnswer.belongsTo(Wishlist);
WishlistAnswer.belongsTo(Answer);


(async () => {
  await sequelize.sync({});
})();
module.exports = {
  Answer,
  Category,
  Course,
  Question,
  User,
  Review,
  Like,
  Wishlist,
  WishlistAnswer,
};
