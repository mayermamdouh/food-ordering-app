"use client";

import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React, { FC, HTMLAttributes, useEffect, useRef, useState } from "react";

type customLink = NextLinkProps & {
  children: React.ReactNode;
  href: string;
} & HTMLAttributes<HTMLAnchorElement>;

const MyLink: FC<customLink> = ({ children, href, ...rest }) => {
  const [preFetch, setPreFetch] = useState<boolean>(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const preFetchListener = () => {
    setPreFetch(true);
  };

  const removePreFetchListener = () => {
    setPreFetch(false);
  };

  useEffect(() => {
    const linkRefElement = linkRef.current;
    linkRefElement?.addEventListener("mouseover", preFetchListener);
    linkRefElement?.addEventListener("mouseleave", removePreFetchListener);
    return () => {
      linkRefElement?.removeEventListener("mouseover", preFetchListener);
      linkRefElement?.removeEventListener("mouseleave", removePreFetchListener);
    };
  }, [preFetch]);

  return (
    <NextLink href={href} ref={linkRef} prefetch={preFetch} {...rest}>
      {children}
    </NextLink>
  );
};

export default MyLink;
