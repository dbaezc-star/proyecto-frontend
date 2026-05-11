import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAestheticCenterByEmail, getDonationsByAestheticCenter, getAppointmentsByCenter, updateAppointmentStatus } from '../../api/donations';

const AestheticDashboard = () => {
    const { user, token, logoutUser } = useAuth();
    const navigate = useNavigate();
    const [donations, setDonations] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [centerId, setCenterId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const center = await getAestheticCenterByEmail(user.email, token);
                setCenterId(center.id);
                const donationList = await getDonationsByAestheticCenter(center.id, token);
                setDonations(donationList);
                const appointmentList = await getAppointmentsByCenter(center.id, token);
                setAppointments(appointmentList);
            } catch (err) {
                console.error('Error cargando datos:', err);
            } finally {
                setLoading(false);
            }
        };
        if (user?.email) fetchData();
    }, [user, token]);

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    const handleStatus = async (appointmentId, status) => {
        try {
            const updated = await updateAppointmentStatus(appointmentId, status, token);
            setAppointments(appointments.map(a => a.id === appointmentId ? updated : a));
        } catch (err) {
            console.error('Error actualizando cita:', err);
        }
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
                        <h4 style={styles.cardTitle}>Donaciones Disponibles</h4>
                        {loading ? <p style={styles.empty}>Cargando...</p>
                        : donations.length === 0 ? <p style={styles.empty}>No tienes donaciones asignadas aún.</p>
                        : donations.map((d) => (
                            <div key={d.id} style={styles.donationItem}>
                                <span>Donación #{d.id}</span>
                                <span style={styles.status}>{d.status}</span>
                            </div>
                        ))}
                    </div>
                    <div style={styles.card}>
                        <h4 style={styles.cardTitle}>Citas Agendadas</h4>
                        {loading ? <p style={styles.empty}>Cargando...</p>
                        : appointments.length === 0 ? <p style={styles.empty}>No tienes citas pendientes.</p>
                        : appointments.map((a) => (
                            <div key={a.id} style={styles.appointmentItem}>
                                <div>
                                    <strong>{a.donor?.fullName || 'Donante'}</strong>
                                    <p style={styles.subInfo}>{a.donor?.user?.email}</p>
                                    <span style={{
                                        ...styles.badge,
                                        backgroundColor: a.status === 'CONFIRMED' ? '#4caf50' : a.status === 'REJECTED' ? '#f44336' : '#ff9800'
                                    }}>{a.status}</span>
                                </div>
                                {a.status === 'PENDING' && (
                                    <div style={styles.btnGroup}>
                                        <button style={styles.confirmBtn} onClick={() => handleStatus(a.id, 'CONFIRMED')}>✓</button>
                                        <button style={styles.rejectBtn} onClick={() => handleStatus(a.id, 'REJECTED')}>✗</button>
                                    </div>
                                )}
                            </div>
                        ))}
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
    donationItem: { display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee', marginBottom: '0.5rem' },
    appointmentItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #eee', marginBottom: '0.5rem' },
    status: { color: '#e91e8c', fontWeight: 'bold', fontSize: '0.85rem' },
    subInfo: { color: '#999', fontSize: '0.8rem', margin: '0.2rem 0' },
    badge: { color: 'white', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' },
    btnGroup: { display: 'flex', gap: '0.5rem' },
    confirmBtn: { backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', cursor: 'pointer', fontWeight: 'bold' },
    rejectBtn: { backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', cursor: 'pointer', fontWeight: 'bold' },
};

export default AestheticDashboard;