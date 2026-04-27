import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
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
                <button style={styles.logout} onClick={handleLogout}>Cerrar sesión</button>
            </div>
            <div style={styles.content}>
                <h3>Bienvenido, {user?.email} 👋</h3>
                <p>Rol: {user?.role}</p>
            </div>
        </div>
    );
};

const styles = {
    container: { minHeight: '100vh', backgroundColor: '#f5f5f5' },
    header: { backgroundColor: '#e91e8c', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    title: { color: 'white', margin: 0 },
    logout: { backgroundColor: 'white', color: '#e91e8c', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' },
    content: { padding: '2rem' }
};

export default Dashboard;