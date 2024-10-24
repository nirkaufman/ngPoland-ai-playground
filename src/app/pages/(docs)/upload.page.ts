import {Component, ElementRef, inject, signal, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileUploadService} from "../../services/upload.service";

@Component({
  selector: 'upload-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md p-6 m-4 bg-white rounded shadow-md">
        <label class="block mb-2 text-sm font-bold text-gray-700">
          <input #fileInput
                 type="file"
                 (change)="selectFile($event)"
                 class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </label>

        <div *ngIf="uploadMessage()" class="p-2 mb-4 text-sm text-center text-green-500 bg-green-100 border border-green-400 rounded">
          {{ uploadMessage() }}
        </div>

        <div class="flex items-center justify-between">
          <button class="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
                  [disabled]="!currentFile"
                  (click)="upload()">
            Upload
          </button>
        </div>
      </div>
    </div>
  `,
})
export default class FileUploadComponent  {
  private readonly fileUploadService = inject(FileUploadService);

  @ViewChild('fileInput') fileInput: ElementRef;

  uploadMessage = signal<string | null>(null);
  currentFile?: File;

  selectFile(event: any): void {
    this.currentFile = event.target.files.item(0);
  }

  upload(): void {
    if (this.currentFile) {
      this.fileUploadService.upload(this.currentFile).subscribe({
        complete: () => {
          this.currentFile = undefined;
          this.fileInput.nativeElement.value = '';

          this.uploadMessage.set('File uploaded successfully');
          setTimeout(() => this.uploadMessage.set(null), 3000);
        },
      });
    }
  }
}
