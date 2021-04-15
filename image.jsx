import picture from './packages/imageEditor/test.jpg'
import { render } from "./packages/imageEditor/ImageEditor.jsx";

render({title: 'test.js', content: picture}, document.getElementById('root'))
