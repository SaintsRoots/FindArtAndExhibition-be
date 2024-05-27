import Arts from "../models/arts.model";
import { uploadToCloud } from "../helper/cloud";

export const createArts = async (artsData, file, user) => {
    let result;
    if (file) result = await uploadToCloud(file);
    const { name, description, category, available_arts, price } = artsData;


    // existing arts
    const existingArts = await Arts.findOne({ name });
    if (existingArts) {
        throw new Error("Arts already exists");
    }

    return await Arts.create({
        name,
        description,
        category,
        available_arts,
        price,
        image: result?.secure_url,
        owner: user
    })

};
// get All arts

export const getAllArts = async () => {
    return await Arts.find();
}

// get art by id

export const getArtsById = async (id) => {
    const art = await Arts.findById(id).populate('owner', 'name email profile');
    if (!art) {
      throw new Error("Art Id not found");
    }
    return art;
}

// get art by owner

export const getArtsByOwner = async (ownerId) => {
    return await Arts.find({ owner: ownerId });
};

// update arts

export const updateArts = async (id, artsData, file, user) => {
    let result;
    if (file) result = await uploadToCloud(file);
    const userId = await Arts.findById(id);
    if (!userId) {
        throw new Error("Arts Id not found");
    }
    const { name, description, category, available_arts, price } = artsData
    return await Arts.findByIdAndUpdate(id, { name, owner, description, category, image: result?.secure_url, available_arts, price, owner: user });
}

// delete arts

export const deleteArts = async (id) => {
    const userId = await Arts.findById(id);
    if (!userId) {
        throw new Error("Arts Id not found");
    }
    return await Arts.findByIdAndDelete(id);
}
