import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();

  if (meData?.me?.id !== creatorId) {
    return null;
  }
  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <Link>
          <IconButton
            ml="auto"
            mr={3}
            icon={<EditIcon />}
            aria-label="Edit post"
          />
        </Link>
      </NextLink>
      <IconButton
        ml="auto"
        icon={<DeleteIcon />}
        aria-label="Delete post"
        onClick={() => {
          deletePost({ id });
        }}
      />
    </Box>
  );
};
