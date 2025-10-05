import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// -------------------------
// Hospital endpoints
// -------------------------
export const getHospitals = () => api.get("/hospitals"); // GET all hospitals

// -------------------------
// Ads endpoints
// -------------------------
export const getHospitalAds = (hospitalId: string) =>
  api.get(`/hospitals/ads/${hospitalId}`); // GET ads of a specific hospital

export const uploadAd = (hospitalId: string, formData: any) =>
  api.post(`/hospitals/ads/${hospitalId}`, formData, {
    withCredentials: true,
  }); // POST new ad

export const updateAd = (hospitalId: string, adId: string, data: any) => {
  return api.put(`/hospitals/ads/${hospitalId}/${adId}`, data, {
    withCredentials: true,
  });
}; // PUT update ad

export const deleteAd = (hospitalId: string, adId: string) =>
  api.delete(`/hospitals/ads/${hospitalId}/${adId}`); // DELETE ad

export const getNearbyAds = (lat: number, lng: number) =>
  api.get(`/ads/nearby?lat=${lat}&lng=${lng}`); // GET nearby ads

export default api;
