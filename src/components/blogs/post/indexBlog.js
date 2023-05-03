import React, { useEffect, useState } from "react";
import Link from "next/link";
import { sanitize } from "../../../utils/miscellaneous";
import CustomImage from "../../image";
import readingTime from "reading-time";
import { isEmpty } from "lodash";
import AOS from "aos";
import Figure from "react-bootstrap/Figure";
import { format } from "date-fns";

const Blog = ({ post }) => {
  // console.warn('from post tem', post?.featuredImage?.node )
  const stats = readingTime(post?.content); 
  const terms = post?.terms?.nodes;

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
// console.log('asdfdf',post)
  return (
    <article className="post-item">
      <div className="post-thumbnail">
        <figure className="overflow-hidden">
          {post?.featuredImage ? (
            <Link href={`${post?.uri}`}>
              <a>
              <CustomImage item={post?.featuredImage?.node} />
              </a>
              </Link>
          ) : (
            <Figure.Image
              width={160}
              height={160}
              alt="160x160"
              src="data:image/svg+xml,%0A%3Csvg width='160' height='160' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E%23holder_18460ebac82 text %7B fill:%23999;font-weight:normal;font-family:var(--bs-font-sans-serif), monospace;font-size:10pt %7D %3C/style%3E%3C/defs%3E%3Cg id='holder_18460ebac82'%3E%3Crect width='160' height='160' fill='%23373940'%3E%3C/rect%3E%3Cg%3E%3Ctext x='60.8203125' y='94.8'%3E160x160%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
            />
          )}
        </figure>
      </div>
      <div className="post-content">
        <div className="post-content-body">
          <div className="post-content-info d-flex">
            <div className="date">
              {format(new Date(post?.date), "dd MMMM yyyy")}
            </div>
            {stats ? (
              <div className="read-time">
                {stats?.minutes < 1
                  ? "1 min read"
                  : stats?.minutes.toFixed(0) + " min read"}
              </div>
            ) : (
              ""
            )}          
          </div>
          <Link href={`${post?.uri}`}>
            <a>
              <h2
                dangerouslySetInnerHTML={{
                  __html: sanitize(post?.title ?? ""),
                }}
              />
            </a>
          </Link>
          <div
            dangerouslySetInnerHTML={{ __html: sanitize(post?.excerpt ?? "").substring(0, 120) + '...' }}
          />
        </div>
        <div className="post-content-footer">
          {!isEmpty(terms) ? (
            <ul>
              {terms.map((term) => {
                return (
                  <li key={term.databaseId}>
                    <span>
                      {term.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            ""
          )}          
        </div>
      </div>
    </article>
  );
};

export default Blog;
