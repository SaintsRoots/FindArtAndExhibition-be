import * as artsService from "../services/arts.services";
import { validateArt } from "../validations/arts.validation";


export const createArts = async (req, res) => {
    const { error, value } = validateArt(req.body);
    console.log(value);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
    try {

        const art = await artsService.createArts(
            value,
            req.file,
            req.User._id
        );

        return res.status(201).json({
            status: "201",
            message: "Arts created successfully",
            data: art,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Failed to Upload a new Arts",
            error: error.message,
        });
    }
};

// get all arts

export const getAllArts = async (req, res) => {
    try {
        const arts = await artsService.getAllArts();
        return res.status(200).json({
            status: 200,
            data: arts
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Failed to get all arts",
            error: error.message
        });
    }
};

// get art by id

export const getArtsById = async (req, res) => {
    try {
        const { id } = req.params;
        const art = await artsService.getArtsById(id);
        return res.status(200).json({
            status: 200,
            data: art
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Failed to get art by id",
            error: error.message
        });
    }
};

// get art by owner

export const getArtsByOwner = async (req, res) => {
    try {
        const { id } = req.params;
        const arts = await artsService.getArtsByOwner(id);
        return res.status(200).json({
            status: 200,
            data: arts,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Failed to get art by owner",
            error: error.message,
        });
    }
};

// update art by id
export const updateArts = async (req, res) => {
    const { error, value } = validateArt(req.body);
    console.log(value);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
    try {
        const { id } = req.params

        const art = await artsService.updateArts(
            id,
            value,
            req.file,
            req.User._id
        );

        return res.status(201).json({
            status: "201",
            message: "Arts Updated successfully",
            data: art,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Failed to Update a new Arts",
            error: error.message,
        });
    }
};

// delete art by id

export const deleteArts = async (req, res) => {
    try {
        const { id } = req.params
        await artsService.deleteArts(id);
        return res.status(200).json({
            status: 200,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Failed to delete art by id",
            error: error.message
        });
    }
};
