import { compareAsc, format } from "date-fns";
const CareerMeta = ({ data }) => {
  const location = data?.positionDetails?.positionDetailsLocation
    ? data?.positionDetails?.positionDetailsLocation
    : "";

  return (
    <div className="post-meta mb-3">
      {location ? <span className="location">{location}</span> : ""}
    </div>
  );
};

export default CareerMeta;
