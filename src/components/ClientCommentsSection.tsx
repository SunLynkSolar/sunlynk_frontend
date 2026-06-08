"use client";

import dynamic from "next/dynamic";

// ssr: false is only allowed inside Client Components
const CommentsSection = dynamic(
  () => import("@/components/CommentsSection"),
  { ssr: false }
);

interface Comment {
  author: string;
  avatar?: string;
  text: string;
  createdAt: string;
}

interface Props {
  postSlug: string;
  initialComments: Comment[];
}

export default function ClientCommentsSection(props: Props) {
  return <CommentsSection {...props} />;
}
