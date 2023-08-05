import { useContext } from 'react'
import { BlogPageContainer } from './styles'
import { PostsContext } from '../../contexts/PostsContext'

export function BlogPage() {
  const { posts, status, error } = useContext(PostsContext)
  const renderPosts = () => {
    if (status === 'loading') {
      return <p>Loading....</p>
    }

    if (status === 'error') {
      return <p>{error}</p>
    }

    if (posts && posts.length === 0) {
      return <p>No posts found.</p>
    }

    return posts.map((post) => (
      <div className="post" key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    ))
  }
  return (
    <BlogPageContainer>
      <div className="postsList">{renderPosts()}</div>
    </BlogPageContainer>
  )
}
