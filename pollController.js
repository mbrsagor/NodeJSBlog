const Poll = require('./poll');

exports.createPollGetController = (req, res, next) => {
    res.render('create');
}

exports.createPollPostController = async (req, res, next) => {

    let { title, description, options, totalVote } = req.body;
    options = options.map(opt => {
        return {
            name: opt,
            vote: 0
        }
    })

    // console.log(options);
    // console.log(req.body);

    const poll = new Poll({
        title,
        description,
        options,
        totalVote
    });

    try {
        await poll.save();
        res.redirect('/polls');
    } catch(e) {
        console.log(e);
    }

    // res.render('create');
}

exports.getAllPolls = async (req, res, next) => {
    try {
        let polls = await Poll.find();
        res.render('polls', { polls });
    } catch (e) {
        console.log(e);
    }
}

exports.pollDetailController = async (req, res, next) => {
    let id = req.params.id;
    try {
        let poll = await Poll.findById(id);
        res.render('pollDetail', { poll });
    }
    catch (e) {
        console.log(e);
    }
}