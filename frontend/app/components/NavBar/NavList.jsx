import { List, ListItem, Typography } from "@material-tailwind/react";
import { linksItems } from "./link";
import Link from "next/link";
export default function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      {linksItems.map((link) => {
        return (
          <Typography
            key={link.id}
            as={Link}
            href={link.url}
            variant="small"
            color="blue-gray"
            className="font-medium"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              {link.listItem}
            </ListItem>
          </Typography>
        );
      })}
    </List>
  );
}
