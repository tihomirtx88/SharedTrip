const { isUser } = require("../middleware/guards");

const router = require(`express`).Router();

router.get(`/create`,isUser(), (req, res) => {
     res.render(`create`, {title: `Create Trip Ofer`});
});

router.post(`/create`, isUser(), (req, res) => {
    res.redirect(`/trips`);
});


module.exports = router;