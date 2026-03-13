import { qdrant } from "./qdrantClient.js";

await qdrant.createCollection("travel", {

  vectors: {
    size: 384,
    distance: "Cosine"
  }

});

console.log("Collection created");