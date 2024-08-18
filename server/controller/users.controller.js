import User from "../models/user.model.js";

export const friends = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const friendList = await User.find({
      _id: { $ne: userId },
    }).select("-password");
    res.status(200).json(friendList);
  } catch (err) {
    next(err);
  }
};
