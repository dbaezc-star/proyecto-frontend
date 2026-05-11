import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const createDonation = async (donorId, token) => {
    const response = await axios.post(
        API_URL + '/donations?donorId=' + donorId,
        {},
        { headers: { Authorization: 'Bearer ' + token } }
    );
    return response.data;
};

export const getDonationsByDonor = async (donorId, token) => {
    const response = await axios.get(
        API_URL + '/donations/donor/' + donorId,
        { headers: { Authorization: 'Bearer ' + token } }
    );
    return response.data;
};

export const getDonorByEmail = async (email, token) => {
    const response = await axios.get(
        API_URL + '/donors/by-email/' + email,
        { headers: { Authorization: 'Bearer ' + token } }
    );
    return response.data;
};
export const getDonationsByAestheticCenter = async (centerId, token) => {
    const response = await axios.get(
        API_URL + '/donations/aesthetic-center/' + centerId,
        { headers: { Authorization: 'Bearer ' + token } }
    );
    return response.data;
};

export const getAestheticCenterByEmail = async (email, token) => {
    const response = await axios.get(
        API_URL + '/aesthetic-centers/by-email/' + email,
        { headers: { Authorization: 'Bearer ' + token } }
    );
    return response.data;
};
export const getAestheticCenters = async (token) => {
    const response = await axios.get(
        API_URL + '/aesthetic-centers',
        { headers: { Authorization: 'Bearer ' + token } }
    );
    return response.data;
};
export const createAppointment = async (donorId, aestheticCenterId, token) => {
    const response = await axios.post(
        `${API_URL}/appointments?donorId=${donorId}&aestheticCenterId=${aestheticCenterId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const getAppointmentsByDonor = async (donorId, token) => {
    const response = await axios.get(
        `${API_URL}/appointments/donor/${donorId}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const getAppointmentsByCenter = async (centerId, token) => {
    const response = await axios.get(
        `${API_URL}/appointments/aesthetic-center/${centerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const updateAppointmentStatus = async (appointmentId, status, token) => {
    const response = await axios.put(
        `${API_URL}/appointments/${appointmentId}/status?status=${status}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};