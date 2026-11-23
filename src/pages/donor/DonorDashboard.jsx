import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMyDonorProfile, getDonationsByDonor, createDonation, getAestheticCenters, createAppointment, getAppointmentsByDonor } from '../../api/donations';
import { getErrorMessage } from '../../api/client';

const DonorDashboard = () => {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();
    const [donations, setDonations] = useState([]);
    const [donorId, setDonorId] = useState(null);
    const [centers, setCenters] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const donor = await getMyDonorProfile();
                setDonorId(donor.id);
                // Las tres consultas son independientes: se hacen en paralelo
                const [donationList, centerList, appointmentList] = await Promise.all([
                    getDonationsByDonor(donor.id),
                    getAestheticCenters(),
                    getAppointmentsByDonor(donor.id),
                ]);
                setDonations(donationList);
                setCenters(centerList);
                setAppointments(appointmentList);
            } catch (err) {
                setError(getErrorMessage(err, 'Error cargando tus datos'));
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    const handleCreateDonation = async () => {
        try {
            const nueva = await createDonation(donorId);
            setDonations((prev) => [...prev, nueva]);
        } catch (err) {
            setError(getErrorMessage(err, 'Error registrando la donación'));
        }
    };

    const handleAgendar = async (centerId) => {
        try {
            const cita = await createAppointment(donorId, centerId);
            setAppointments((prev) => [...prev, cita]);
            alert('¡Cita agendada exitosamente!');
        } catch (err) {
            alert(getErrorMessage(err, 'Error al agendar la cita'));
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
                <h3 style={styles.welcome}>Bienvenido, donante 👋</h3>
                {error && <p style={styles.error}>{error}</p>}
                <div style={styles.cards}>
                    <div style={styles.card}>
                        <h4 style={styles.cardTitle}>Mi Perfil</h4>
                        <p>Email: {user?.email}</p>
                        <p>Rol: {user?.role}</p>
                    </div>
                    <div style={styles.card}>
                        <h4 style={styles.cardTitle}>Mis Donaciones</h4>
                        {loading ? <p style={styles.empty}>Cargando...</p>
                        : donations.length === 0 ? <p style={styles.empty}>No tienes donaciones registradas aún.</p>
                        : donations.map((d) => (
                            <div key={d.id} style={styles.donationItem}>
                                <span>Donación #{d.id}</span>
                                <span style={styles.status}>{d.status}</span>
                            </div>
                        ))}
                        <button style={styles.button} onClick={handleCreateDonation} disabled={!donorId}>+ Registrar donación</button>
                    </div>
                    <div style={styles.card}>
                        <h4 style={styles.cardTitle}>Mis Citas</h4>
                        {loading ? <p style={styles.empty}>Cargando...</p>
                        : appointments.length === 0 ? <p style={styles.empty}>No tienes citas agendadas aún.</p>
                        : appointments.map((a) => (
                            <div key={a.id} style={styles.donationItem}>
                                <span>{a.aestheticCenter?.name}</span>
                                <span style={styles.status}>{a.status}</span>
                            </div>
                        ))}
                    </div>
                    <div style={styles.card}>
                        <h4 style={styles.cardTitle}>Centros Estéticos Disponibles</h4>
                        {loading ? <p style={styles.empty}>Cargando...</p>
                        : centers.length === 0 ? <p style={styles.empty}>No hay centros disponibles aún.</p>
                        : centers.map((c) => (
                            <div key={c.id} style={styles.centerItem}>
                                <div>
                                    <strong>{c.name}</strong>
                                    <p style={styles.centerInfo}>{c.city} — {c.address}</p>
                                    <p style={styles.centerInfo}>{c.phone}</p>
                                </div>
                                <button style={styles.agendarBtn} onClick={() => handleAgendar(c.id)}>Agendar cita</button>
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
    error: { backgroundColor: '#fdecea', color: '#b71c1c', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '1rem' },
    cards: { display: 'flex', gap: '1.5rem', flexWrap: 'wrap' },
    card: { backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', minWidth: '280px', flex: 1 },
    cardTitle: { color: '#e91e8c', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' },
    empty: { color: '#999', fontSize: '0.9rem', marginBottom: '1rem' },
    donationItem: { display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee', marginBottom: '0.5rem' },
    status: { color: '#e91e8c', fontWeight: 'bold', fontSize: '0.85rem' },
    centerItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #eee', marginBottom: '0.5rem' },
    centerInfo: { color: '#999', fontSize: '0.85rem', margin: '0.2rem 0' },
    agendarBtn: { backgroundColor: '#e91e8c', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', whiteSpace: 'nowrap' },
    button: { backgroundColor: '#e91e8c', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', width: '100%', marginTop: '1rem' }
};

export default DonorDashboard;