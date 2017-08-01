import React from 'react'
import { Link } from 'react-router-dom'
import Chapter from '../../components/Chapter'
import chapters from './chapters.json'

const TableOfContents = props => {
  return (
    <section>
    {chapters.map(data => (
      <Chapter
        key={`chapter-${data.chapter}`}
        chapter={data.chapter}
        title={data.title}
        thumbnailPath={`/img/${data.thumbnail}`}
      >
        <p dangerouslySetInnerHTML={{__html: data.content}} />

        {data.links ? data.links.map((link, index) => (
          <p key={`link-${index}`}>
            <Link to={link.url}>{link.text}</Link>
          </p>
        )) : null}
      </Chapter>
    ))}
    </section>
  )
}

export default TableOfContents