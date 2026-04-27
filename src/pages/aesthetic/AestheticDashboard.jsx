import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AestheticDashboard = () => {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>DonaVida 💇‍♀️</h2>
                <div style={styles.headerRight}>
                    <span style={styles.email}>{user?.email}</span>
                    <button style={styles.logout} onClick={handleLogout}>Cerrar sesión</button>
                </div>
            </div>
            <div style={styles.content}>
                <h3 style={styles.welcome}>Bienvenido, Centro Estético 👋</h3>
                <div style={styles.cards}>
                    <div style={styles.card}>
                        <h4 style={styles.cardTitle}>Mi Perfil</h4>
                        <p>Email: {user?.email}</p>
                        <p>Rol: {user?.role}</p>
                    </div>
                    <div style={styles.card}>
                        <h4 style={styles.cardTitle}>Donaciones Recibidas</h4>
                        <p style={styles.empty}>No tienes donaciones asignadas aún.</p>
                    </div>
                    <div style={styles.card}>
                        <h4 style={styles.cardTitle}>Solicitudes</h4>
                        <p style={styles.empty}>No tienes solicitudes pendientes.</p>
                        <button style={styles.button}>+ Nueva solicitud</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { minHeight: '100vh', backgroundColor: '#f5f5f5' },
    header: { backgroundColor: '#e91e8c', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    title: { color: 'white', margin: 0 },
    headerRight: { display: 'flex', alignItems: 'center', gap: '1rem' },
    email: { color: 'white', fontSize: '0.9rem' },
    logout: { backgroundColor: 'white', color: '#e91e8c', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' },
    content: { padding: '2rem' },
    welcome: { color: '#333', marginBottom: '1.5rem' },
    cards: { display: 'flex', gap: '1.5rem', flexWrap: 'wrap' },
    card: { backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', minWidth: '280px', flex: 1 },
    cardTitle: { color: '#e91e8c', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' },
    empty: { color: '#999', fontSize: '0.9rem', marginBottom: '1rem' },
    button: { backgroundColor: '#e91e8c', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', width: '100%' }
};

export default AestheticDashboard;