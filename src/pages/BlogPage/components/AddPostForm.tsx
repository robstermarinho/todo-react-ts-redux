import { useContext, useState } from 'react'
import { PostsContext } from '../../../contexts/PostsContext'
import { toast } from 'react-toastify'
import { PlusCircle } from 'phosphor-react'
import { AddPostFormContainer } from '../styles'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { status, createPost } = useContext(PostsContext)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const canSave = [title, content].every(Boolean) && status !== 'creating'

  const handleCreatePost = async () => {
    if (canSave) {
      await createPost({ title, body: content })
      setTitle('')
      setContent('')
    } else {
      toast.error('Failed to save the post.')
    }
  }

  return (
    <AddPostFormContainer>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <div>
          <button disabled={!canSave} type="button" onClick={handleCreatePost}>
            <PlusCircle /> Add Post
          </button>
        </div>
      </form>
    </AddPostFormContainer>
  )
}
