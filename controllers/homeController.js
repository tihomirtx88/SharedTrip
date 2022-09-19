const { isUser } = require("../middleware/guards");
const preload = require("../middleware/preload");
const { getAllTrips, getTripsByUser } = require("../services/tripService");

const router = require(`express`).Router();

router.get(`/`, (req, res) => {
    res.render(`home`);
});

router.get(`/trips`, async(req, res) => {
    const trips = await getAllTrips();
    res.render(`trips`, {title: `Share Trips`, trips});
});

router.get(`/trips/:id`,preload(true), async(req, res) => {
    const trip = res.locals.trip;
    trip.reaminingSeats = trip.seats - trip.buddies.length;
    trip.buddiesList = trip.buddies.map(b => b.email).join(`, `);;
    if (req.session.user) {
        trip.hasUser = true;
        trip.isOwner = req.session.user._id == trip.owner._id;  
        
        if (trip.buddies.some(b => b._id == req.session.user._id)) {
            trip.isJoined = true;
        }
    }
    res.render(`details`, {title: `Trip Details`});
});

router.get(`/profile`, isUser(), async(req, res) => {
    const tripsByUser = await getTripsByUser(res.locals.user._id);
    res.locals.user.tripsCount = tripsByUser.length;
    res.render(`profile`, {title: `Profile Page`});
});


module.exports = router;