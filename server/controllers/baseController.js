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
        const item = new Model(req.body);
        if (req.file) item.image = req.file.path;
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateOne = (Model) => async (req, res) => {
    try {
        const updateData = req.body;
        if (req.file) updateData.image = req.file.path;
        const item = await Model.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!item) return res.status(404).json({ message: 'Not found' });
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteOne = (Model) => async (req, res) => {
    try {
        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
