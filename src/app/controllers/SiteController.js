
class SiteController {
    show(req, res) {
        res.render('home');
    }
}

module.exports = new SiteController();