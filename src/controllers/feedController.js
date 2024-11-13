import { getUserFeed } from "../services/feed.js";

export const getFeed = async (req, res) => {
    try {
        const systemId = req.user.id;
        const { page, limit } = req.query;

        const result = await getUserFeed(systemId, { 
            page, 
            limit 
        });

        if (!result.success) {
            return res.status(400).json(result);
        }

        return res.status(200).json({
            success: true,
            message: "Feed retrieved successfully",
            data: result.data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Error retrieving feed",
        });
    }
};