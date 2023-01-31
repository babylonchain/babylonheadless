import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronDown } from "react-icons/fi";
// import PropTypes from "prop-types";



const MenuItem = (item) => {
  const router = useRouter();
  const currentUrl = "/" + router?.asPath?.split("/")[1];
  const childItems = item.item.node.childItems.edges;
  const [navToggle, setNavToggle] = useState(false);
  // console.warn(item.item.node);
  // return('test')
  // const item = item.item;
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
    //   console.warn('ref', ref.current.navToggle);
      function handleClickOutside(event) {
        //   console.warn('ref', ref.current.contains(event));
        if (ref.current && !ref.current.contains(event.target)) {
            setNavToggle(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);


  return (
    <li
      key={item.item.node.id}
      className={`${
        childItems.length
          ? "has-chiildren d-flex flex-wrap align-items-center"
          : ""
      }`}
      onClick={(e) => {        
        setNavToggle(true);
      }}
    >
      <Link href={item.item.node.uri}>
        {childItems.length ? <a
          target={item.item?.node?.target ? item.item?.node?.target : '_self' }
          onClick={(e) => {
            e.preventDefault();
          }}
          className={
            item.item.node.uri.replace(/\/+$/, "") === currentUrl
              ? "active"
              : ""
          }
          
        >
          {item.item.node.label}
        </a> : <a
        target={item.item?.node?.target ? item.item?.node?.target : '_self' }
          className={
            item.item.node.uri.replace(/\/+$/, "") === currentUrl
              ? "active"
              : ""
          }
        >
          {item.item.node.label}
        </a>}
        
      </Link>
      {childItems.length ? (
        <span
          className={`submenu-opener ${navToggle ? "open" : ""}`}
          
        >
          <FiChevronDown />
        </span>
      ) : (
        ""
      )}
      {childItems.length ? (
        <ul className={`sub-menu ${navToggle ? "menu-open" : ""}`} ref={wrapperRef}>
          {childItems.map((item) => {
            // const childItems = item.node.childItems.edges;
            // console.warn(childItems);
            return (
              <li key={item.node.id}>
                <Link href={item.node.uri}>
                  <a
                  target={item?.node?.target ? item?.node?.target : '_self' }
                    className={
                      item.node.uri.replace(/\/+$/, "") === currentUrl
                        ? "active"
                        : ""
                    }
                  >
                    {item.node.label}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </li>
  );
};


export default MenuItem;
