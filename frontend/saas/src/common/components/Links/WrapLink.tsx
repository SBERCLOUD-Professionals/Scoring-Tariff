import React from 'react';
import NextLink from 'next/link';
import {Link} from "@geist-ui/react";
import {LinkProps} from "@geist-ui/react/dist/link/link";

interface Props extends Partial<LinkProps> {
  href: string;
  as?: string;
}

const WrapLink: React.FC<Props> = ({href, as, children, ...linkProps}) => {

  return (
    <NextLink href={href} as={as}>
      <Link href={href} {...linkProps}>{children}</Link>
    </NextLink>
  );
};

export default WrapLink;