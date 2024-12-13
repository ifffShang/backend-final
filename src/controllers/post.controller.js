import { response } from "express";
import Post from "../models/post.model.js";
import mongoose from "mongoose";

const createPost = async (req, res) => {
    try {
        const{text} = req.body;
        // const userId = req.user;

        const newPost = new Post({
            // user: userId,
            text,
            owner: req.user._id
            // img
        })
        await newPost.save();
        res.status(201).json(newPost)


    }catch(error){
        res.status(500).json({ error: "internal server error"});
        console.log("Error in creatPost controller", error)

    }

}

const deletePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({message: " Post deleted successfully"})
    }catch{
        res.status(500).json({error: " internal server error"})
    }

}

const getAllPosts = async (req, res) => {
    try{
        const post = await Post.find()
        .populate('owner')
        .sort({createdAt: -1})
        res.status(200).json(post)

    }catch(err){
        console.log(err)
        res.status(500).json({error:"get Internal server error"})

    }
}

const getPost = async (req, res) => {
    try{
        const postId = req.params.id;
        if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid Post ID" });
        }
        const post = await Post.findById(postId);

        res.status(200).json(post)

    }catch(err){
        console.log(err)
        res.status(500).json({error:"get Internal server error"})

    }
}

const updatePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ error: 'Post not found' }); 
          }
        post.text = req.body.text
        await post.save()
        
        res.status(200).json({msg:"update success"})

    }catch(err){
        console.log(err)
        res.status(500).json({error:"update Internal server error"})
    }
}

const getPostsByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        if (!userId) {
            return res.status(400).json({ error: 'Invalid userId' });
        }
        console.log(userId);

        const posts = await Post.find({ owner: userId });

        if (!posts || posts.length === 0) {
            return res.status(200).json({ message: "No posts found for this user."});
        }
        return res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ message: 'Error fetching posts', error });
    }
}

export default { createPost, deletePost,  getAllPosts,updatePost, getPost, getPostsByUserId};