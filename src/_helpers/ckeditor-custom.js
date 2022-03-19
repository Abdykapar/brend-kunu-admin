import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

ClassicEditor
  .create(document.querySelector("#editor"), {
    plugins: [CKFinder],
    toolbar: ["ckfinder"],
    ckfinder: {
      uploadUrl: "http://localhost:3000/api/post"
    }
  })
  .then((res: any) => {
    console.log(res)
  })
  .catch((err: any) => {
    console.log(err)
  })

export default ClassicEditor
