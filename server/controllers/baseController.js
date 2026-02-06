export const getAll = (Model) => async (req, res) => {
    try {
        const items = await Model.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createOne = (Model) => async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) {
            data.image = req.file.path;
        }
        const newItem = new Model(data);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateOne = (Model) => async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) {
            data.image = req.file.path;
        }
        const updatedItem = await Model.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteOne = (Model) => async (req, res) => {
    try {
        // Here we could add Cloudinary delete logic if we want to be strict
        await Model.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
