import {Component, ElementRef, inject, ViewChild} from "@angular/core";
import {ChatService} from "../../services/chat.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {NgClass} from "@angular/common";

@Component({
  selector: 'chat-page',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="flex flex-col justify-between h-screen">
      <div class="overflow-auto p-4" #chatContainer>
        <ul class="space-y-4">
          @for (msg of chatResponse(); track msg) {
            <li class="chat {{ msg.role === 'user' ? 'chat-end' : 'chat-start' }}">
              <div class="chat-bubble {{ msg.role === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary' }}">
                {{ msg.role }}: {{ msg.content }}
              </div>
            </li>
          }
        </ul>
      </div>


      <div class="p-4 sticky bottom-0 w-full">
        <input class="input input-bordered input-primary w-full "
               placeholder="Ask me anything..."
               (keydown.enter)="handleUserPrompt($event)">
      </div>
    </div>
  `
})
export default class ChatPage {
  private readonly chatService = inject(ChatService);

  @ViewChild('chatContainer') private chatContainer: ElementRef;

  chatResponse = toSignal(this.chatService.chatResponse$, { initialValue: [] });

  handleUserPrompt(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.chatService.updatePrompt(inputElement.value);
    inputElement.value = '';
  }
}
