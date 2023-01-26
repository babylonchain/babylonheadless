import React, { useEffect } from "react";

import { Fancybox as NativeFancybox } from "../../node_modules/@fancyapps/ui/src/Fancybox/Fancybox";
import "../../node_modules/@fancyapps/ui/dist/fancybox.css";

function Fancybox(props) {
  const delegate = props.delegate || "[data-fancybox]";

  useEffect(() => {
    const opts = props.options || {};

    NativeFancybox.bind(delegate, opts);

    return () => {
      NativeFancybox.destroy();
    };
  }, []);

  return <>{props.children}</>;
}

export default Fancybox;