import React from "react"
import { useDisqus } from './use-disqus'
import { DiscussionEmbed } from 'disqus-react'

export const CommentThread: React.FC<{
  noteId: string,
  noteTitle: string
}> = ({ noteId, noteTitle }) => {
  const { shortname, config } = useDisqus()
  return (
    <DiscussionEmbed
      shortname={shortname}
      config={{
        ...config,
        identifier: noteId,
        title: noteTitle
      }}
    />
  )
}
