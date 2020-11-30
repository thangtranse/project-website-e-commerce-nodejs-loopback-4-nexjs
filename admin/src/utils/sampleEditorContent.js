import {
  convertFromHTML,
  ContentState,
  EditorState,
} from 'draft-js';

const contentBlocks = convertFromHTML('');

const contentState = ContentState.createFromBlockArray(contentBlocks);

// const initialContentState = convertToRaw(contentState);

export default EditorState.createWithContent(contentState);
