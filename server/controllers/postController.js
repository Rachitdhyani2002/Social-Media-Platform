//Import Statements
import userModel from '../database/models/UserModel.js'
import postModel from "../database/models/PostsModel.js";


//User Posts Controller
export const createPostController = async (req, res) => {
  try {
    const { content, userId } = req.body
    const image = req.file ? req.file.filename : null;
    if (!content || !userId) {
      return res.status(400).send({ success: "false", message: "Content is required" })
    }
    const newPost = await postModel({ userId, content, image }).save()
    res.status(201).json({ message: "Post created successfully", post: newPost });
  }

  catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}

//Fetch Posts Controller
export const fetchUserPostController = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).send({ success: "false", message: "UserId is required" })
    }

    const userPost = await postModel.find({ userId });

    res.status(201).json({ message: "Post created successfully", userPost });
  }
  catch (err) {
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
}

//Like Post Controller
export const likePostController = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    const post = await postModel.findById(postId)
    if (!post) {
      return res.status(400).send({ success: false, message: "Post not found" })
    }

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json({ success: true, likes: post.likes.length });
  }
  catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}

//Comment Post Controller 
export const addCommentController = async (req, res) => {
  try {
    const { userId, postId, commentsText } = req.body;
    console.log(userId)
    console.log(postId)
    console.log(commentsText)
    // if (!userId || !postId || !commentText) {
    //   return res.status(400).send({ success: false, message: "All fields are required" });
    // }

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(400).send({ success: false, message: "Post not found" })
    }
    const user = await userModel.findById(userId);

    const newComment = {
      userName:user.name,
      profileImage:user.profileImage,
      commentsText,
      createdAt:new Date()
    }
    
    post.comments.push(newComment);
    await post.save();
    res.status(200).send({success:true,message:"Comment added successfully",comments:post.comments})

  }
  catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}


