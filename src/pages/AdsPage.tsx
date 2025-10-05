// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getHospitalAds, uploadAd, updateAd, deleteAd } from "../api";
// import Modal from "../components/Modal";

// interface Ad {
//   _id: string;
//   title: string;
//   imageUrl: string;
//   startDate: string;
//   endDate?: string;
//   isActive: boolean;
// }

// export default function AdsPage() {
//   const { id } = useParams<{ id: string }>();
//   const [ads, setAds] = useState<Ad[]>([]);
//   const [file, setFile] = useState<File | null>(null);
//   const [title, setTitle] = useState("");

//   const [editAd, setEditAd] = useState<Ad | null>(null);
//   const [editFile, setEditFile] = useState<File | null>(null);

//   useEffect(() => {
//     if (id)
//       getHospitalAds(id).then((res) => {
//         setAds(res.data);
//       });
//   }, [id]);

//   const handleUpload = async () => {
//     if (!file || !id) return;
//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("title", title);
//     const res = await uploadAd(id, formData);
//     console.log(res.data, "new ad");

//     setAds((prev) => [...prev, res.data]);
//     setFile(null);
//     setTitle("");
//   };

//   const handleDelete = async (adId: string) => {
//     if (!id) return;
//     await deleteAd(id, adId);
//     setAds((prev) => prev.filter((ad) => ad._id !== adId));
//   };

//   const handleEditSave = async () => {
//     if (!id || !editAd) return;

//     const formData = new FormData();
//     if (editFile) formData.append("image", editFile);
//     formData.append("title", editAd.title || "");
//     formData.append("startDate", editAd.startDate || "");
//     formData.append("endDate", editAd.endDate || "");
//     formData.append("isActive", String(editAd.isActive));

//     const res = await updateAd(id, editAd._id, formData);
//     setAds((prev) => prev.map((ad) => (ad._id === editAd._id ? res.data : ad)));
//     setEditAd(null);
//     setEditFile(null);
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Ads Management</h2>

//       {/* Upload New Ad */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h3 className="font-semibold mb-2">Upload New Ad</h3>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="border p-2 rounded w-full mb-2"
//         />
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//           className="mb-2"
//         />
//         <button
//           onClick={handleUpload}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Upload
//         </button>
//       </div>

//       {/* Ads Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {ads.map((ad, index) => (
//           <div
//             key={ad._id || index}
//             className="bg-white shadow rounded p-4 relative"
//           >
//             <img
//               src={ad.imageUrl}
//               alt={ad.title}
//               className="w-full h-48 object-cover rounded mb-2"
//             />
//             <h4 className="font-semibold">{ad.title}</h4>
//             <p className="text-sm text-gray-500">
//               {new Date(ad.startDate).toLocaleDateString()} -{" "}
//               {ad.endDate
//                 ? new Date(ad.endDate).toLocaleDateString()
//                 : "No end date"}
//             </p>
//             <p>Status: {ad.isActive ? "Active" : "Inactive"}</p>

//             <div className="absolute top-2 right-2 flex space-x-2">
//               <button
//                 onClick={() => setEditAd(ad)}
//                 className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(ad._id)}
//                 className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Edit Modal */}
//       <Modal isOpen={!!editAd} onClose={() => setEditAd(null)}>
//         {editAd && (
//           <div>
//             <h3 className="font-semibold mb-2">Edit Ad</h3>
//             <input
//               type="text"
//               value={editAd.title}
//               onChange={(e) => setEditAd({ ...editAd, title: e.target.value })}
//               className="border p-2 rounded w-full mb-2"
//             />
//             <label className="block mb-2">
//               Start Date
//               <input
//                 type="date"
//                 value={
//                   editAd.startDate
//                     ? typeof editAd.startDate === "string"
//                       ? editAd.startDate.split("T")[0]
//                       : new Date(editAd.startDate).toISOString().split("T")[0]
//                     : ""
//                 }
//                 onChange={(e) =>
//                   setEditAd({ ...editAd, startDate: e.target.value })
//                 }
//                 className="border p-2 rounded w-full"
//               />
//             </label>

//             <label className="block mb-2">
//               End Date
//               <input
//                 type="date"
//                 value={
//                   editAd.endDate
//                     ? typeof editAd.endDate === "string"
//                       ? editAd.endDate.split("T")[0]
//                       : new Date(editAd.endDate).toISOString().split("T")[0]
//                     : ""
//                 }
//                 onChange={(e) =>
//                   setEditAd({ ...editAd, endDate: e.target.value })
//                 }
//                 required
//                 className="border p-2 rounded w-full"
//               />
//             </label>
//             <label className="block mb-2">
//               Active Status
//               <select
//                 value={editAd.isActive ? "active" : "inactive"}
//                 onChange={(e) =>
//                   setEditAd({
//                     ...editAd,
//                     isActive: e.target.value === "active",
//                   })
//                 }
//                 className="border p-2 rounded w-full"
//               >
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//             </label>
//             <label className="block mb-2">
//               Replace Image
//               <input
//                 type="file"
//                 onChange={(e) => setEditFile(e.target.files?.[0] || null)}
//                 className="border p-2 rounded w-full"
//               />
//             </label>
//             <button
//               onClick={handleEditSave}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-2"
//             >
//               Save Changes
//             </button>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }






import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHospitalAds, uploadAd, updateAd, deleteAd } from "../api";
import Modal from "../components/Modal";

interface Ad {
  _id: string;
  title: string;
  imageUrl: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
}

export default function AdsPage() {
  const { id } = useParams<{ id: string }>();
  const [ads, setAds] = useState<Ad[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [editAd, setEditAd] = useState<Ad | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);

  useEffect(() => {
    if (id) getHospitalAds(id).then((res) => setAds(res.data));
  }, [id]);

  // --- Upload New Ad ---
  const handleUpload = async () => {
    if (!file || !id) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title || "");
    formData.append("startDate", startDate || new Date().toISOString());
    formData.append("endDate", endDate || "");

    const res = await uploadAd(id, formData);
    setAds((prev) => [...prev, res.data]);

    // Clear form
    setFile(null);
    setTitle("");
    setStartDate("");
    setEndDate("");
  };

  const handleDelete = async (adId: string) => {
    if (!id) return;
    await deleteAd(id, adId);
    setAds((prev) => prev.filter((ad) => ad._id !== adId));
  };

  const handleEditSave = async () => {
    if (!id || !editAd) return;

    const formData = new FormData();
    if (editFile) formData.append("image", editFile);
    formData.append("title", editAd.title || "");
    formData.append("startDate", editAd.startDate || "");
    formData.append("endDate", editAd.endDate || "");

    const res = await updateAd(id, editAd._id, formData);
    setAds((prev) => prev.map((ad) => (ad._id === editAd._id ? res.data : ad)));
    setEditAd(null);
    setEditFile(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ads Management</h2>

      {/* --- Upload New Ad Form --- */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-2">Upload New Ad</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <div className="flex gap-2 mb-2">
          <label className="flex-1">
            Start Date
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </label>
          <label className="flex-1">
            End Date
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </label>
        </div>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-2"
        />
        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Upload
        </button>
      </div>

      {/* --- Ads Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ads.map((ad, index) => (
          <div
            key={ad._id || index}
            className="bg-white shadow rounded p-4 relative"
          >
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h4 className="font-semibold">{ad.title}</h4>
            <p className="text-sm text-gray-500">
              {new Date(ad.startDate).toLocaleDateString()} -{" "}
              {ad.endDate
                ? new Date(ad.endDate).toLocaleDateString()
                : "No end date"}
            </p>
            <p>Status: {ad.isActive ? "Active" : "Inactive"}</p>

            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => setEditAd(ad)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(ad._id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Edit Modal --- */}
      <Modal isOpen={!!editAd} onClose={() => setEditAd(null)}>
        {editAd && (
          <div>
            <h3 className="font-semibold mb-2">Edit Ad</h3>
            <input
              type="text"
              value={editAd.title}
              onChange={(e) => setEditAd({ ...editAd, title: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <label className="block mb-2">
              Start Date
              <input
                type="date"
                value={
                  editAd.startDate
                    ? typeof editAd.startDate === "string"
                      ? editAd.startDate.split("T")[0]
                      : new Date(editAd.startDate).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setEditAd({ ...editAd, startDate: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
            </label>
            <label className="block mb-2">
              End Date
              <input
                type="date"
                value={
                  editAd.endDate
                    ? typeof editAd.endDate === "string"
                      ? editAd.endDate.split("T")[0]
                      : new Date(editAd.endDate).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setEditAd({ ...editAd, endDate: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
            </label>
            <label className="block mb-2">
              Replace Image
              <input
                type="file"
                onChange={(e) => setEditFile(e.target.files?.[0] || null)}
                className="border p-2 rounded w-full"
              />
            </label>
            <button
              onClick={handleEditSave}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-2"
            >
              Save Changes
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}