import {Component, inject} from '@angular/core';
import {toSignal} from "@angular/core/rxjs-interop";
import {DocsService} from "../../services/docs.service";

@Component({
  selector: 'docs',
  standalone: true,
  template: `
    <div class="flex flex-col justify-between h-screen">
      <div class="overflow-auto p-4">
        <div class=" p-2 bg-white p-6 border rounded shadow-lg mb-4">
          <p class="text-gray-700">{{ docsResponse().answer  }}</p>

          @for(source of docsResponse().sources; track source) {
            <div class="p-2 bg-gray-100 my-2">
              <p class="text-gray-700">{{ source.split('/').pop() }}</p>
            </div>
          }

        </div>
      </div>
      <div class="p-4 bg-gray-200 sticky bottom-0">
        <input class="w-full p-2 rounded-md"
               placeholder="Search for candidate..."
               (keydown.enter)="handleUserQuery($event)">
      </div>
    </div>

  `,
  styles: ``
})
export default class ExplorerComponent {
  private readonly docsService = inject(DocsService);

  docsResponse = toSignal(this.docsService.searchResponse$, { initialValue: {answer: '', sources: []} });

  handleUserQuery(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.docsService.updateQuery(inputElement.value);
    inputElement.value = '';
  }

}
