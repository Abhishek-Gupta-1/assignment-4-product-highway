import { toggleFollow, getFollowStats } from "../services/follow.js";

export const handleToggleFollow = async (req, res) => {
    try {
        const systemId = req.user.id; // From auth middleware
        const result = await toggleFollow(systemId, req.body);
        
        if (!result.success) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Error processing follow/unfollow request",
        });
    }
};

export const getFollowerStats = async (req, res) => {
    try {
        const userId = req.params.userId || req.user.id;
        const result = await getFollowStats(userId);
        
        if (!result.success) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Error getting follow statistics",
        });
    }
};