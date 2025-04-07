import Category from '../models/Category.js';

export const ensureDefaultCategory = async (req, res) => {
  const userId = req.user.uid;

  try {
    const existingDefault = await Category.findOne({
      userId,
      isDefault: true
    });

    if (existingDefault) {
      return res.status(200).json(existingDefault);
    }

    const defaultCategory = new Category({
      name: 'Default',
      userId,
      isDefault: true
    });

    const saved = await defaultCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error in ensureDefaultCategory:', err);
    res.status(500).json({ message: 'Failed to ensure default category' });
  }
};