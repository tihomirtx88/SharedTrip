const { isUser, isGuest } = require("../middleware/guards");
const { register, login } = require("../services/userService");
const mapErrors = require("../util/mapers");

const router = require(`express`).Router();

router.get(`/register`,isGuest() ,(req, res) => {
    res.render(`register`);
});

router.post(`/register`,isGuest() , async(req, res) => {
    try {
        if (req.body.password.trim() != ``) {
            throw new Error(`Password is required`);
        }
        if (req.body.password != req.body.repeatPassword) {
            throw new Error(`Password don/t match`);
        }
        
        const user = await register(req.body.email, req.body.password, req.body.gender);
        req.session.user = user;
        res.redirect(`/`);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render(`register`, { data: {email: req.body.email, gender: req.body.gender}, errors});
    }  
});

router.get(`/login`,isGuest(), (req, res) => {
    res.render(`login`);
});

router.post(`/login`,isGuest(), async(req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        res.session.user = user;
        res.redirect(`/`);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render(`login`, { data: {email: req.body.email}, errors});
    }
});

router.get(`/logout`,isUser(), (req, res) => {
    delete req.session.user;
    res.redirect(`/`);
});

module.exports = router;