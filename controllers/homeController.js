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
    if (req.session.user) {
        res.locals.trip.hasUser = true;
        res.locals.trip.isOwner = req.session.user._id == res.locals.trip.owner._id;      
    }
    res.render(`details`, {title: `Trip Details`});
});


module.exports = router;