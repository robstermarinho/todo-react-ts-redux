import { useContext } from 'react'
import { BlogPageContainer } from './styles'
import { PostsContext } from '../../contexts/PostsContext'
import { formatDistanceToNow } from 'date-fns'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { PostForm } from './components/PostForm'
import InitLoading from '../../components/InitLoading'
import { Pencil } from 'phosphor-react'

export function BlogPage() {
  const { posts, status, error, deletePost } = useContext(PostsContext)
  const isLoading = status === 'loading'
  const isRemoving = status === 'deleting'

  const handleRemovePost = (postId: string) => {
    deletePost(postId)
  }

  const renderPosts = () => {
    if (!error && posts && posts.length === 0) {
      return <p>No posts found.</p>
    }

    return posts.map((post) => (
      <div className="post" key={post.id}>
        <div className="postInfo">
          <div className="postInfoContent">
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
        </div>

        <div className="postActions">
          <PostForm
            key={`update-form-${post.id}`}
            postData={post}
            buttonLabel="Update Post"
            btnIcon={<Pencil size={20} />}
          />
          <ConfirmDialog
            key={`delete-form-${post.id}`}
            onSuccess={() => handleRemovePost(post.id)}
            title="Remove Post"
            question="Are you sure you want to remove this post?"
            targetName={post.title}
            disabled={isRemoving}
            buttonLabel={isRemoving ? 'Removing...' : 'Remove'}
          />
        </div>
      </div>
    ))
  }
  return (
    <BlogPageContainer>
      <div className="headerActions">
        <PostForm buttonLabel="Create Post" />
      </div>

      {error && <p>{error}</p>}
      {isLoading && <InitLoading />}
      {isRemoving && <InitLoading msg="Removing post" />}
      <div className="postsList">{renderPosts()}</div>
    </BlogPageContainer>
  )
}
