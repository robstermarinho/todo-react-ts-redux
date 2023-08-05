import { useContext } from 'react'
import { BlogPageContainer } from './styles'
import { PostsContext } from '../../contexts/PostsContext'
import { formatDistanceToNow } from 'date-fns'
import { ConfirmDialog } from '../../components/ConfirmDialog'

export function BlogPage() {
  const { posts, status, error, deletePost } = useContext(PostsContext)

  const handleRemovePost = (postId: string) => {
    deletePost(postId)
  }

  const renderPosts = () => {
    if (status === 'loading') {
      return <p>Loading....</p>
    }

    if (!error && posts && posts.length === 0) {
      return <p>No posts found.</p>
    }

    return posts.map((post) => (
      <div className="post" key={post.id}>
        <div className="postInfo">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>

        <div className="dateInfo">
          <small>
            Created:{' '}
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </small>

          <small>
            Updated:{' '}
            {formatDistanceToNow(new Date(post.updatedAt), {
              addSuffix: true,
            })}
          </small>
        </div>

        <div className="postActions">
          <ConfirmDialog
            onSuccess={() => handleRemovePost(post.id)}
            title="Remove Post"
            question="Are you sure you want to remove this post?"
            targetName={post.title}
            disabled={status === 'deleting'}
            buttonLabel={status === 'deleting' ? 'Removing...' : 'Remove'}
          />
        </div>
      </div>
    ))
  }
  return (
    <BlogPageContainer>
      {error && <p>{error}</p>}
      <div className="postsList">{renderPosts()}</div>
    </BlogPageContainer>
  )
}
