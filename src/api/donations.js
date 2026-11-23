import client from './client';

// ---- Donantes ----
export const getMyDonorProfile = async () => (await client.get('/donors/me')).data;

// ---- Centros estéticos ----
export const getMyCenterProfile = async () => (await client.get('/aesthetic-centers/me')).data;

export const getAestheticCenters = async () => (await client.get('/aesthetic-centers')).data;

// ---- Donaciones ----
export const createDonation = async (donorId) =>
    (await client.post('/donations', null, { params: { donorId } })).data;

export const getDonationsByDonor = async (donorId) =>
    (await client.get(`/donations/donor/${donorId}`)).data;

export const getDonationsByAestheticCenter = async (centerId) =>
    (await client.get(`/donations/aesthetic-center/${centerId}`)).data;

// ---- Citas ----
export const createAppointment = async (donorId, aestheticCenterId) =>
    (await client.post('/appointments', null, { params: { donorId, aestheticCenterId } })).data;

export const getAppointmentsByDonor = async (donorId) =>
    (await client.get(`/appointments/donor/${donorId}`)).data;

export const getAppointmentsByCenter = async (centerId) =>
    (await client.get(`/appointments/aesthetic-center/${centerId}`)).data;

export const updateAppointmentStatus = async (appointmentId, status) =>
    (await client.put(`/appointments/${appointmentId}/status`, null, { params: { status } })).data;
