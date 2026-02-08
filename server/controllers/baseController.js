export const getAll = (Model) => async (req, res) => {
    try {
        const { search, isPublished, sort = 'createdAt', order = 'desc', page, limit } = req.query;

        let query = {};
        if (search) {
            const searchFields = ['title', 'name', 'description', 'question', 'text', 'email'];
            query.$or = searchFields.map(field => ({ [field]: { $regex: search, $options: 'i' } }));
        }

        if (isPublished !== undefined) {
            query.isPublished = isPublished === 'true';
        }

        let sortQuery = {};
        sortQuery[sort] = order === 'desc' ? -1 : 1;

        const findQuery = Model.find(query).sort(sortQuery);

        if (page && limit) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            findQuery.skip((pageNum - 1) * limitNum).limit(limitNum);
        }

        const items = await findQuery;
        const total = await Model.countDocuments(query);

        res.json(page && limit ? { items, total, totalPages: Math.ceil(total / parseInt(limit)) } : items);
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

export const toggleStatus = (Model) => async (req, res) => {
    try {
        const item = await Model.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Not found' });

        item.isPublished = !item.isPublished;
        await item.save();
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
