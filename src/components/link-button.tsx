import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const LinkButton = ({ label, href }: { label: string; href: string }) => {
  return (
    <Link href={href}>
      <Button variant={"default"}>{label}</Button>
    </Link>
  );
};

export default LinkButton;
