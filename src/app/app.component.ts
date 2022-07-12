import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import tinymce from 'tinymce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tinyimage';
  tinymce: any;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  async uploadHandler(blobInfo: any, progress: any): Promise<string> {
    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    this.http
      .post('https://api.cloudinary.com/v1_1/pueneh/upload', blobInfo.blob())
      .subscribe({
        next: (res) => {
          console.log(res);
        },
      });

    return 'https://www.housebeautiful.com/lifestyle/gardening/g13074130/beautiful-flower-images/';
  }

  // callEnd(formData: FormData) {
  //   return this.http
  //     .post('https://api.cloudinary.com/v1_1/pueneh/upload', formData)
  //     .pipe(
  //       map((res) => {
  //         return res;
  //       })
  //     );
  // }

  fp_cb(cb: any, value: any, meta: any) {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.addEventListener('change', (e) => {
      const file = (e.target as any).files[0];

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
        const id = 'blobid' + new Date().getTime();
        const blobCache = tinymce.activeEditor.editorUpload.blobCache;
        const base64 = (reader.result as any).split(',')[1];
        const blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        /* call the callback and populate the Title field with the file name */
        cb(blobInfo.blobUri(), { title: file.name });
        console.log(blobInfo.blobUri());
      });
      // console.log(reader.readAsDataURL(file));
      reader.readAsDataURL(file);

      // reader.onload
    });

    input.click();
  }

  // uploadImage(
  //   blobInfo: any
  //   // success: any,
  //   // failure: any,
  //   // progress: any
  // ): Promise<string> {
  //   const formData = new FormData();
  //   formData.append('upload_preset', 'oqiie6dy');
  //   formData.append('file', blobInfo.blob(), blobInfo.filename());

  // console.log('blobInfo', formData);
  // console.log('success', success);
  // console.log('failure', failure);
  // console.log('progress', progress);
  // return new Promise((resolve, reject) => {
  //   // resolve('Hello');
  //    this.callEnd(formData).subscribe({
  //     next: (res) => {
  //       console.log('res', res);
  //       resolve('');
  //     },
  //   });
  // });
  // const promise = new Promise<string>((resolve, reject) => {
  //   // const apiURL = this.api;
  //   resolve('https://api.cloudinary.com/v1_1/pueneh/upload');
  //   // this.http
  //   //   .post('https://api.cloudinary.com/v1_1/pueneh/upload', formData)
  //   //   .subscribe({
  //   //     next: (res: any) => {
  //   //       // this.data = res.map((res: any) => {
  //   //       //   return new Post(res.userId, res.id, res.title, res.body);
  //   //       // });
  //   //       console.log(res);

  //   //       resolve('Hello');
  //   //     },
  //   //     error: (err: any) => {
  //   //       reject(err);
  //   //     },
  //   //     complete: () => {
  //   //       console.log('complete');
  //   //     },
  //   //   });
  // });
  // return promise;
  //   return fetch('https://api.cloudinary.com/v1_1/pueneh/upload', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: formData,
  //     //   JSON.stringify({
  //     //   upload_preset: 'oqiie6dy',
  //     //   file: blobInfo.blob(),
  //     // }),
  //   }).then((res) => {
  //     console.log(res);

  //     return '';
  //   });
  // }
}
