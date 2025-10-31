import { clerkClient } from '@clerk/express';
export const protectedAdmin = async (req, res, next) => {
    try {
        const { userId } = req.auth();
        const user = await clerkClient.users.getUser(userId);

        if (user.privateMetadata?.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admins only.'
            });
        }
        next();
    } catch (error) {
        console.error('Error in protectedAdmin middleware:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
