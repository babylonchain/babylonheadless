import { useQuery, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { GET_CAREERS } from "../../../queries/careers/get-careers";
import Posts from "../../career/posts";
import Pagination from "react-bootstrap/Pagination";
import NextSvg from "../../Icons/nextSvg";
import PrevSvg from "../../Icons/prevSvg";
import EmptyPost from "../../EmptyPost";
import Loading from "../../Loading";

export default function CareerListingBlock({ attributes, categories }) {
  const attributesData = JSON.parse(attributes);
  //   console.warn(attributesData);
  const align = attributesData.align;
  const enable = attributesData.data.babylon_enable_section;
  const padding = attributesData?.data?.starter_kit_padding_type;
  const paddingRemover = attributesData?.data?.starter_kit_section_padding;
  const babylon_cpl_title = attributesData?.data?.babylon_cpl_title;

  const [pageSize, setPageSize] = useState(8);
  const [pageOffset, setPageOffset] = useState(0);
  const [pageActive, setPageActive] = useState(1);

  const { loading, error, data } = useQuery(GET_CAREERS, {
    variables: { pageSize: pageSize, pageOffset: pageOffset },
  });
  const queryPaginateTotal =
    data?.careerPositions?.pageInfo?.offsetPagination?.total;
  // console.warn("page size", queryPaginateTotal);

  function getClassName(align) {
    if (align === "center" || align === "right") {
      return `text-${align}`;
    }

    return "text-left";
  }

  if (enable === "0") {
    return null;
  }

  const handlePagiClick = (numb) => {
    setPageActive(numb);
    setPageOffset(numb * pageSize - pageSize);
  };

  const handlePrevClick = () => {
    if (pageActive === 1) return;
    setPageActive((preVal) => {
      setPageOffset((preVal - 1) * pageSize - pageSize);
      return preVal - 1;
    });
  };

  const handleNextClick = () => {
    // console.log('total', queryPaginateTotal);
    if (Math.ceil(queryPaginateTotal / pageSize) === pageActive) return;
    const newActive = setPageActive((preVal) => {
      setPageOffset((preVal + 1) * pageSize - pageSize);
      return preVal + 1;
    });
  };
  // Pagination items
  const totalPages = Math.ceil(queryPaginateTotal / pageSize);

  let items = [];

  if (totalPages > 6) {
    items.push(
      <Pagination.Item
        key={1}
        active={1 === pageActive}
        onClick={() => handlePagiClick(1)}
      >
        1
      </Pagination.Item>
    );
    const midpoint = Math.ceil(totalPages / 2);

    if (pageActive > 1 && pageActive < midpoint) {
      items.push(
        <Pagination.Item
          key={pageActive}
          active={pageActive === pageActive}
          onClick={() => handlePagiClick(pageActive)}
        >
          {pageActive}
        </Pagination.Item>
      );
    }

    items.push(<Pagination.Ellipsis />);

    for (let number = midpoint; number <= midpoint + 4; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === pageActive}
          onClick={() => handlePagiClick(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    items.push(<Pagination.Ellipsis />);

    if (pageActive > midpoint + 4 && pageActive < totalPages) {
      items.push(
        <Pagination.Item
          key={pageActive}
          active={pageActive === pageActive}
          onClick={() => handlePagiClick(pageActive)}
        >
          {pageActive}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Item
        key={totalPages}
        active={totalPages === pageActive}
        onClick={() => handlePagiClick(1)}
      >
        {totalPages}
      </Pagination.Item>
    );
  } else {
    for (let number = 0; number < totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === pageActive - 1}
          onClick={() => handlePagiClick(number + 1)}
        >
          {number + 1}
        </Pagination.Item>
      );
    }
  }
  return (
    <section
      className={
        `section section-blog-listing ${padding ? padding : ""} ${
          paddingRemover ? paddingRemover.toString().replace(",", " ") : ""
        }` + getClassName(align)
      }
    >
      <Container>
        <div
          className={`section-title`}
          data-aos="fade-down"
          data-aos-offset="100"
          data-aos-duration="1500"
          data-aos-once="true"
        >
          {babylon_cpl_title ? <h2>{babylon_cpl_title}</h2> : ""}
        </div>

        {loading ? (
          <div className="loading-wrapper d-flex justify-content-center">
            <Loading />
          </div>
        ) : (
          <>
            <Posts posts={data?.careerPositions?.edges} />
            {/* {queryPaginateTotal} */}
            {queryPaginateTotal > 0 &&
              Math.ceil(queryPaginateTotal / pageSize) > 1 && (
                <Pagination className="md-webinar__pagination career-pagination justify-content-center">
                  <span className="prev-btn" onClick={handlePrevClick}>
                    <PrevSvg />
                  </span>
                  {items}
                  <span className="next-btn" onClick={handleNextClick}>
                    <NextSvg />
                  </span>
                </Pagination>
              )}
          </>
        )}
      </Container>
    </section>
  );
}
