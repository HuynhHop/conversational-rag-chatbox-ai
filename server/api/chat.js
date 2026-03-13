// import express from "express";
// import { ragPipeline } from "../ai/ragPipeline.js";

// const router = express.Router();

// router.post("/", async (req, res) => {

//   try {

//     const { message } = req.body;

//     console.log("REQ:", message);

//     const answer = await ragPipeline(message);

//     console.log("ANSWER:", answer);

//     res.json({
//       answer
//     });

//   } catch (err) {

//     console.error(err);

//     res.status(500).json({
//       error: err.message
//     });

//   }

// });

// export default router;

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