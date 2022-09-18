const preload = require("../middleware/preload");
const { getAllTrips } = require("../services/tripService");

const router = require(`express`).Router();

router.get(`/`, (req, res) => {
    res.render(`home`);
});

router.get(`/trips`, async(req, res) => {
    const trips = await getAllTrips();
    res.render(`trips`, {title: `Share Trips`, trips});
});

router.get(`/trips/:id`,preload(true), async(req, res) => {
    res.render(`details`, {title: `Trip Details`});
});


module.exports = router;