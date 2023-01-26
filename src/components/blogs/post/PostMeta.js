import { compareAsc, format } from "date-fns";
const PostMeta = ({ data }) => {
  // console.warn(data);
  const postDate = format(new Date(data?.date), "dd MMMM yyyy");
  const authorName =
    (data?.author?.firstName ? data?.author?.firstName : "") +
    (data?.author?.lastName ? " " + data?.author?.lastName : "");
  const location = data?.positionDetails?.positionDetailsLocation
    ? data?.positionDetails?.positionDetailsLocation
    : "";

  return (
    <div className="post-meta">
      {postDate ? <span className="date">{postDate}</span> : ""}
      {location ? <span className="location">{location}</span> : ""}
      {authorName ? <span className="author"> | {authorName}</span> : ""}
    </div>
  );
};

export default PostMeta;
