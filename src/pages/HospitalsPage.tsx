import { useEffect, useState } from "react";
import { getHospitals } from "../api";
import { Link } from "react-router-dom";

interface Hospital {
  _id: string;
  name: string;
  type: string;
  address: string;
}

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    getHospitals().then((res) => {;
      setHospitals(res.data.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Hospitals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hospitals?.map((hospital) => (
          <div key={hospital._id} className="bg-white shadow p-4 rounded">
            <h3 className="font-semibold text-lg">{hospital.name}</h3>
            <p className="text-sm text-gray-500">{hospital.type}</p>
            <p className="text-sm text-gray-500">{hospital.address}</p>
            <Link
              to={`/hospital/${hospital._id}/ads`}
              className="mt-2 inline-block text-green-600 hover:underline"
            >
              Manage Ads
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
