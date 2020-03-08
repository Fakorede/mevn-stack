const router = require("express").Router();
const alogliaSearch = require("algoliasearch");

const client = alogliaSearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_APP_SECRET
);

// algolia search index
const index = client.initIndex(process.env.ALGOLIA_INDEX);

// @desc    Search database
// @route   POST /api/v1/search
// @access  Public
router.post("/search", async (req, res) => {
  try {
    let result = await index.search(req.body.title);

    res.json(result.hits);
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;
