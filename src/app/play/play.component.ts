import { Component, OnInit, Input } from '@angular/core';
import { WindowService } from '../window.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  @Input()
  msg: string;
  _window;

  constructor(private windowRef: WindowService) {
    this._window = windowRef.nativeWindow;
  }

  ngOnInit() {

  }
  play(text: string) {
    const msg = new this._window.SpeechSynthesisUtterance(text);
    msg.lang = 'en-US';
    this._window.speechSynthesis.speak(msg);
  }


}
