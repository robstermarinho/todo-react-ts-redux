import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import {
  selectPosts,
  fetchPosts,
  selectPostsError,
  selectPostsStatus,
} from '../../redux/reducers/postSlice'
import { BlogPageContainer, CustomSwitch } from './styles'
import InitLoading from '../../components/InitLoading'
import { Pencil, ArrowBendUpRight, ArrowBendLeftDown } from 'phosphor-react'
import * as Switch from '@radix-ui/react-switch'
import { PostForm } from './components/PostForm'
import { formatDistanceToNow } from 'date-fns'
import { ConfirmDialog } from '../../components/ConfirmDialog'
export function BlogReduxPage() {
  const [showPublished, setShowPublished] = useState(true)

  const error = useSelector(selectPostsError)
  const status = useSelector(selectPostsStatus)
  const posts = useSelector(selectPosts)
  const dispatch = useDispatch()

  const isLoading = status === 'loading'
  const isRemoving = status === 'deleting'
  const isUpdating = status === 'updating'

  useEffect(() => {
    dispatch<any>(
      fetchPosts({
        isPublished: true,
        query: '',
      }),
    )
  }, [dispatch])

  const handleRemovePost = (postId: string) => {
    // TODO
  }

  const handlePublishPost = (postId: string) => {
    // TODO
  }

  const handleUnpublishPost = (postId: string) => {
    // TODO
  }

  const handleOnCheckChange = (state: boolean) => {
    dispatch<any>(
      fetchPosts({
        isPublished: state,
        query: '',
      }),
    )
    setShowPublished(state)
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
            {post.publishedAt && (
              <small>
                Published At:{' '}
                {formatDistanceToNow(new Date(post.publishedAt), {
                  addSuffix: true,
                })}
              </small>
            )}
          </div>
        </div>

        {!post.isPublished && (
          <div className="postActions">
            {/* <PostForm
              key={`update-form-${post.id}`}
              postData={post}
              buttonLabel="Update Post"
              btnIcon={<Pencil size={20} />}
            />
            <ConfirmDialog
              key={`publish-form-${post.id}`}
              onSuccess={() => handlePublishPost(post.id)}
              title="Publish Post"
              question="Are you sure you want to publish this post?"
              targetName={post.title}
              disabled={isUpdating}
              btnIcon={<ArrowBendUpRight size={20} />}
              buttonLabel={isUpdating ? 'Publishing...' : 'Publish'}
            />
            <ConfirmDialog
              key={`delete-form-${post.id}`}
              onSuccess={() => handleRemovePost(post.id)}
              title="Remove Post"
              question="Are you sure you want to remove this post?"
              targetName={post.title}
              disabled={isRemoving}
              buttonLabel={isRemoving ? 'Removing...' : 'Remove'}
            /> */}
          </div>
        )}
        {post.isPublished && (
          <div className="postActions">
            {/* <ConfirmDialog
              key={`unpublish-form-${post.id}`}
              onSuccess={() => handleUnpublishPost(post.id)}
              title="Unpublish Post"
              btnIcon={<ArrowBendLeftDown size={20} />}
              question="Are you sure you want to unpublish this post?"
              targetName={post.title}
              disabled={isUpdating}
              buttonLabel={isUpdating ? 'Unpublishing...' : 'Unpublish'}
            /> */}
          </div>
        )}
      </div>
    ))
  }
  return (
    <BlogPageContainer>
      <h1>Redux with AsyncTunk</h1>
      <h2>{showPublished ? 'Blog Posts' : 'Draft Posts'}</h2>

      <div className="headerActions">
        <CustomSwitch>
          <label className="Label" htmlFor="published-posts">
            Published Posts
          </label>
          <Switch.Root
            className="SwitchRoot"
            id="published-posts"
            onCheckedChange={handleOnCheckChange}
            defaultChecked={showPublished}
          >
            <Switch.Thumb className="SwitchThumb" />
          </Switch.Root>
        </CustomSwitch>

        {/* {!showPublished && (
          <PostForm buttonLabel="Create Post" disabled={showPublished} />
        )} */}
      </div>

      {error && <p>{error}</p>}
      {isLoading && <InitLoading />}
      {isRemoving && <InitLoading msg="Removing post" />}
      <div className="postsList">{renderPosts()}</div>
    </BlogPageContainer>
  )
}
