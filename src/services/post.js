import PostModel from "../modals/post.model.js";

export const createUserPost = async (userId, data) => {
  try {
    const { content } = data;
    console.log("the post content : ", content);

    const newPost = new PostModel({
      content,
      userId,
    });

    const savePost = await newPost.save();
    console.log("Post created: ", savePost);

    return {
      success: true,
      data: {
        post: savePost,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Error Posting the content",
      error: error.message,
    };
  }
};
