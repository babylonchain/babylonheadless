import CustomImage from "../../image";
import Figure from "react-bootstrap/Figure";
import { format } from "date-fns";
import Link from "next/link";

const RecentBlogs = ( {recentBlogs} ) => {

    return(
      <div className="recent-posts">
        <span className="h4">Recent posts</span>
        <div className="posts-wrap">
          { recentBlogs ?
          recentBlogs.map((blog, index)=>{

            const title = blog?.node?.title;
            const date = blog?.node?.date;
            
            return(
              <div className="post" key={index}>
                <div className="post-img">
                {blog?.node?.featuredImage ? (
                   <Link href={`${blog?.node?.uri}`}>
                    <a>
                  <CustomImage item={blog?.node?.featuredImage?.node} />
                  </a>
                  </Link>
                ) : (
                  <Link href={`${blog?.node?.uri}`}>
                    <a>
                  <Figure.Image
                    width={160}
                    height={160}
                    alt="160x160"
                    src="data:image/svg+xml,%0A%3Csvg width='160' height='160' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E%23holder_18460ebac82 text %7B fill:%23999;font-weight:normal;font-family:var(--bs-font-sans-serif), monospace;font-size:10pt %7D %3C/style%3E%3C/defs%3E%3Cg id='holder_18460ebac82'%3E%3Crect width='160' height='160' fill='%23373940'%3E%3C/rect%3E%3Cg%3E%3Ctext x='60.8203125' y='94.8'%3E160x160%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                  />
                  </a>
                  </Link>
                )}
                </div>
                <div className="post-desc">
                  {title && <Link href={`${blog?.node?.uri}`}>
                    <a>
                      {title}
                    </a>
                  </Link>}
                  
                  {date && <span className="date">{format(new Date(date), "dd MMMM yyyy")}</span>}
                </div>
              </div>
            )
          })
          :
          null
        }
        </div>
      </div>
    )
};
export default RecentBlogs;