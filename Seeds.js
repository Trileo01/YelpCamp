const Comment = require('./Models/CommentModel');
const Campground = require('./Models/CampgroundModel');

data = [
    {
        name : "Magpie Camp",
        image : "https://www.holidify.com/images/cmsuploads/compressed/adventure-camp-camping-699558_20190212181323.jpg",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        name : "Salmon Creek",
        image : "https://www.holidify.com/images/cmsuploads/compressed/40058688553_db7ca0c3f2_z_20190212185858.jpg",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna cursus eget nunc scelerisque. "
    },
    {
        name : "Camp Exotica",
        image : "https://www.holidify.com/images/cmsuploads/compressed/tent-1208201_1920_20190212172038.jpg",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean."
    },
    {
        name : "Cloud's Rest",
        image : "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci dapibus ultrices in iaculis nunc sed."
    },
    {
        name : "Ard Skellige",
        image : "https://images.unsplash.com/photo-1580184481690-5546bb513ae7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue quisque egestas diam in arcu cursus. "
    }
];

async function seedDB() {
    try {
        await Campground.deleteMany({});
        await Comment.deleteMany({}); // Remove all campgrounds
        // data.forEach(async (campground) => {
        //     const camp = await Campground.create(campground);
        //     const comment = await Comment.create({
        //         text : 'This place is great, but I wish there was internet',
        //         author : 'Homer'
        //     });
        //     camp.comments.push(comment);
        //     camp.save();
        // });
    } catch(error) {
        console.log('Some error occured');
    }
}

module.exports = seedDB;