const Messages = require("../model/messageModel");
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const messageModel = await Messages.create({
      message: { text: message },
      Users: [from, to],
      sender: from,
    });
    if (messageModel) {
      return res.json({ status: true });
    } else {
      return res.json({ status: false });
    }
  } catch (error) {
    next(error);
  }
};
module.exports.getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({
         Users: { 
            $all: [from, to] 
        } 
    }).sort({
      updatedAt: -1,
    });
    
    const ProjectsMessage=messages.map((msg)=>{
        return ({
            fromSelf:msg.sender.toString()===from,
            message:msg.message.text
        });
    });
    return res.json({messages:ProjectsMessage});
  } catch (error) {
    next(error);
  }
};
