import { useState } from 'react'
import { useGetPostsQuery } from '../../redux/reducers/apiSlice'
import { Post } from '../../contexts/PostsContext'
import { BlogPageContainer, CustomSwitch } from './styles'
import InitLoading from '../../components/InitLoading'
import { formatDistanceToNow } from 'date-fns'
import * as Switch from '@radix-ui/react-switch'
import { SkipBack, SkipForward } from 'phosphor-react'

export function BlogRTKPage() {
  const [showPublished, setShowPublished] = useState(true)
  const [page, setPage] = useState(1)
  const {
    data: posts,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery({
    page,
    limit: 5,
    isPublished: showPublished,
    query: '',
  })

  let apiError: string | null = null

  if (!isLoading && !isSuccess && isError) {
    console.log(error)
    apiError = `Impossible to load posts now.`
  }
  const handleOnCheckChange = (state: boolean) => {
    console.log(isLoading, isSuccess, isError)
    setShowPublished(state)
  }

  const renderPosts = () => {
    if (!apiError && posts && posts.length === 0) {
      return <p>No posts found.</p>
    }

    return posts.map((post: Post) => (
      <div className="post" key={post.id}>
        <div className="postInfo">
          <div className="postInfoContent">
            <h2>{post.title}</h2>
            <h4>{post.isPublished ? 'Published' : 'Draft'}</h4>
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
            /> */}
            {/* <ConfirmDialog
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
      <h1>Redux with RTK Query (apiSlice)</h1>
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
      </div>

      {apiError && <p>{apiError}</p>}
      {isLoading || (isFetching && <InitLoading />)}

      {isSuccess && (
        <div className="footerActions">
          <button
            className="btn"
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <SkipBack size={24} /> Previous
          </button>
          <button
            className="btn"
            disabled={posts && posts.length < 5}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next <SkipForward size={24} />
          </button>
        </div>
      )}
      <div className="postsList">{isSuccess && renderPosts()}</div>
    </BlogPageContainer>
  )
}
