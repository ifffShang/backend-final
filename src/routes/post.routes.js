import express from 'express'
import postControllers from '../controllers/post.controller.js';
import passport from 'passport';

const router = express.Router();


const { createPost, deletePost, updatePost,getAllPosts, getPost, getPostsByUserId} = postControllers;

// create post
router.post("/", passport.authenticate('jwt', { session: false }), createPost)

router.delete("/:id", passport.authenticate('jwt', { session: false }), deletePost)
router.put("/:id", passport.authenticate('jwt', { session: false }), updatePost)
router.get("/", getAllPosts)
router.get("/:id", getPost)

router.get("/user/:userId", getPostsByUserId)

export default router;