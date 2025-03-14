import * as FilePond from '/node_modules/filepond/dist/filepond.esm.js';
import FilePondPluginFilePoster from '/node_modules/filepond-plugin-file-poster/dist/filepond-plugin-file-poster.esm.js';
import FilePondPluginImageEditor from '/node_modules/@pqina/filepond-plugin-image-editor/dist/FilePondPluginImageEditor.js';
import FilePondPluginFileValidateType from '/node_modules/filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js';
import FilePondPluginImageExifOrientation from '/node_modules/filepond-plugin-image-exif-orientation/dist/filepond-plugin-image-exif-orientation.esm.js';
import FilePondPluginImagePreview from '/node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js';
import FilePondPluginImageCrop from '/node_modules/filepond-plugin-image-crop/dist/filepond-plugin-image-crop.esm.js';
import FilePondPluginImageResize from '/node_modules/filepond-plugin-image-resize/dist/filepond-plugin-image-resize.esm.js';
import FilePondPluginImageTransform from '/node_modules/filepond-plugin-image-transform/dist/filepond-plugin-image-transform.esm.js';
import FilePondPluginImageEdit from '/node_modules/filepond-plugin-image-edit/dist/filepond-plugin-image-edit.esm.js';

FilePond.registerPlugin(
     // FilePondPluginImageEditor,
     // FilePondPluginFilePoster,

     // FilePondPluginFileValidateType,
     // FilePondPluginImageExifOrientation,
     // FilePondPluginImagePreview,
     // FilePondPluginImageCrop,
     // FilePondPluginImageResize,
     // FilePondPluginImageTransform,
     // FilePondPluginImageEdit

     FilePondPluginFileValidateType,
     FilePondPluginImageExifOrientation,
     FilePondPluginImagePreview,
     FilePondPluginImageCrop,
     FilePondPluginImageResize,
     FilePondPluginImageTransform,
     FilePondPluginImageEdit
   

);

import {
     openEditor,
     createDefaultImageReader,
     createDefaultImageWriter,
     processImage,
     getEditorDefaults,
} from '/node_modules/@pqina/pintura/pintura.js';



FilePond.create(document.querySelector("input[name='filepond']"), {
     labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
    imagePreviewHeight: 170,
    imageCropAspectRatio: '1:1',
    imageResizeTargetWidth: 200,
    imageResizeTargetHeight: 200,
    stylePanelLayout: 'compact circle',
    styleLoadIndicatorPosition: 'center bottom',
    styleProgressIndicatorPosition: 'right bottom',
    styleButtonRemoveItemPosition: 'left bottom',
    styleButtonProcessItemPosition: 'right bottom',

//      labelIdle: 'Kéo thả ảnh hoặc <span class="filepond--label-action">Tải lên</span>',
//     imagePreviewHeight: 256,
//     imageCropAspectRatio: 1,
//     imageResizeTargetWidth: 1024,  // Kích thước đầu ra
//     imageResizeTargetHeight: 1024,
//     stylePanelLayout: 'compact circle',
//     allowImageExifOrientation: true,
//     allowImageTransform: true,
//     allowImageResize: true,
//     allowImageCrop: true,
//     acceptedFileTypes: ['image/*'],

     
     // labelIdle: `Kéo hoặc thả ảnh vào hoặc là <span class="filepond--label-action">Up ảnh lên</span>`,
     // imageCropAspectRatio: '1:1',
     // allowImageEdit: true,
     // styleButtonEditItemPosition: 'bottom',
     // stylePanelLayout: 'compact circle',
     // imageCropAspectRatio: '1:1',
     // allowReorder: true,
     // filePosterMaxHeight: 256,
     // imageEditor: {
     //      createEditor: openEditor,
     //      imageReader: [createDefaultImageReader],
     //      imageWriter: [
     //           createDefaultImageWriter,
     //      ],

     //      imageProcessor: processImage,
     //      editorOptions: {
     //           ...getEditorDefaults({
     //           }),
     //           imageCropAspectRatio: 1,
     //      },

     // },
});