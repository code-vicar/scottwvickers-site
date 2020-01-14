import React from "react"
import { useDisqus } from './use-disqus'
import { DiscussionEmbed } from 'disqus-react'

export const CommentThread: React.FC<{
  noteSlug: string,
  noteTitle: string
}> = ({ noteSlug, noteTitle }) => {
  const { shortname, siteUrl } = useDisqus()
  const fullUrl = `${siteUrl}${noteSlug}`
  const identifier = noteSlug.startsWith('/') ? noteSlug.substr(1) : noteSlug
  return (
    <DiscussionEmbed
      shortname={shortname}
      config={{
        url: fullUrl,
        identifier,
        title: noteTitle
      }}
    />
  )
}
