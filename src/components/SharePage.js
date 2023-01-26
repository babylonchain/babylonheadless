import Twitter from "./Icons/twitter";
import Linkedin from "./Icons/linkedin";
import Bookmark from "./Icons/bookmark";
import { ImFacebook2 } from "react-icons/im";

import Link from "next/link";
const SharePage = ({data}) => {
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

    // console.warn(origin);
    return (
        <ul className="social-icons d-flex align-items-center">
            <li>
                <Link href={`https://www.facebook.com/sharer/sharer.php?u=${origin}${data?.asPath}`}>
                <a><Bookmark/></a>
                </Link>
            </li>                  
            <li>
                <Link href={`https://www.facebook.com/sharer/sharer.php?u=${origin}${data?.asPath}`}>
                <a><ImFacebook2/></a>
                </Link>
            </li>                  
            <li>
                <Link href={`https://twitter.com/intent/tweet?url=${origin}${data?.asPath}`}>
                <a><Twitter/></a>
                </Link>
            </li>                  
            <li>
                <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${origin}${data?.asPath}`}>
                <a><Linkedin/></a>
                </Link>
            </li>                  
        </ul>
    )
}

export default SharePage;