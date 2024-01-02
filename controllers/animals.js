// DEPENDENCIES
module.exports = {
    index,
    newForm,
    destroy,
    update,
    create,
    edit,
    show,
    seed
}

/**
 * Route Controllers
 */

async function index(req, res) {
    // find all of the animals
    let animals = await req.model.Animal.find({});

    // render all of the animals to index.ejs
    res.render("index.ejs", {
        animals: animals.reverse()
    });
}

async function newForm(req, res) {
    // render the create form
    res.render("new.ejs");
}

async function destroy(req, res) {
    try {
        // Find an animal and then delete
        let deletedAnimal = await req.model.Animal.findByIdAndDelete(req.params.id);
        // redirect back to the index
        res.redirect("/animals");

    } catch (error) {
        res.status(500).send("something went wrong when deleting");
    }
}

async function update(req, res) {
    try {
        // Convert 'extinct' checkbox value to boolean
        req.body.extinct = req.body.extinct === 'on';

        // Find by id and update with the req.body
        let updatedAnimal = await req.model.Animal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        // Redirect to the show route with the updated animal
        res.redirect(`/animals/${updatedAnimal._id}`);
    } catch (error) {
        res.status(500).send("Error updating animal: " + error.message);
    }
}


async function create(req, res) {
    try {
        // Convert 'extinct' checkbox value to boolean
        const isExtinct = req.body.extinct === 'on';

        let newAnimal = await req.model.Animal.create({
            species: req.body.species,
            location: req.body.location,
            lifeExpectancy: req.body.lifeExpectancy,
            extinct: isExtinct
        });

        res.redirect("/animals");
    } catch (err) {
        res.send("Error creating animal: " + err.message);
    }
}

async function edit(req, res) {
    try {
        // find the animal to edit
        let foundAnimal = await req.model.Animal.findById(req.params.id);
        res.render("edit.ejs", {
            animal: foundAnimal
        });
    } catch (error) {
        res.send("hello from the error");
    }
}

async function seed(req, res) {
    try {
        // delete everything in the database
        await req.model.Animal.deleteMany({});
        // Create data in the database
        await req.model.Animal.create(
            req.model.seedData
        );

        // redirect back to the index
        res.redirect("/animals");

    } catch (error) {
        res.send("something went wrong with your seeds");
    }
}

async function show(req, res) {
    // find an animal by _id
    let foundAnimal = await req.model.Animal.findById(req.params.id); // the request params object

    // render show.ejs with the foundAnimal
    res.render("show.ejs", {
        animal: foundAnimal
    });
}
