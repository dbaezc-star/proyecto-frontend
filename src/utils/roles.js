/** Ruta del panel según el rol del usuario. */
export const homeForRole = (role) => {
    if (role === 'DONOR') return '/donor/dashboard';
    if (role === 'AESTHETIC_CENTER') return '/aesthetic/dashboard';
    return '/dashboard';
};
