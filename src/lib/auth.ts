/**
 * Simple authentication helper for Admin PIN verification.
 * In a production environment, this should be replaced with a secure 
 * server-side check using bcrypt and a database.
 */

export const verifyAdminPIN = async (pin: string): Promise<boolean> => {
    // For demo purposes, we use a hardcoded PIN.
    // This matches the logic in the provided Header component.
    const ADMIN_PIN = 'admin123';
    return pin === ADMIN_PIN;
};

export const isAdminAuthenticated = (): boolean => {
    if (typeof window === 'undefined') return false;
    return document.cookie.includes('admin_session=true');
};

export const logoutAdmin = () => {
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};
