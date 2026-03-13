import express from "express";
import { ragPipeline } from "../ai/ragPipeline.js";
import { getHistory, addMessage } from "../memory/chatMemory.js";

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const { message, sessionId } = req.body;

    console.log("REQ:", message);

    const history = getHistory(sessionId);

    const answer = await ragPipeline(message, history);

    addMessage(sessionId, "user", message);
    addMessage(sessionId, "assistant", answer);

    res.json({
      answer
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });

  }

});

export default router;