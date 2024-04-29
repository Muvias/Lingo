import { auth } from "@clerk/nextjs";

const allowedIds = [
    "user_2dxLkcHotk8mnTDdQ90nXycCLO0"
]

export function isAdmin() {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    return allowedIds.indexOf(userId) !== -1; 
}